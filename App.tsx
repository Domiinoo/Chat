import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import ChatView from './components/ChatView';
import VirtualPhone from './components/VirtualPhone';
import { Message, UserProfile, CharacterProfile, RelationshipStatus } from './types';
import { SYSTEM_INSTRUCTION, INITIAL_RELATIONSHIP_STATUS } from './constants';

const App: React.FC = () => {
    const [isPhoneOpen, setIsPhoneOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [isLoading, setIsLoading] = useState(false);

    const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus>(() => {
        const savedStatus = localStorage.getItem('relationshipStatus');
        return savedStatus ? JSON.parse(savedStatus) : INITIAL_RELATIONSHIP_STATUS;
    });

    const [userProfile, setUserProfile] = useState<UserProfile>(() => {
        const savedProfile = localStorage.getItem('userProfile');
        return savedProfile ? JSON.parse(savedProfile) : { name: 'Kí Chủ', avatar: 'https://picsum.photos/100/100' };
    });

    const [charProfile, setCharProfile] = useState<CharacterProfile>(() => {
        const savedProfile = localStorage.getItem('charProfile');
        return savedProfile ? JSON.parse(savedProfile) : { name: 'Hệ Thống', avatar: 'https://picsum.photos/100/100?grayscale' };
    });

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem('relationshipStatus', JSON.stringify(relationshipStatus));
    }, [relationshipStatus]);
    
    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('charProfile', JSON.stringify(charProfile));
    }, [charProfile]);

    const handleSendMessage = useCallback(async (text: string) => {
        const userMessage: Message = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        // Update relationship score
        setRelationshipStatus(prev => {
            const newScore = prev.score + 5;
            const currentLevel = prev.levels.find(l => newScore >= l.minScore && (l.maxScore === undefined || newScore <= l.maxScore)) || prev.levels[0];
            return { ...prev, score: newScore, currentLevelName: currentLevel.name };
        });

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                history: messages.map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }]
                })),
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION(userProfile),
                },
            });

            const response = await chat.sendMessage({ message: text });
            
            let responseText = response.text;
            
            // Basic sentiment check for score adjustment
            const lowerCaseResponse = responseText.toLowerCase();
            if (['khó chịu', 'bực', 'phiền'].some(word => lowerCaseResponse.includes(word))) {
                setRelationshipStatus(prev => {
                    const newScore = Math.max(-Infinity, prev.score - 5);
                    const currentLevel = prev.levels.find(l => newScore >= l.minScore && (l.maxScore === undefined || newScore <= l.maxScore)) || prev.levels[prev.levels.length - 1];
                    return { ...prev, score: newScore, currentLevelName: currentLevel.name };
                });
            }

            const aiMessage: Message = { id: Date.now() + 1, text: responseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMessage: Message = { id: Date.now() + 1, text: "Lỗi: Không thể kết nối với hệ thống.", sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, userProfile]);

    const resetChat = useCallback(() => {
        // Save to history before resetting
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        if (messages.length > 0) {
            chatHistory.push({ id: Date.now(), date: new Date().toISOString(), messages });
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }
        setMessages([]);
    }, [messages]);

    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center">
            <div className="relative w-full h-full md:w-[400px] md:h-[800px] md:border md:border-gray-700 md:rounded-3xl overflow-hidden">
                <ChatView
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    togglePhone={() => setIsPhoneOpen(!isPhoneOpen)}
                    resetChat={resetChat}
                    relationshipStatus={relationshipStatus}
                    userProfile={userProfile}
                    charProfile={charProfile}
                    setCharProfile={setCharProfile}
                    setUserProfile={setUserProfile}
                    setMessages={setMessages}
                />
                {isPhoneOpen && (
                    <VirtualPhone closePhone={() => setIsPhoneOpen(false)} />
                )}
            </div>
        </div>
    );
};

export default App;
