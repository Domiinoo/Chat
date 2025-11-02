import React, { useState, useEffect, useRef } from 'react';

interface HomeScreenProps {
    openApp: (appName: any) => void;
}

const FrogClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourDeg = (hours % 12 + minutes / 60) * 30;
    const minuteDeg = (minutes + seconds / 60) * 6;

    return (
        <div className="relative w-24 h-24 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('https://i.imgur.com/2X2B2j8.png')" }}>
            <div
                className="absolute top-1/2 left-1/2 w-1 h-8 bg-black origin-bottom"
                style={{ transform: `rotate(${hourDeg}deg) translate(-50%, -100%)` }}
            ></div>
            <div
                className="absolute top-1/2 left-1/2 w-0.5 h-10 bg-black origin-bottom"
                style={{ transform: `rotate(${minuteDeg}deg) translate(-50%, -100%)` }}
            ></div>
        </div>
    );
}

const HomeScreen: React.FC<HomeScreenProps> = ({ openApp }) => {
    const [wallpaper, setWallpaper] = useState('https://picsum.photos/300/600');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedWallpaper = localStorage.getItem('phoneWallpaper');
        if (savedWallpaper) {
            setWallpaper(savedWallpaper);
        }
    }, []);

    const handleWallpaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newWallpaper = reader.result as string;
                setWallpaper(newWallpaper);
                localStorage.setItem('phoneWallpaper', newWallpaper);
            };
            reader.readAsDataURL(file);
        }
    };

    const AppIcon = ({ icon, name, appName }: { icon: string, name: string, appName?: string }) => (
        <button onClick={() => appName && openApp(appName)} className="flex flex-col items-center gap-1 text-white">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <i className={`fas ${icon} text-2xl`}></i>
            </div>
            <span className="text-xs font-medium shadow-sm">{name}</span>
        </button>
    );

    return (
        <div className="w-full h-full bg-cover bg-center text-black p-4 flex flex-col" style={{ backgroundImage: `url(${wallpaper})` }}>
            <div className="flex-1 grid grid-cols-4 grid-rows-5 gap-4">
                <div className="col-span-4 row-span-2 grid grid-cols-2 gap-2">
                    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-2 flex flex-col justify-center items-center">
                        <span className="text-sm font-bold">Ngày thứ</span>
                        <span className="text-4xl font-light">{Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))}</span>
                    </div>
                    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-2 flex justify-center items-center">
                        <FrogClock />
                    </div>
                </div>

                <AppIcon icon="fa-google" name="Google" appName="Google" />
                <AppIcon icon="fa-pencil-alt" name="Ghi chú" appName="Notes" />
                <AppIcon icon="fa-utensils" name="Ume Eats" appName="UmeEats" />
                <AppIcon icon="fa-camera" name="Đổi nền" />
            </div>
            
            {/* Dock */}
            <div className="h-20 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-around">
                <AppIcon icon="fa-phone" name="" />
                <button onClick={() => openApp('Instagram')} className="flex flex-col items-center gap-1 text-white">
                    <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                         <i className="fab fa-instagram text-2xl"></i>
                    </div>
                </button>
                <button onClick={() => openApp('Messages')} className="flex flex-col items-center gap-1 text-white">
                    <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                         <i className="fab fa-facebook-messenger text-2xl"></i>
                    </div>
                </button>
                <button onClick={() => openApp('Bank')} className="flex flex-col items-center gap-1 text-white">
                    <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                         <i className="fas fa-university text-2xl"></i>
                    </div>
                </button>
                 <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-1 text-white">
                     <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                         <i className="fas fa-camera text-2xl"></i>
                     </div>
                 </button>
                 <input type="file" ref={fileInputRef} onChange={handleWallpaperChange} className="hidden" accept="image/*"/>

            </div>
        </div>
    );
};

export default HomeScreen;
