export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  attachment?: {
    name: string;
    type: 'image' | 'video' | 'audio' | 'document';
    url: string;
  };
  metadata?: {
    provenance?: string;
    trustScore?: number;
    verificationStatus?: 'Verified' | 'Unverified' | 'Suspicious';
    dkgAssetId?: string;
  };
}

export interface TrustMetric {
  subject: string;
  A: number; // Value
  fullMark: number;
}

export interface UserProfile {
  did: string;
  walletAddress: string;
  trustScore: number;
  isVerified: boolean;
}

export enum ViewState {
  LANDING = 'LANDING',
  APP = 'APP'
}