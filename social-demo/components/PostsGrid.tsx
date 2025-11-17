import Image from "next/image";
import { Heart, MessageCircle, Play } from "lucide-react";
import { InstagramProfile } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PostsGridProps {
  profile: InstagramProfile | null;
  isLoading?: boolean;
}

export function PostsGrid({ profile, isLoading }: PostsGridProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }

  if (!profile || !profile.recentPosts.length) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {profile.recentPosts.map((post) => (
          <div
            key={post.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square bg-muted"
          >
            <Image
              src={post.imageUrl}
              alt={post.caption.slice(0, 50)}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />

            {/* Video/Reel indicator */}
            {(post.type === "video" || post.type === "reel") && (
              <div className="absolute top-2 right-2 bg-black/70 p-1 rounded">
                <Play className="h-4 w-4 text-white fill-white" />
              </div>
            )}

            {/* Hover overlay with stats */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-white text-center">
                <div className="flex items-center gap-4 justify-center mb-2">
                  <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5 fill-white" />
                    <span className="font-semibold">{formatNumber(post.likesCount)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-5 w-5 fill-white" />
                    <span className="font-semibold">{formatNumber(post.commentsCount)}</span>
                  </div>
                </div>
                <p className="text-xs">
                  Engagement: {post.engagementRate.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Caption tooltip (first line) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs line-clamp-2">
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}