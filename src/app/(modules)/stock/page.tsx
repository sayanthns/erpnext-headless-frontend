import { getList } from '@/lib/frappe';

export default async function StockPage() {
    let items = [];

    try {
        items = await getList('Item', ['name', 'item_code', 'item_name', 'item_group', 'standard_rate', 'stock_uom'], [], 50);
    } catch (err) {
        console.error("Failed fetching items:", err);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Stock</h1>
                    <p className="text-gray-500 mt-2">Manage your items, catalog, and inventory.</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                    Add New Item
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-semibold text-slate-800">Item Catalog</h2>
                    <input type="text" placeholder="Search Items..." className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="p-4 font-medium border-b border-gray-100">Item Code</th>
                                <th className="p-4 font-medium border-b border-gray-100">Item Name</th>
                                <th className="p-4 font-medium border-b border-gray-100">Group</th>
                                <th className="p-4 font-medium border-b border-gray-100">UOM</th>
                                <th className="p-4 font-medium border-b border-gray-100 text-right">Standard Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No items found.</td></tr>
                            ) : (
                                items.map((item: any) => (
                                    <tr key={item.name} className="hover:bg-gray-50 transition-colors cursor-pointer text-sm">
                                        <td className="p-4 font-medium text-indigo-600">{item.item_code}</td>
                                        <td className="p-4 text-gray-800 font-medium">{item.item_name}</td>
                                        <td className="p-4 text-gray-600">{item.item_group}</td>
                                        <td className="p-4 text-gray-500">{item.stock_uom}</td>
                                        <td className="p-4 text-right font-medium text-slate-900">₹{(item.standard_rate || 0).toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
