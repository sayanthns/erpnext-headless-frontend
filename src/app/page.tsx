import { getList } from '@/lib/frappe';
import Link from 'next/link';
import ChatbotWidget from '@/components/ChatbotWidget';

export default async function Home() {
  // Fetch some summary data for the dashboard
  let salesInvoices = [];
  let itemStock = [];

  try {
    salesInvoices = await getList('Sales Invoice', ['name', 'grand_total', 'status'], [], 5);
    itemStock = await getList('Item', ['name', 'item_name', 'stock_uom'], [], 5);
  } catch (err) {
    console.error("Error fetching data:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 font-bold text-2xl border-b border-slate-800">
          SaaS ERP
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/" className="block p-3 rounded-lg bg-indigo-600 font-medium">Dashboard</Link>
          <Link href="/sales" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">Sales</Link>
          <Link href="/purchase" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">Purchase</Link>
          <Link href="/stock" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">Stock</Link>
          <Link href="/accounting" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">Accounting</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Home Dashboard</h1>
          <div className="w-10 h-10 rounded-full bg-slate-300"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Sales</div>
            <div className="text-3xl font-bold text-slate-800">
              {salesInvoices.length > 0 ? `₹${salesInvoices.reduce((acc: number, cur: any) => acc + (cur.grand_total || 0), 0).toLocaleString()}` : '₹0'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Items in Catalog</div>
            <div className="text-3xl font-bold text-slate-800">
              {itemStock.length || '0'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Active Users</div>
            <div className="text-3xl font-bold text-slate-800">1</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 font-semibold text-slate-800">
            Recent Sales Invoices
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="p-4 font-medium">Invoice ID</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {salesInvoices.length === 0 ? (
                <tr><td colSpan={3} className="p-4 text-center text-gray-500">No recent invoices</td></tr>
              ) : (
                salesInvoices.map((inv: any) => (
                  <tr key={inv.name} className="border-t border-gray-100">
                    <td className="p-4 font-medium text-indigo-600">{inv.name}</td>
                    <td className="p-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{inv.status}</span></td>
                    <td className="p-4">₹{inv.grand_total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Floating Chatbot Widget Add-in */}
      <ChatbotWidget />
    </div>
  );
}
