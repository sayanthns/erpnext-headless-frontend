import { getList } from '@/lib/frappe';

export default async function UsersPage() {
    let users = [];

    try {
        users = await getList('User', ['name', 'full_name', 'email', 'enabled', 'last_login'], [['user_type', '=', 'System User']], 50);
    } catch (err) {
        console.error("Failed fetching users:", err);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Users</h1>
                    <p className="text-gray-500 mt-2">Manage people who have access to this ERP system.</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                    Invite User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-semibold text-slate-800">System Users</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="p-4 font-medium border-b border-gray-100">Full Name</th>
                                <th className="p-4 font-medium border-b border-gray-100">Email</th>
                                <th className="p-4 font-medium border-b border-gray-100">Status</th>
                                <th className="p-4 font-medium border-b border-gray-100">Last Login</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-400">No users found.</td></tr>
                            ) : (
                                users.map((user: any) => (
                                    <tr key={user.name} className="hover:bg-gray-50 transition-colors cursor-pointer text-sm">
                                        <td className="p-4 font-medium text-slate-900">{user.full_name}</td>
                                        <td className="p-4 text-gray-600">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${user.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {user.enabled ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500">{user.last_login || 'Never'}</td>
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
