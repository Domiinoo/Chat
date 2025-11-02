import React from 'react';

interface NotesAppProps {
    backToHome: () => void;
}

const notes = [
    { title: 'Dự án "Tái Sinh"', content: 'Năng lượng cảm xúc là chìa khóa. Cần đẩy nhanh tiến độ thu thập.' },
    { title: 'Về Kí Chủ', content: 'Có những phản ứng bất thường. Dữ liệu không giải thích được. Cần quan sát thêm.' },
    { title: 'Ký ức phân mảnh', content: 'Một bàn tay... Ánh đèn xe... Mưa.' },
];

const NotesApp: React.FC<NotesAppProps> = ({ backToHome }) => {
    return (
        <div className="h-full bg-white flex flex-col">
            <header className="p-3 bg-white border-b border-gray-200 flex items-center justify-between text-black">
                <button onClick={backToHome}><i className="fas fa-arrow-left"></i></button>
                <h1 className="font-semibold">Ghi chú</h1>
                <i className="fas fa-plus"></i>
            </header>

            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4">
                {notes.map((note, index) => (
                    <div key={index} className="bg-yellow-200 p-3 rounded-lg shadow-sm text-black">
                        <h3 className="font-bold truncate">{note.title}</h3>
                        <p className="text-sm mt-1 line-clamp-3">{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesApp;
