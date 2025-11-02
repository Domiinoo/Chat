import React from 'react';
import { RelationshipStatus } from '../types';

interface RelationshipBarProps {
    status: RelationshipStatus;
}

const RelationshipBar: React.FC<RelationshipBarProps> = ({ status }) => {
    const currentLevel = status.levels.find(l => l.name === status.currentLevelName);
    const nextLevel = status.levels[status.levels.indexOf(currentLevel!) + 1];

    let progress = 0;
    if (currentLevel && nextLevel) {
        const range = nextLevel.minScore - currentLevel.minScore;
        const currentProgress = status.score - currentLevel.minScore;
        progress = Math.min(100, Math.max(0, (currentProgress / range) * 100));
    } else if (status.score >= (currentLevel?.minScore || 0)) {
        progress = 100; // Max level
    }

    return (
        <div className="p-2 bg-black text-xs">
            <div className="flex justify-between items-center mb-1 text-gray-400">
                <span>{status.currentLevelName}</span>
                <span>Điểm: {status.score}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-pink-400 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default RelationshipBar;
