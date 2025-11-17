"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Remove @ if present and clean the input
      const cleanUsername = username.trim().replace("@", "").replace("https://instagram.com/", "").replace("https://www.instagram.com/", "");
      onSearch(cleanUsername);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Enter Instagram username or URL (e.g., @username)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading || !username.trim()}>
          {isLoading ? "Analyzing..." : "Analyze Profile"}
        </Button>
      </div>
    </form>
  );
}