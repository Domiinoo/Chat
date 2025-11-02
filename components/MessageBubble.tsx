import React, { useState } from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
    message: Message;
    userAvatar: string;
    aiAvatar: string;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, userAvatar, aiAvatar, setMessages }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(message.text);
    const isUser = message.sender === 'user';
    const synth = window.speechSynthesis;

    const handleEdit = () => {
        setMessages(prev => prev.map(m => m.id === message.id ? { ...m, text: editText } : m));
        setIsEditing(false);
    };

    const handleDelete = () => {
        setMessages(prev => prev.filter(m => m.id !== message.id));
    };

    const handlePlayAudio = () => {
        if (synth.speaking) {
            synth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(message.text);
        const voices = synth.getVoices();
        const vietnameseVoice = voices.find(voice => voice.lang === 'vi-VN');
        if (vietnameseVoice) {
            utterance.voice = vietnameseVoice;
        }
        utterance.pitch = 1;
        utterance.rate = 1;
        synth.speak(utterance);
    };

    const bubbleClasses = isUser
        ? "bg-[#FAFAFA] text-black self-end"
        : "bg-gray-800 text-white self-start";

    const avatar = isUser ? userAvatar : aiAvatar;

    return (
        <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <div
                className={`group relative p-3 rounded-lg ${bubbleClasses} ${isUser ? 'rounded-br-none' : 'rounded-bl-none'}`}
                onClick={() => !isEditing && setIsEditing(true)}
            >
                {isEditing && isUser ? (
                    <div className="flex flex-col gap-2">
                         <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="bg-white text-black p-2 rounded"
                            onBlur={handleEdit}
                            autoFocus
                        />
                        <button onClick={handleEdit} className="text-xs text-blue-500">Lưu</button>
                    </div>
                ) : (
                    <p className="whitespace-pre-wrap">{message.text}</p>
                )}
                <div className="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 p-1 bg-gray-700 rounded-full -mt-2" style={isUser ? { left: '-4rem' } : { right: '-5.5rem' }}>
                    {isUser && (
                         <button onClick={() => setIsEditing(true)} className="text-white text-xs"><i className="fas fa-pen"></i></button>
                    )}
                     <button onClick={handleDelete} className="text-white text-xs"><i className="fas fa-trash"></i></button>
                    {!isUser && (
                        <button onClick={handlePlayAudio} className="text-white text-xs"><i className="fas fa-volume-up"></i></button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
