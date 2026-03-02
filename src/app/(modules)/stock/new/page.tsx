'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNewItem() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemGroup, setItemGroup] = useState('Products');
    const [uom, setUom] = useState('Nos');
    const [rate, setRate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            item_code: itemCode,
            item_name: itemName,
            item_group: itemGroup,
            stock_uom: uom,
            standard_rate: rate ? parseFloat(rate) : 0,
            is_stock_item: 1
        };

        try {
            const res = await fetch('/api/proxy?endpoint=resource/Item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok) {
                alert("Item created successfully! ID: " + data.data.name);
                router.push('/stock');
            } else {
                alert("Error creating Item: " + JSON.stringify(data));
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Add New Item</h1>
                    <p className="text-gray-500 mt-2">Create a new item in your main catalog.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Code *</label>
                    <input
                        type="text" required
                        placeholder="e.g. WH-001"
                        value={itemCode}
                        onChange={(e) => setItemCode(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                    <input
                        type="text" required
                        placeholder="e.g. Widget Hammer"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Item Group</label>
                        <select
                            value={itemGroup}
                            onChange={(e) => setItemGroup(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="Products">Products</option>
                            <option value="Services">Services</option>
                            <option value="Raw Material">Raw Material</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock UOM</label>
                        <select
                            value={uom}
                            onChange={(e) => setUom(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="Nos">Nos</option>
                            <option value="Kg">Kg</option>
                            <option value="Box">Box</option>
                            <option value="Hours">Hours</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Standard Selling Rate (₹)</label>
                    <input
                        type="number" step="0.01"
                        placeholder="0.00"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="pt-6 flex justify-end gap-4 border-t border-gray-100">
                    <button type="button" onClick={() => router.push('/stock')} className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50">
                        {submitting ? 'Saving...' : 'Save Item'}
                    </button>
                </div>
            </form>
        </div>
    );
}
