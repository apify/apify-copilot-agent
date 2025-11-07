'use client';

export default function RunHistory() {
  // TODO: Fetch runs from GET /api/runs
  const mockRuns: any[] = [
    // Placeholder data structure
    // { id: '1', status: 'succeeded', query: 'iPhone 15', itemCount: 25, createdAt: '2024-01-01' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Run History</h2>
      
      {mockRuns.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-4">📊</p>
          <p className="text-lg font-medium">No runs yet</p>
          <p className="text-sm mt-2">Trigger a scrape to see results here</p>
          <p className="text-xs text-gray-400 mt-4">TODO: Implement run fetching from API</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* TODO: Map over actual runs and display them */}
          {mockRuns.map((run: any) => (
            <div key={run.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{run.query}</span>
                  <span className="ml-2 text-sm text-gray-500">{run.itemCount} items</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  run.status === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {run.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

