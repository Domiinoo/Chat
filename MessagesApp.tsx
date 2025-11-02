import React from 'react';

interface MessagesAppProps {
    backToHome: () => void;
}

const conversations = [
    { name: 'Cố An Trạch', lastMessage: 'Tối nay gặp ở chỗ cũ nhé.', time: '18:30' },
    { name: 'Tiêu Du', lastMessage: 'Báo cáo quý này xong rồi, gửi sếp xem.', time: '15:21' },
    { name: 'Mẹ', lastMessage: 'Nhớ ăn uống đầy đủ.', time: '09:00' },
];

const MessagesApp: React.FC<MessagesAppProps> = ({ backToHome }) => {
    return (
        <div className="h-full bg-gray-50 flex flex-col">
            <header className="p-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between text-black">
                <button onClick={backToHome}><i className="fas fa-arrow-left"></i></button>
                <h1 className="font-semibold">Tin nhắn</h1>
                <i className="fas fa-edit"></i>
            </header>

            <div className="flex-1 overflow-y-auto">
                {conversations.map(convo => (
                    <div key={convo.name} className="p-3 flex items-center border-b border-gray-200 text-black">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <span className="font-bold text-gray-600">{convo.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{convo.name}</p>
                            <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
                        </div>
                        <span className="text-xs text-gray-400">{convo.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessagesApp;
