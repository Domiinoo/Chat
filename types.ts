export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export interface UserProfile {
  name: string;
  avatar: string;
  details?: string; // For memory/ký ức
}

export interface CharacterProfile {
  name: string;
  avatar: string;
}

export interface RelationshipLevel {
  name: string;
  minScore: number;
  maxScore?: number;
}

export interface RelationshipStatus {
  score: number;
  currentLevelName: string;
  levels: RelationshipLevel[];
}

export interface InstagramPost {
  id: number;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  timestamp: string;
  song?: {
    title: string;
    artist: string;
  };
}

export interface BankTransaction {
  id: string;
  type: 'expense' | 'income';
  category: string;
  description: string;
  amount: number;
  date: string;
}
