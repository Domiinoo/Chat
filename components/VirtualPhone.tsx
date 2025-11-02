import React, { useState } from 'react';
import HomeScreen from '../phone/HomeScreen';
import InstagramApp from '../phone/apps/InstagramApp';
import MessagesApp from '../phone/apps/MessagesApp';
import NotesApp from '../phone/apps/NotesApp';
import BankApp from '../phone/apps/BankApp';

type AppName = 'Home' | 'Instagram' | 'Messages' | 'Notes' | 'Bank' | 'Google' | 'UmeEats';

interface VirtualPhoneProps {
    closePhone: () => void;
}

const VirtualPhone: React.FC<VirtualPhoneProps> = ({ closePhone }) => {
    const [currentApp, setCurrentApp] = useState<AppName>('Home');

    const openApp = (appName: AppName) => setCurrentApp(appName);

    const renderCurrentApp = () => {
        switch (currentApp) {
            case 'Instagram':
                return <InstagramApp backToHome={() => setCurrentApp('Home')} />;
            case 'Messages':
                 return <MessagesApp backToHome={() => setCurrentApp('Home')} />;
            case 'Notes':
                 return <NotesApp backToHome={() => setCurrentApp('Home')} />;
            case 'Bank':
                 return <BankApp backToHome={() => setCurrentApp('Home')} />;
            // Add other apps here
            case 'Home':
            default:
                return <HomeScreen openApp={openApp} />;
        }
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="w-[300px] h-[600px] bg-black rounded-[40px] border-8 border-gray-800 shadow-2xl relative p-2">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
                <div className="w-full h-full bg-blue-200 rounded-[32px] overflow-hidden">
                    {renderCurrentApp()}
                </div>
                <button onClick={closePhone} className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center">
                   <i className="fas fa-times"></i>
                </button>
                 <div className="absolute left-0 top-20 w-1 h-8 bg-gray-800 rounded-r-sm"></div>
                 <div className="absolute right-0 top-24 w-1 h-16 bg-gray-800 rounded-l-sm"></div>
            </div>
        </div>
    );
};

export default VirtualPhone;
