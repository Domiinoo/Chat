import React from 'react';
import { RelationshipStatus } from '../types';

interface RelationshipBarProps {
  status: RelationshipStatus;
}

const RelationshipBar: React.FC<RelationshipBarProps> = ({ status }) => {
  const currentLevel = status.levels.find(l => l.name === status.currentLevelName);
  if (!currentLevel) return null; // bảo vệ nếu currentLevel không tồn tại

  const currentIndex = status.levels.indexOf(currentLevel);
  const nextLevel = status.levels[currentIndex + 1];

  let progress = 0;

  if (nextLevel) {
    const range = nextLevel.minScore - currentLevel.minScore;
    const currentProgress = status.score - currentLevel.minScore;
    progress = Math.min(100, Math.max(0, (currentProgress / range) * 100));
  } else {
    // Nếu đã ở level cao nhất
    progress = status.score >= currentLevel.minScore ? 100 : 0;
  }

  return (
    <div className="p-2 bg-black text-xs">
      <div className="flex justify-between items-center mb-1 text-gray-400">
        <span>{currentLevel.name}</span>
        <span>Điểm: {status.score}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
        <div className="bg-pink-400 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default RelationshipBar;