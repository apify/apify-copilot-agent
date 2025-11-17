import Image from "next/image";
import { ExternalLink, CheckCircle } from "lucide-react";
import { InstagramProfile } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileHeaderProps {
  profile: InstagramProfile | null;
  isLoading?: boolean;
}

export function ProfileHeader({ profile, isLoading }: ProfileHeaderProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-card rounded-lg border">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="flex-1 space-y-3 text-center md:text-left">
          <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
          <Skeleton className="h-4 w-64 mx-auto md:mx-0" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 bg-card rounded-lg border text-center text-muted-foreground">
        Enter an Instagram username to view analytics
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-card rounded-lg border">
      <div className="relative">
        <Image
          src={profile.profilePicUrl}
          alt={profile.username}
          width={128}
          height={128}
          className="rounded-full border-4 border-primary/10"
        />
        {profile.isVerified && (
          <CheckCircle className="absolute -bottom-2 -right-2 h-8 w-8 text-primary bg-white rounded-full" />
        )}
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
          <h1 className="text-2xl font-bold">{profile.fullName}</h1>
          {profile.isPrivate && (
            <Badge variant="secondary">Private</Badge>
          )}
        </div>

        <p className="text-muted-foreground mb-4">@{profile.username}</p>

        <p className="text-sm mb-4 whitespace-pre-wrap">{profile.bio}</p>

        {profile.externalUrl && (
          <a
            href={profile.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
          >
            <ExternalLink className="h-3 w-3" />
            {profile.externalUrl.replace(/^https?:\/\//, "")}
          </a>
        )}

        <div className="flex gap-6 mt-4 justify-center md:justify-start">
          <div>
            <p className="text-2xl font-bold">{formatNumber(profile.postsCount)}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{formatNumber(profile.followersCount)}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{formatNumber(profile.followingCount)}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}