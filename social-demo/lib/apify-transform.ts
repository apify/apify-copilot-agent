import { InstagramProfile, InstagramPost, HashtagData, EngagementData } from "./types";

// Type definitions for Apify Instagram Profile Scraper output
interface ApifyPost {
  id: string;
  type: string;
  shortCode: string;
  caption: string;
  displayUrl: string;
  videoUrl?: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  hashtags?: string[];
}

interface ApifyProfileData {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl?: string;
  profilePicUrlHD?: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  externalUrl?: string;
  verified: boolean;
  private: boolean;
  latestPosts?: ApifyPost[];
}

/**
 * Transforms Apify Instagram Profile Scraper output to our InstagramProfile type
 */
export function transformApifyToProfile(apifyData: ApifyProfileData): InstagramProfile {
  // Transform posts
  const recentPosts: InstagramPost[] = (apifyData.latestPosts || []).slice(0, 10).map((post) => {
    const totalEngagement = post.likesCount + post.commentsCount;
    const engagementRate = apifyData.followersCount > 0
      ? (totalEngagement / apifyData.followersCount) * 100
      : 0;

    return {
      id: post.id,
      imageUrl: post.displayUrl || "",
      videoUrl: post.videoUrl,
      caption: post.caption || "",
      likesCount: post.likesCount || 0,
      commentsCount: post.commentsCount || 0,
      timestamp: post.timestamp || new Date().toISOString(),
      engagementRate: parseFloat(engagementRate.toFixed(2)),
      type: post.type === "Video" || post.videoUrl ? "video" : post.type === "Sidecar" ? "image" : "image",
    };
  });

  // Extract hashtags from posts
  const hashtagMap = new Map<string, number>();
  apifyData.latestPosts?.forEach((post) => {
    post.hashtags?.forEach((tag) => {
      const normalizedTag = tag.startsWith("#") ? tag : `#${tag}`;
      hashtagMap.set(normalizedTag, (hashtagMap.get(normalizedTag) || 0) + 1);
    });
  });

  const topHashtags: HashtagData[] = Array.from(hashtagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  // Calculate metrics from recent posts
  const avgLikes = recentPosts.length > 0
    ? Math.round(recentPosts.reduce((sum, post) => sum + post.likesCount, 0) / recentPosts.length)
    : 0;

  const avgComments = recentPosts.length > 0
    ? Math.round(recentPosts.reduce((sum, post) => sum + post.commentsCount, 0) / recentPosts.length)
    : 0;

  const avgEngagementRate = recentPosts.length > 0
    ? parseFloat((recentPosts.reduce((sum, post) => sum + post.engagementRate, 0) / recentPosts.length).toFixed(2))
    : 0;

  // Create engagement history from recent posts (simplified)
  const engagementHistory: EngagementData[] = recentPosts.slice(0, 15).reverse().map((post) => {
    const date = new Date(post.timestamp);
    return {
      date: date.toISOString().split('T')[0],
      rate: post.engagementRate,
      likes: post.likesCount,
      comments: post.commentsCount,
    };
  });

  return {
    username: apifyData.username,
    fullName: apifyData.fullName || apifyData.username,
    bio: apifyData.biography || "",
    profilePicUrl: apifyData.profilePicUrlHD || apifyData.profilePicUrl || "",
    followersCount: apifyData.followersCount || 0,
    followingCount: apifyData.followsCount || 0,
    postsCount: apifyData.postsCount || 0,
    externalUrl: apifyData.externalUrl,
    isVerified: apifyData.verified || false,
    isPrivate: apifyData.private || false,
    metrics: {
      engagementRate: avgEngagementRate,
      avgLikesPerPost: avgLikes,
      avgCommentsPerPost: avgComments,
      followerGrowth: 0, // Not available from single scrape
      reachGrowth: 0, // Not available from single scrape
    },
    recentPosts,
    topHashtags,
    engagementHistory,
  };
}
