export interface InstagramPost {
  id: string;
  imageUrl: string;
  videoUrl?: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  engagementRate: number;
  type: "image" | "video" | "reel";
}

export interface InstagramMetrics {
  engagementRate: number;
  avgLikesPerPost: number;
  avgCommentsPerPost: number;
  followerGrowth: number;
  reachGrowth?: number;
}

export interface EngagementData {
  date: string;
  rate: number;
  likes: number;
  comments: number;
}

export interface HashtagData {
  tag: string;
  count: number;
}

export interface InstagramProfile {
  username: string;
  fullName: string;
  bio: string;
  profilePicUrl: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  externalUrl?: string;
  isVerified: boolean;
  isPrivate: boolean;
  metrics: InstagramMetrics;
  recentPosts: InstagramPost[];
  topHashtags: HashtagData[];
  engagementHistory: EngagementData[];
}