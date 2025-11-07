'use client';

export default function ProductGrid() {
  // TODO: Fetch products from GET /api/products
  const mockProducts: any[] = [
    // Placeholder data structure
    // { id: '1', title: 'Product Name', price: 99.99, imageUrl: '...', availability: 'In Stock' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Scraped Products</h2>
      
      {mockProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-4">🛍️</p>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-2">Run a scrape to see product listings here</p>
          <p className="text-xs text-gray-400 mt-4">TODO: Implement product fetching from API</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Availability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Merchant</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* TODO: Map over actual products and display them */}
              {mockProducts.map((product: any) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.imageUrl} alt={product.title} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4">{product.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.availability}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.merchant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

