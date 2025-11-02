import React, { useRef, useEffect, useState } from 'react';
import { Message, RelationshipStatus, UserProfile, CharacterProfile } from '../types';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import Header from './Header';
import RelationshipBar from './RelationshipBar';
import TypingIndicator from './TypingIndicator';

interface ChatViewProps {
    messages: Message[];
    onSendMessage: (text: string) => void;
    isLoading: boolean;
    togglePhone: () => void;
    resetChat: () => void;
    relationshipStatus: RelationshipStatus;
    userProfile: UserProfile;
    charProfile: CharacterProfile;
    setCharProfile: (profile: CharacterProfile) => void;
    setUserProfile: (profile: UserProfile) => void;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatView: React.FC<ChatViewProps> = ({
    messages,
    onSendMessage,
    isLoading,
    togglePhone,
    resetChat,
    relationshipStatus,
    userProfile,
    charProfile,
    setCharProfile,
    setUserProfile,
    setMessages
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    return (
        <div className="flex flex-col h-full bg-black text-white">
            <Header 
                charProfile={charProfile}
                resetChat={resetChat}
                togglePhone={togglePhone}
                setCharProfile={setCharProfile}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
            />
            <RelationshipBar status={relationshipStatus} />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <MessageBubble 
                        key={msg.id} 
                        message={msg} 
                        userAvatar={userProfile.avatar}
                        aiAvatar={charProfile.avatar}
                        setMessages={setMessages}
                    />
                ))}
                {isLoading && <TypingIndicator avatar={charProfile.avatar} />}
                <div ref={messagesEndRef} />
            </div>
            <InputBar onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatView;
