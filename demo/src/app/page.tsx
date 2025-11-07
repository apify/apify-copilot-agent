import ScrapeForm from '@/components/ScrapeForm';
import StatsCards from '@/components/StatsCards';
import RunHistory from '@/components/RunHistory';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Apify E-commerce Intelligence Demo</h1>
          <p className="text-gray-600 mt-2">
            Scrape e-commerce data and store it in Supabase
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>🤖 Demo Mode:</strong> This is a scaffold project. Use the Apify Expert Copilot agent 
              to build the integration following the instructions in <code className="bg-blue-100 px-1 rounded">.github/agents/apify-integration-expert.md</code>
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Scrape Form */}
          <div className="lg:col-span-1">
            <ScrapeForm />
          </div>

          {/* Right Column - Run History */}
          <div className="lg:col-span-2">
            <RunHistory />
          </div>
        </div>

        {/* Product Grid - Full Width */}
        <div className="mt-8">
          <ProductGrid />
        </div>
      </div>
    </main>
  );
}
