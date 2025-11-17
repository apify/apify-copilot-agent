"use client";

import { useState } from "react";
import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { ProfileHeader } from "@/components/ProfileHeader";
import { MetricsCards } from "@/components/MetricsCards";
import { EngagementChart } from "@/components/EngagementChart";
import { PostsGrid } from "@/components/PostsGrid";
import { HashtagCloud } from "@/components/HashtagCloud";
import { InstagramProfile } from "@/lib/types";


export default function Home() {
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API route to fetch real Instagram data via Apify
      const response = await fetch(`/api/instagram/${encodeURIComponent(username)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch profile");
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1672EB] to-[#1480FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Instagram Analytics</h1>
                <p className="text-sm text-muted-foreground">Powered by Apify</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Demo Application
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">
              Analyze Any Instagram Profile
            </h2>
            <p className="text-muted-foreground">
              Get detailed insights and metrics for any public Instagram account
            </p>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
              <p className="text-destructive font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Dashboard Content */}
        {(profile || isLoading) && (
          <div className="space-y-6">
            {/* Profile Header */}
            <ProfileHeader profile={profile} isLoading={isLoading} />

            {/* Metrics Cards */}
            <MetricsCards profile={profile} isLoading={isLoading} />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementChart profile={profile} isLoading={isLoading} />
              <HashtagCloud profile={profile} isLoading={isLoading} />
            </div>

            {/* Posts Grid */}
            <PostsGrid profile={profile} isLoading={isLoading} />
          </div>
        )}

        {/* Empty State */}
        {!profile && !isLoading && (
          <div className="text-center py-16">
            <div className="instagram-gradient w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Profile Loaded</h3>
            <p className="text-muted-foreground">
              Enter an Instagram username above to view analytics
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              This is a demo application showcasing Apify integration capabilities.
            </p>
            <p className="mt-1">
              Built with Next.js, TypeScript, and ShadCN UI components.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}