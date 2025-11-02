import React from 'react';

interface TypingIndicatorProps {
    avatar: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ avatar }) => {
    return (
        <div className="flex items-end gap-2 self-start">
            <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <div className="bg-gray-800 p-3 rounded-lg rounded-bl-none">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;
