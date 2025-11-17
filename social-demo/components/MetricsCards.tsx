import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Activity } from "lucide-react";
import { InstagramProfile } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricsCardsProps {
  profile: InstagramProfile | null;
  isLoading?: boolean;
}

export function MetricsCards({ profile, isLoading }: MetricsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const metrics = [
    {
      title: "Followers",
      value: formatNumber(profile.followersCount),
      change: profile.metrics.followerGrowth,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Engagement Rate",
      value: `${profile.metrics.engagementRate.toFixed(2)}%`,
      change: profile.metrics.engagementRate > 3 ? 1 : -1, // Above 3% is good
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Avg Likes",
      value: formatNumber(profile.metrics.avgLikesPerPost),
      change: null,
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Avg Comments",
      value: formatNumber(profile.metrics.avgCommentsPerPost),
      change: null,
      icon: MessageCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.change && metric.change > 0;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                {metric.title}
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold">{metric.value}</p>
                {metric.change !== null && (
                  <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendIcon className="h-3 w-3" />
                    <span>{Math.abs(metric.change)}%</span>
                  </div>
                )}
              </div>
            </CardContent>
            <div
              className="absolute inset-x-0 bottom-0 h-1 apify-gradient"
              style={{ opacity: metric.change ? Math.abs(metric.change) / 20 : 0.3 }}
            />
          </Card>
        );
      })}
    </div>
  );
}