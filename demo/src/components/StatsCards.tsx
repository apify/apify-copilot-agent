export default function StatsCards() {
  // TODO: Fetch actual statistics from API
  const stats = [
    { label: 'Total Products', value: '—', icon: '📦' },
    { label: 'Total Runs', value: '—', icon: '🔄' },
    { label: 'Last Run', value: 'Never', icon: '⏰' },
    { label: 'Success Rate', value: '—%', icon: '✅' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </div>
          <p className="text-xs text-gray-400 mt-2">TODO: Connect to API</p>
        </div>
      ))}
    </div>
  );
}

