import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface InputBarProps {
  onSendMessage: (text: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onSendMessage(trimmed);
      setText('');
    }
  };

  return (
    <div className="p-4 bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-gray-900 rounded-full p-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 bg-transparent focus:outline-none px-3 text-gray-200 placeholder:text-gray-500"
        />
        <button
          type="submit"
          aria-label="Gửi tin nhắn"
          className={`w-10 h-10 rounded-full bg-pink-300 text-black flex items-center justify-center transition-transform transform hover:scale-110 active:scale-95`}
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default InputBar;