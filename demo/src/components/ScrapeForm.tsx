'use client';

import { useState } from 'react';

export default function ScrapeForm() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // TODO: Implement handleSubmit function that calls the Apify scrape API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Call POST /api/scrape with search query
    // TODO: Handle response and update UI
    
    console.log('TODO: Implement scrape API call for search:', search);
    
    setTimeout(() => {
      setLoading(false);
      alert('TODO: Connect to Apify API - search: ' + search);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Trigger E-commerce Scrape</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Query
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g., iPhone 15 Pro"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter a product name or category to scrape
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Running...' : 'Run Scrape'}
        </button>
      </form>
    </div>
  );
}

