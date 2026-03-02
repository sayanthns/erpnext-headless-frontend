import { getList } from '@/lib/frappe';

export default async function PurchasePage() {
    let orders = [];

    try {
        orders = await getList('Purchase Order', ['name', 'supplier', 'transaction_date', 'grand_total', 'status'], [], 50);
    } catch (err) {
        console.error("Failed fetching purchase orders:", err);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Purchase</h1>
                    <p className="text-gray-500 mt-2">Manage your purchase orders and suppliers.</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                    New Purchase Order
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-semibold text-slate-800">All Purchase Orders</h2>
                    <input type="text" placeholder="Search..." className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="p-4 font-medium border-b border-gray-100">Order ID</th>
                                <th className="p-4 font-medium border-b border-gray-100">Date</th>
                                <th className="p-4 font-medium border-b border-gray-100">Supplier</th>
                                <th className="p-4 font-medium border-b border-gray-100">Status</th>
                                <th className="p-4 font-medium border-b border-gray-100 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No purchase orders found.</td></tr>
                            ) : (
                                orders.map((po: any) => (
                                    <tr key={po.name} className="hover:bg-gray-50 transition-colors cursor-pointer text-sm">
                                        <td className="p-4 font-medium text-indigo-600">{po.name}</td>
                                        <td className="p-4 text-gray-600">{po.transaction_date}</td>
                                        <td className="p-4 text-gray-800">{po.supplier}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${po.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    po.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {po.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-medium text-slate-900">₹{(po.grand_total || 0).toLocaleString()}</td>
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
