import { Hash } from "lucide-react";
import { InstagramProfile } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface HashtagCloudProps {
  profile: InstagramProfile | null;
  isLoading?: boolean;
}

export function HashtagCloud({ profile, isLoading }: HashtagCloudProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile || !profile.topHashtags.length) {
    return null;
  }

  // Calculate relative sizes based on usage count
  const maxCount = Math.max(...profile.topHashtags.map(h => h.count));
  const minCount = Math.min(...profile.topHashtags.map(h => h.count));

  const getTagSize = (count: number) => {
    const normalized = (count - minCount) / (maxCount - minCount || 1);
    if (normalized > 0.7) return "text-lg font-semibold";
    if (normalized > 0.4) return "text-base";
    return "text-sm";
  };

  const getTagOpacity = (count: number) => {
    const normalized = (count - minCount) / (maxCount - minCount || 1);
    return 0.6 + normalized * 0.4; // Range from 0.6 to 1.0
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          Top Hashtags
        </CardTitle>
        <CardDescription>
          Most frequently used hashtags across all posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 items-center">
          {profile.topHashtags.map((hashtag, index) => (
            <div
              key={hashtag.tag}
              className={`inline-flex items-center gap-1 ${getTagSize(hashtag.count)} transition-all hover:scale-105 cursor-default`}
              style={{ opacity: getTagOpacity(hashtag.count) }}
            >
              <Badge
                variant={index < 3 ? "default" : "secondary"}
                className="px-3 py-1"
              >
                {hashtag.tag}
                <span className="ml-2 text-xs opacity-70">({hashtag.count})</span>
              </Badge>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Total unique hashtags: {profile.topHashtags.length}
        </p>
      </CardContent>
    </Card>
  );
}