import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { FaPen, FaTrash, FaVolumeUp } from 'react-icons/fa';

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

  // Sync editText nếu message.text thay đổi
  useEffect(() => {
    setEditText(message.text);
  }, [message.text]);

  const handleEdit = () => {
    if (editText.trim()) {
      setMessages(prev => prev.map(m => m.id === message.id ? { ...m, text: editText.trim() } : m));
    }
    setIsEditing(false);
  };

  const handleDelete = () => setMessages(prev => prev.filter(m => m.id !== message.id));

  const handlePlayAudio = () => {
    if (!synth) return;
    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(message.text);
    const voices = synth.getVoices();
    const vietnameseVoice = voices.find(v => v.lang === 'vi-VN');
    if (vietnameseVoice) utterance.voice = vietnameseVoice;

    utterance.pitch = 1;
    utterance.rate = 1;
    synth.speak(utterance);
  };

  const bubbleClasses = isUser
    ? "bg-[#FAFAFA] text-black self-end rounded-br-none"
    : "bg-gray-800 text-white self-start rounded-bl-none";

  const avatar = isUser ? userAvatar : aiAvatar;

  return (
    <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
      <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
      <div className="relative group">
        <div
          className={`p-3 rounded-lg ${bubbleClasses} cursor-pointer`}
          onClick={() => isUser && !isEditing && setIsEditing(true)}
        >
          {isEditing && isUser ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="bg-white text-black p-2 rounded resize-none"
                autoFocus
              />
              <button
                onClick={handleEdit}
                className="self-end text-xs text-blue-500 hover:underline"
              >
                Lưu
              </button>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>

        {/* Tooltip Buttons */}
        <div className={`absolute top-1/2 -translate-y-1/2 flex gap-2 p-1 bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity
          ${isUser ? '-left-16' : '-right-20'}`}>
          {isUser && <button onClick={() => setIsEditing(true)} className="text-white text-xs"><FaPen /></button>}
          <button onClick={handleDelete} className="text-white text-xs"><FaTrash /></button>
          {!isUser && <button onClick={handlePlayAudio} className="text-white text-xs"><FaVolumeUp /></button>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;