import React, { useState } from 'react';
import HomeScreen from '../phone/HomeScreen';
import InstagramApp from '../phone/apps/InstagramApp';
import MessagesApp from '../phone/apps/MessagesApp';
import NotesApp from '../phone/apps/NotesApp';
import BankApp from '../phone/apps/BankApp';
import GmailApp from '../phone/apps/GmailApp';
import MapApp from '../phone/apps/MapApp';
import PinterestApp from '../phone/apps/PinterestApp';

type AppName =
  | 'Home'
  | 'Instagram'
  | 'Messages'
  | 'Notes'
  | 'Bank'
  | 'Gmail'
  | 'Map'
  | 'Pinterest';

interface VirtualPhoneProps {
  closePhone: () => void;
}

const VirtualPhone: React.FC<VirtualPhoneProps> = ({ closePhone }) => {
  const [currentApp, setCurrentApp] = useState<AppName>('Home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openApp = (appName: AppName) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentApp(appName);
      setIsTransitioning(false);
    }, 300); // animation duration
  };

  const APP_COMPONENTS: Record<AppName, React.FC<{ backToHome: () => void }>> = {
    Home: HomeScreen as React.FC<any>,
    Instagram: InstagramApp,
    Messages: MessagesApp,
    Notes: NotesApp,
    Bank: BankApp,
    Gmail: GmailApp,
    Map: MapApp,
    Pinterest: PinterestApp,
  };

  const CurrentAppComponent = APP_COMPONENTS[currentApp];

  return (
    <div className={`absolute inset-0 flex items-center justify-center z-50 transition-all duration-300 ${isTransitioning ? 'backdrop-blur-sm' : ''}`}>
      {/* Khung điện thoại */}
      <div className={`w-[360px] h-[720px] bg-black rounded-[60px] border-8 border-gray-800 shadow-2xl relative flex flex-col overflow-hidden transform transition-transform duration-300 ${isTransitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
        
        {/* Notch / camera */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-gray-800 rounded-b-3xl flex items-center justify-center z-10">
          <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
        </div>

        {/* Nội dung app */}
        <div className="flex-1 bg-gray-100 rounded-[40px] overflow-hidden relative transition-all duration-300">
          <CurrentAppComponent backToHome={() => openApp('Home')} />
        </div>

        {/* Nút home ảo */}
        <div className="h-16 flex items-center justify-center bg-black relative">
          <button
            onClick={closePhone}
            className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white shadow-md transform transition-transform duration-200 hover:scale-110"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualPhone;