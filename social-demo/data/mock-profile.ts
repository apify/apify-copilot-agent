import { InstagramProfile } from "@/lib/types";

// Mock data structure ready for Apify Instagram Profile Scraper integration
// This structure mimics the expected output from the Apify actor
// To integrate with real data, replace this mock with API call to Apify

export const mockProfile: InstagramProfile = {
  username: "techinfluencer",
  fullName: "Tech Influencer",
  bio: "🚀 Tech enthusiast | 💻 Software developer | 📱 Gadget reviewer\n🎯 Helping you stay updated with latest tech\n📍 San Francisco, CA\n👇 Check out my latest blog",
  profilePicUrl: "https://picsum.photos/150/150?random=1",
  followersCount: 128470,
  followingCount: 892,
  postsCount: 1247,
  externalUrl: "https://techblog.example.com",
  isVerified: true,
  isPrivate: false,

  metrics: {
    engagementRate: 3.8,
    avgLikesPerPost: 4875,
    avgCommentsPerPost: 234,
    followerGrowth: 8.5, // percentage growth
    reachGrowth: 12.3,
  },

  recentPosts: [
    {
      id: "post1",
      imageUrl: "https://picsum.photos/400/400?random=2",
      caption: "Just unboxed the latest smartphone! 📱 Full review coming soon on the blog. What features are you most excited about? #tech #smartphone #review",
      likesCount: 5234,
      commentsCount: 289,
      timestamp: "2024-01-15T10:30:00Z",
      engagementRate: 4.3,
      type: "image",
    },
    {
      id: "post2",
      imageUrl: "https://picsum.photos/400/400?random=3",
      videoUrl: "https://example.com/video.mp4",
      caption: "Quick coding tip of the day! 💡 How to optimize your React app performance. Save this for later! #coding #react #webdev",
      likesCount: 6891,
      commentsCount: 412,
      timestamp: "2024-01-14T15:45:00Z",
      engagementRate: 5.7,
      type: "reel",
    },
    {
      id: "post3",
      imageUrl: "https://picsum.photos/400/400?random=4",
      caption: "New workspace setup tour! 🖥️ Finally completed my dream desk setup. Swipe to see all the details #workspace #desksetup #productivity",
      likesCount: 8123,
      commentsCount: 567,
      timestamp: "2024-01-13T09:15:00Z",
      engagementRate: 6.8,
      type: "image",
    },
    {
      id: "post4",
      imageUrl: "https://picsum.photos/400/400?random=5",
      caption: "AI is changing everything! 🤖 Here's my take on the latest developments in machine learning #ai #machinelearning #future",
      likesCount: 4567,
      commentsCount: 234,
      timestamp: "2024-01-12T14:20:00Z",
      engagementRate: 3.7,
      type: "image",
    },
    {
      id: "post5",
      imageUrl: "https://picsum.photos/400/400?random=6",
      videoUrl: "https://example.com/video2.mp4",
      caption: "Day in the life of a software developer! Follow along as I tackle bugs and ship features 🚀 #developerlife #coding #dayinthelife",
      likesCount: 7234,
      commentsCount: 445,
      timestamp: "2024-01-11T11:00:00Z",
      engagementRate: 6.0,
      type: "reel",
    },
    {
      id: "post6",
      imageUrl: "https://picsum.photos/400/400?random=7",
      caption: "Top 5 VS Code extensions you need in 2024! Which ones do you use? 💻 #vscode #programming #tools",
      likesCount: 3892,
      commentsCount: 178,
      timestamp: "2024-01-10T16:30:00Z",
      engagementRate: 3.2,
      type: "image",
    },
    {
      id: "post7",
      imageUrl: "https://picsum.photos/400/400?random=8",
      caption: "Coffee and code ☕ Perfect Monday morning vibes. What's your favorite coding drink? #monday #coding #coffee",
      likesCount: 2987,
      commentsCount: 123,
      timestamp: "2024-01-09T08:45:00Z",
      engagementRate: 2.4,
      type: "image",
    },
    {
      id: "post8",
      imageUrl: "https://picsum.photos/400/400?random=9",
      caption: "New gadget alert! 🎮 Testing out the latest gaming console. First impressions in stories! #gaming #tech #console",
      likesCount: 5678,
      commentsCount: 334,
      timestamp: "2024-01-08T19:00:00Z",
      engagementRate: 4.7,
      type: "image",
    },
    {
      id: "post9",
      imageUrl: "https://picsum.photos/400/400?random=10",
      videoUrl: "https://example.com/video3.mp4",
      caption: "Tutorial: Build your first API in 10 minutes! 🚀 Full code in the comments #api #tutorial #backend",
      likesCount: 4123,
      commentsCount: 267,
      timestamp: "2024-01-07T13:15:00Z",
      engagementRate: 3.4,
      type: "reel",
    },
    {
      id: "post10",
      imageUrl: "https://picsum.photos/400/400?random=11",
      caption: "Weekend project complete! Built a automation tool that saves me 2 hours daily 🤖 #automation #productivity #weekend",
      likesCount: 6789,
      commentsCount: 423,
      timestamp: "2024-01-06T17:30:00Z",
      engagementRate: 5.6,
      type: "image",
    },
  ],

  topHashtags: [
    { tag: "#tech", count: 234 },
    { tag: "#coding", count: 189 },
    { tag: "#programming", count: 167 },
    { tag: "#developer", count: 145 },
    { tag: "#software", count: 132 },
    { tag: "#ai", count: 98 },
    { tag: "#webdev", count: 87 },
    { tag: "#javascript", count: 76 },
    { tag: "#react", count: 65 },
    { tag: "#productivity", count: 54 },
    { tag: "#tutorial", count: 43 },
    { tag: "#gadgets", count: 38 },
  ],

  engagementHistory: [
    { date: "2024-01-15", rate: 3.8, likes: 5234, comments: 289 },
    { date: "2024-01-14", rate: 5.7, likes: 6891, comments: 412 },
    { date: "2024-01-13", rate: 6.8, likes: 8123, comments: 567 },
    { date: "2024-01-12", rate: 3.7, likes: 4567, comments: 234 },
    { date: "2024-01-11", rate: 6.0, likes: 7234, comments: 445 },
    { date: "2024-01-10", rate: 3.2, likes: 3892, comments: 178 },
    { date: "2024-01-09", rate: 2.4, likes: 2987, comments: 123 },
    { date: "2024-01-08", rate: 4.7, likes: 5678, comments: 334 },
    { date: "2024-01-07", rate: 3.4, likes: 4123, comments: 267 },
    { date: "2024-01-06", rate: 5.6, likes: 6789, comments: 423 },
    { date: "2024-01-05", rate: 4.2, likes: 5123, comments: 312 },
    { date: "2024-01-04", rate: 3.9, likes: 4789, comments: 278 },
    { date: "2024-01-03", rate: 5.1, likes: 6234, comments: 389 },
    { date: "2024-01-02", rate: 4.5, likes: 5567, comments: 334 },
    { date: "2024-01-01", rate: 7.2, likes: 8901, comments: 623 },
  ],
};

// Function to simulate fetching profile data
// In real implementation, this would call the Apify actor API
export async function fetchInstagramProfile(username: string): Promise<InstagramProfile> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In production, this would be:
  // const response = await fetch(`/api/instagram/${username}`);
  // return response.json();

  // For demo, return mock data with username replaced
  return {
    ...mockProfile,
    username: username.replace("@", ""),
  };
}