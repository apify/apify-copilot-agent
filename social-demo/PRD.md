# Product Requirements Document - Instagram Analytics Demo

## Executive Summary
A single-page Instagram analytics dashboard that displays key metrics and insights for an Instagram profile. The demo serves as a scaffolding to showcase how the GitHub Copilot agent can integrate Apify's Instagram Profile Scraper into existing codebases.

## Objectives
1. Create a visually appealing Instagram analytics interface
2. Demonstrate clean separation between UI and data layer
3. Provide scaffolding ready for Apify actor integration
4. Complete implementation in under 1 hour

## Target Audience
Developers evaluating Apify integration capabilities through GitHub Copilot agent.

## Functional Requirements

### 1. Search Functionality
- **Input Field**: Accept Instagram URL or username
- **Validation**: Basic input validation
- **Submit Action**: Trigger data display (mock data initially)
- **Error Handling**: Display user-friendly error messages

### 2. Profile Display
- **Profile Header**:
  - Profile picture
  - Username and full name
  - Bio text
  - External URL (if available)
  - Verification badge
  - Follower/Following counts

### 3. Key Metrics Dashboard
Display 4 primary KPIs in card format:
- **Followers**: Total count with growth percentage
- **Engagement Rate**: Calculated metric with trend
- **Average Likes**: Per post average
- **Posts Count**: Total published posts

### 4. Data Visualizations

#### Engagement Trend Chart
- Line chart showing engagement over time
- X-axis: Time period (last 30 days)
- Y-axis: Engagement rate percentage
- Interactive tooltips

#### Posts Grid
- Display last 10 posts
- Show thumbnail, likes, comments
- Calculate engagement per post
- Click to view (mock interaction)

#### Hashtag Analysis
- Display top 10-15 frequently used hashtags
- Visual representation (tag cloud or badges)
- Show usage frequency

## Non-Functional Requirements

### Performance
- Page load time < 2 seconds
- Smooth transitions and interactions
- Responsive to user inputs

### Design
- Follow Apify brand guidelines
- Mobile-responsive layout
- Clean, professional appearance
- Consistent spacing and typography

### Technical
- Built with Next.js and TypeScript
- Use ShadCN component library
- Styled with Tailwind CSS
- Mock data structure matching Apify actor output

## Data Structure

### Instagram Profile Model
```typescript
{
  username: string
  fullName: string
  bio: string
  profilePicUrl: string
  followersCount: number
  followingCount: number
  postsCount: number
  externalUrl: string
  isVerified: boolean

  metrics: {
    engagementRate: number
    avgLikesPerPost: number
    avgCommentsPerPost: number
    followerGrowth: number
  }

  recentPosts: Array<{
    id: string
    imageUrl: string
    caption: string
    likesCount: number
    commentsCount: number
    timestamp: string
    engagementRate: number
  }>

  topHashtags: Array<{
    tag: string
    count: number
  }>

  engagementHistory: Array<{
    date: string
    rate: number
  }>
}
```

## User Flow
1. User lands on dashboard page
2. Enters Instagram username/URL in search bar
3. Clicks "Analyze" button
4. Loading state displays while "fetching"
5. Dashboard populates with profile data
6. User explores metrics, charts, and posts
7. Can search for different profile

## Success Metrics
- Clean, intuitive interface
- All components render without errors
- Mock data displays correctly
- Ready for Apify integration
- Completed within time constraint

## Future Enhancements (Post-Demo)
- Real-time data fetching via Apify actor
- Historical data comparison
- Export functionality
- Multiple account comparison
- Scheduled reports
- Advanced filtering options

## Constraints
- Must be completed in < 1 hour
- No Apify-specific code in initial build
- Single-page application only
- Mock data only (no real API calls)
- Desktop and mobile responsive

## Technical Stack
- **Framework**: Next.js 16
- **Language**: TypeScript
- **UI Library**: ShadCN
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React hooks (useState, useEffect)

## Deliverables
1. Fully functional single-page dashboard
2. Mock data structure
3. Documentation files
4. Clean, maintainable code
5. Ready for Apify integration