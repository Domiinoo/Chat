import React, { useState, useEffect } from 'react';
import { BankTransaction } from '../../types';
import { INITIAL_BANK_TRANSACTIONS } from '../../constants';

interface BankAppProps {
    backToHome: () => void;
}

const BankApp: React.FC<BankAppProps> = ({ backToHome }) => {
    const [transactions, setTransactions] = useState<BankTransaction[]>(() => {
        const saved = localStorage.getItem('bankTransactions');
        return saved ? JSON.parse(saved) : INITIAL_BANK_TRANSACTIONS;
    });

    const balance = transactions.reduce((acc, t) => acc + t.amount, 785420.34);

    useEffect(() => {
        localStorage.setItem('bankTransactions', JSON.stringify(transactions));
    }, [transactions]);

    const getIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'ăn uống': return 'fas fa-utensils';
            case 'mua sắm': return 'fas fa-shopping-bag';
            case 'lợi nhuận': return 'fas fa-chart-line';
            case 'di chuyển': return 'fas fa-car';
            default: return 'fas fa-receipt';
        }
    };

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col font-sans">
            <header className="p-4 flex items-center justify-between">
                <button onClick={backToHome}><i className="fas fa-arrow-left"></i></button>
                <h1 className="font-semibold text-lg">Elysian Bank</h1>
                <i className="fas fa-bell"></i>
            </header>

            <div className="p-4">
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Tổng số dư</span>
                        <span className="font-mono text-yellow-400">ELYSIAN</span>
                    </div>
                    <p className="text-3xl font-bold mt-2">¥{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    <div className="flex justify-between items-end mt-4">
                        <span className="font-mono text-sm">**** **** **** 2101</span>
                        <i className="fas fa-sim-card text-2xl text-gray-400"></i>
                    </div>
                </div>
            </div>
            
            <div className="px-4 py-2 flex justify-around text-center text-xs">
                <div className="flex flex-col items-center gap-1"><i className="fas fa-exchange-alt bg-gray-700 p-3 rounded-full"></i><span>Chuyển khoản</span></div>
                <div className="flex flex-col items-center gap-1"><i className="fas fa-qrcode bg-gray-700 p-3 rounded-full"></i><span>Thanh toán</span></div>
                <div className="flex flex-col items-center gap-1"><i className="far fa-credit-card bg-gray-700 p-3 rounded-full"></i><span>Thẻ</span></div>
                <div className="flex flex-col items-center gap-1"><i className="fas fa-headset bg-gray-700 p-3 rounded-full"></i><span>Hỗ trợ</span></div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 mt-4">
                <h2 className="font-semibold mb-2">Lịch sử giao dịch</h2>
                <div className="space-y-3">
                    {transactions.map(t => (
                        <div key={t.id} className="flex items-center gap-4 p-2 rounded-lg bg-gray-800">
                             <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                <i className={getIcon(t.category)}></i>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{t.description}</p>
                                <p className="text-xs text-gray-400">{t.date}</p>
                            </div>
                            <p className={`font-semibold ${t.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                                {t.type === 'income' ? '+' : ''}¥{Math.abs(t.amount).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

             <footer className="p-3 bg-gray-800 flex items-center justify-around text-gray-300 text-xs">
                <div className="flex flex-col items-center text-yellow-400"><i className="fas fa-home text-lg mb-1"></i><span>Trang chủ</span></div>
                <div className="flex flex-col items-center"><i className="fas fa-chart-pie text-lg mb-1"></i><span>Phân tích</span></div>
                <div className="flex flex-col items-center"><i className="fas fa-user text-lg mb-1"></i><span>Hồ sơ</span></div>
            </footer>
        </div>
    );
};

export default BankApp;
