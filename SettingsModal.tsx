import React, { useRef } from 'react';
import { CharacterProfile, UserProfile } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    charProfile: CharacterProfile;
    setCharProfile: (profile: CharacterProfile) => void;
    userProfile: UserProfile;
    setUserProfile: (profile: UserProfile) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, charProfile, setCharProfile, userProfile, setUserProfile }) => {
    const charAvatarInputRef = useRef<HTMLInputElement>(null);
    const userAvatarInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'char' | 'user') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'char') {
                    setCharProfile({ ...charProfile, avatar: reader.result as string });
                } else {
                    setUserProfile({ ...userProfile, avatar: reader.result as string });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-11/12 max-w-md text-white">
                <h2 className="text-xl font-bold mb-4">Cài đặt</h2>
                
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Hồ sơ Nhân vật</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src={charProfile.avatar} alt="Character Avatar" className="w-16 h-16 rounded-full"/>
                            <button onClick={() => charAvatarInputRef.current?.click()} className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                                <i className="fas fa-camera text-xs"></i>
                            </button>
                            <input type="file" ref={charAvatarInputRef} onChange={(e) => handleFileChange(e, 'char')} className="hidden" accept="image/*"/>
                        </div>
                        <input
                            type="text"
                            value={charProfile.name}
                            onChange={(e) => setCharProfile({ ...charProfile, name: e.target.value })}
                            className="bg-gray-800 p-2 rounded w-full"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Hồ sơ của bạn</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src={userProfile.avatar} alt="User Avatar" className="w-16 h-16 rounded-full"/>
                            <button onClick={() => userAvatarInputRef.current?.click()} className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                                <i className="fas fa-camera text-xs"></i>
                            </button>
                            <input type="file" ref={userAvatarInputRef} onChange={(e) => handleFileChange(e, 'user')} className="hidden" accept="image/*"/>
                        </div>
                        <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                            className="bg-gray-800 p-2 rounded w-full"
                        />
                    </div>
                </div>

                <button onClick={onClose} className="w-full bg-pink-500 p-2 rounded">
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default SettingsModal;
