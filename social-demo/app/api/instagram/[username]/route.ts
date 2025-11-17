import { NextRequest, NextResponse } from "next/server";
import { ApifyClient } from "apify-client";
import { transformApifyToProfile } from "@/lib/apify-transform";

// Initialize the Apify client
const getApifyClient = () => {
  const token = process.env.APIFY_TOKEN;
  
  if (!token) {
    throw new Error("APIFY_TOKEN environment variable is not set");
  }
  
  return new ApifyClient({ token });
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Clean the username (remove @ if present)
    const cleanUsername = username.replace("@", "").trim();

    console.log(`Fetching Instagram profile for: ${cleanUsername}`);

    // Initialize Apify client
    const client = getApifyClient();

    // Call the Instagram Profile Scraper Actor
    const run = await client.actor("apify/instagram-profile-scraper").call({
      usernames: [cleanUsername],
      includeAboutSection: false, // Set to true if you have a paid plan
    });

    // Get the results from the dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Profile not found or account is private" },
        { status: 404 }
      );
    }

    // Transform the first (and only) result to our format
    const profileData = items[0] as any; // Type from Apify may vary
    
    // Check if the account is private
    if (profileData.private) {
      return NextResponse.json(
        { error: "This account is private and cannot be scraped" },
        { status: 403 }
      );
    }

    const transformedProfile = transformApifyToProfile(profileData);

    return NextResponse.json(transformedProfile);
  } catch (error) {
    console.error("Error fetching Instagram profile:", error);
    
    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes("APIFY_TOKEN")) {
        return NextResponse.json(
          { error: "Apify configuration error. Please check your APIFY_TOKEN environment variable." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch Instagram profile. Please try again later." },
      { status: 500 }
    );
  }
}
