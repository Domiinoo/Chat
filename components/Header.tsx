import React, { useState, useEffect } from 'react';
import { CharacterProfile, UserProfile } from '../types';
import SettingsModal from './SettingsModal';
import { FaRedo, FaSave, FaCheck, FaMobileAlt, FaCog } from 'react-icons/fa';

interface HeaderProps {
  charProfile: CharacterProfile;
  resetChat: () => void;
  togglePhone: () => void;
  setCharProfile: (profile: CharacterProfile) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const Header: React.FC<HeaderProps> = ({
  charProfile,
  resetChat,
  togglePhone,
  setCharProfile,
  userProfile,
  setUserProfile,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  useEffect(() => {
    // Cleanup timeout khi component unmount
    return () => {
      clearTimeout(saveTimeout);
    };
  }, []);

  let saveTimeout: NodeJS.Timeout;

  const handleSave = () => {
    // Lưu profile vào localStorage
    localStorage.setItem('charProfile', JSON.stringify(charProfile));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Hiển thị feedback
    setSaveFeedback(true);
    saveTimeout = setTimeout(() => setSaveFeedback(false), 2000);
  };

  return (
    <>
      <div className="p-4 bg-black border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={resetChat}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaRedo size={18} />
          </button>

          <button
            onClick={handleSave}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {saveFeedback ? <FaCheck size={18} className="text-green-500" /> : <FaSave size={18} />}
          </button>
        </div>

        <h1 className="font-bold text-lg">{charProfile.name}</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={togglePhone}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaMobileAlt size={18} />
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaCog size={18} />
          </button>
        </div>
      </div>

      {isSettingsOpen && (
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          charProfile={charProfile}
          setCharProfile={setCharProfile}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      )}
    </>
  );
};

export default Header;