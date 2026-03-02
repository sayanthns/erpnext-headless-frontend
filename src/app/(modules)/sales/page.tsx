import { getList } from '@/lib/frappe';

export default async function SalesPage() {
    let invoices = [];

    try {
        invoices = await getList('Sales Invoice', ['name', 'customer', 'customer_name', 'posting_date', 'grand_total', 'status'], [], 50);
    } catch (err) {
        console.error("Failed fetching sales invoices:", err);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Sales</h1>
                    <p className="text-gray-500 mt-2">Manage your sales invoices and customers.</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                    New Invoice
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-semibold text-slate-800">All Sales Invoices</h2>
                    <input type="text" placeholder="Search..." className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="p-4 font-medium border-b border-gray-100">Invoice ID</th>
                                <th className="p-4 font-medium border-b border-gray-100">Date</th>
                                <th className="p-4 font-medium border-b border-gray-100">Customer</th>
                                <th className="p-4 font-medium border-b border-gray-100">Status</th>
                                <th className="p-4 font-medium border-b border-gray-100 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoices.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No invoices found.</td></tr>
                            ) : (
                                invoices.map((inv: any) => (
                                    <tr key={inv.name} className="hover:bg-gray-50 transition-colors cursor-pointer text-sm">
                                        <td className="p-4 font-medium text-indigo-600">{inv.name}</td>
                                        <td className="p-4 text-gray-600">{inv.posting_date}</td>
                                        <td className="p-4 text-gray-800">{inv.customer_name || inv.customer}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                    inv.status === 'Unpaid' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-medium text-slate-900">₹{(inv.grand_total || 0).toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
                    <span>Showing {invoices.length} results</span>
                    <div className="space-x-2">
                        <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-100">Previous</button>
                        <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-100">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
