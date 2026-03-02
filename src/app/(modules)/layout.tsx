import Link from 'next/link';
import ChatbotWidget from '@/components/ChatbotWidget';

export default function ModulesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
                <div className="p-6 font-bold text-2xl border-b border-slate-800">
                    SaaS ERP
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">Dashboard</Link>
                    <Link href="/sales" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors focus:bg-indigo-600">Sales</Link>
                    <Link href="/purchase" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors focus:bg-indigo-600">Purchase</Link>
                    <Link href="/stock" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors focus:bg-indigo-600">Stock</Link>
                    <Link href="/accounting" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors focus:bg-indigo-600">Accounting</Link>
                </nav>
                <div className="p-4 border-t border-slate-800 space-y-2">
                    <Link href="/users" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors text-sm">Users</Link>
                    <Link href="/settings" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors text-sm">Settings</Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white border-b border-gray-200 p-4 flex justify-end items-center px-8 shadow-sm z-10">
                    <div className="w-10 h-10 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300 transition-colors"></div>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>

            <ChatbotWidget />
        </div>
    );
}
