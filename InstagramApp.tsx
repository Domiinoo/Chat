import React, { useState, useEffect, useRef } from 'react';
import { InstagramPost } from '../../types';
import { INITIAL_INSTAGRAM_POSTS } from '../../constants';

interface InstagramAppProps {
    backToHome: () => void;
}

const Post: React.FC<{ post: InstagramPost, onImageChange: (id: number, newImage: string) => void }> = ({ post, onImageChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(post.id, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white border-b border-gray-200 text-black">
            <div className="flex items-center p-3">
                <img src={post.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-3" />
                <span className="font-semibold text-sm">{post.username}</span>
            </div>
            <div className="relative group">
                <img src={post.image} alt="post" className="w-full" />
                <button onClick={handleImageClick} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fas fa-camera text-white text-2xl"></i>
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*"/>
            </div>
            <div className="p-3">
                <div className="flex items-center gap-4 text-xl mb-2">
                    <i className="far fa-heart"></i>
                    <i className="far fa-comment"></i>
                    <i className="far fa-paper-plane"></i>
                </div>
                <p className="text-sm font-semibold">{post.likes.toLocaleString()} likes</p>
                <p className="text-sm">
                    <span className="font-semibold">{post.username}</span> {post.caption}
                </p>
                {post.song && (
                    <div className="flex items-center gap-2 text-xs mt-1 text-gray-500">
                        <i className="fas fa-music"></i>
                        <span>{post.song.title} - {post.song.artist}</span>
                    </div>
                )}
                <p className="text-xs text-gray-400 mt-1 uppercase">{post.timestamp}</p>
            </div>
        </div>
    );
};

const InstagramApp: React.FC<InstagramAppProps> = ({ backToHome }) => {
    const [posts, setPosts] = useState<InstagramPost[]>(() => {
        const saved = localStorage.getItem('instagramPosts');
        return saved ? JSON.parse(saved) : INITIAL_INSTAGRAM_POSTS;
    });

    useEffect(() => {
        localStorage.setItem('instagramPosts', JSON.stringify(posts));
    }, [posts]);
    
    const handleImageChange = (id: number, newImage: string) => {
        setPosts(posts.map(p => p.id === id ? { ...p, image: newImage } : p));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPosts(posts.map(p => ({...p, avatar: reader.result as string})));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const avatarInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="h-full bg-white flex flex-col">
            <header className="p-3 border-b border-gray-200 flex items-center justify-between text-black">
                <button onClick={backToHome}><i className="fas fa-arrow-left"></i></button>
                <h1 className="text-xl font-serif">Instagram</h1>
                <div className="flex items-center gap-4">
                     <i className="far fa-plus-square"></i>
                     <i className="fab fa-facebook-messenger"></i>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto">
                <div className="p-4 flex items-center justify-between text-black border-b border-gray-200">
                    <div className="relative group">
                        <img src={posts[0]?.avatar} className="w-20 h-20 rounded-full" />
                        <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                            <i className="fas fa-camera text-white text-xl"></i>
                        </button>
                        <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold">{posts.length}</p>
                        <p className="text-sm text-gray-600">Bài viết</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">1.2M</p>
                        <p className="text-sm text-gray-600">Người theo dõi</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">1</p>
                        <p className="text-sm text-gray-600">Đang theo dõi</p>
                    </div>
                </div>
                {posts.map(post => <Post key={post.id} post={post} onImageChange={handleImageChange} />)}
            </div>
            
             <footer className="p-3 border-t border-gray-200 flex items-center justify-around text-black text-2xl">
                <i className="fas fa-home"></i>
                <i className="fas fa-search"></i>
                <i className="far fa-play-circle"></i>
                <i className="fas fa-shopping-bag"></i>
                <img src={posts[0]?.avatar} className="w-6 h-6 rounded-full" />
            </footer>
        </div>
    );
};

export default InstagramApp;
