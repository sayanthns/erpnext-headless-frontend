export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                    <p className="text-gray-500 mt-2">Manage your SaaS configuration and AI preferences.</p>
                </div>
                <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm">
                    Save Changes
                </button>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">General Preferences</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input type="text" defaultValue="SaaS ERP Ltd." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                <option>INR (₹)</option>
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">AI Chatbot Configuration</h2>
                    <p className="text-sm text-gray-500 mb-6">These settings override the default AI behavior configured in Grey-Theme.</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">AI Prompt Persona</label>
                            <textarea
                                rows={3}
                                defaultValue="You are a helpful ERP assistant. Only answer questions related to Sales, Purchase, Stock, and Accounting data within this system."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" id="show-widget" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" defaultChecked />
                            <label htmlFor="show-widget" className="ml-2 block text-sm text-gray-900">
                                Enable Floating AI Chat Widget
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
