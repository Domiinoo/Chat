import React, { useState } from 'react';
import { CharacterProfile, UserProfile } from '../types';
import SettingsModal from './SettingsModal';

interface HeaderProps {
    charProfile: CharacterProfile;
    resetChat: () => void;
    togglePhone: () => void;
    setCharProfile: (profile: CharacterProfile) => void;
    userProfile: UserProfile;
    setUserProfile: (profile: UserProfile) => void;
}

const Header: React.FC<HeaderProps> = ({ charProfile, resetChat, togglePhone, setCharProfile, userProfile, setUserProfile }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [saveFeedback, setSaveFeedback] = useState(false);

    const handleSave = () => {
        setSaveFeedback(true);
        setTimeout(() => setSaveFeedback(false), 2000);
    };

    return (
        <>
            <div className="p-4 bg-black border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={resetChat} className="text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-redo"></i>
                    </button>
                    <button onClick={handleSave} className="text-gray-400 hover:text-white transition-colors">
                        {saveFeedback ? <i className="fas fa-check text-green-500"></i> : <i className="fas fa-save"></i>}
                    </button>
                </div>
                <h1 className="font-bold text-lg">{charProfile.name}</h1>
                <div className="flex items-center gap-4">
                    <button onClick={togglePhone} className="text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-mobile-alt"></i>
                    </button>
                    <button onClick={() => setIsSettingsOpen(true)} className="text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-cog"></i>
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
