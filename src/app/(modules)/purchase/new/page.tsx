'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPurchaseOrder() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [supplier, setSupplier] = useState('');
    const [items, setItems] = useState([{ item_code: '', qty: 1, rate: 0, amount: 0 }]);

    useEffect(() => {
        async function loadData() {
            try {
                const [supRes, itemRes] = await Promise.all([
                    fetch('/api/proxy?endpoint=resource/Supplier&fields=["name","supplier_name"]'),
                    fetch('/api/proxy?endpoint=resource/Item&fields=["name","item_code","item_name","standard_rate"]')
                ]);
                const supData = await supRes.json();
                const itemData = await itemRes.json();

                if (supData.data) setSuppliers(supData.data);
                if (itemData.data) setItemsList(itemData.data);
            } catch (err) {
                console.error("Failed to load dropdowns:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleItemSelect = (index: number, val: string) => {
        const selectedItem: any = itemsList.find((i: any) => i.item_code === val);
        const newItems = [...items];
        newItems[index].item_code = val;
        newItems[index].rate = selectedItem ? selectedItem.standard_rate || 0 : 0;
        newItems[index].amount = newItems[index].qty * newItems[index].rate;
        setItems(newItems);
    };

    const handleQtyChange = (index: number, val: number) => {
        const newItems = [...items];
        newItems[index].qty = val;
        newItems[index].amount = val * newItems[index].rate;
        setItems(newItems);
    };

    const addItemRow = () => setItems([...items, { item_code: '', qty: 1, rate: 0, amount: 0 }]);

    const removeItemRow = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const totalAmount = items.reduce((acc, curr) => acc + curr.amount, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Minimal Required fields for a Frappe Purchase Order
        // Often depends on the site's mandatory fields, but standard is supplier + schedule_date on items
        const today = new Date().toISOString().split('T')[0];

        const payload = {
            supplier: supplier,
            items: items.filter(i => i.item_code !== '').map(i => ({
                item_code: i.item_code,
                schedule_date: today,
                qty: i.qty,
                rate: i.rate
            }))
        };

        try {
            const res = await fetch('/api/proxy?endpoint=resource/Purchase Order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok) {
                alert("Purchase Order created successfully! ID: " + data.data.name);
                router.push('/purchase');
            } else {
                alert("Error creating Order: " + JSON.stringify(data));
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8">Loading form data...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">New Purchase Order</h1>
                    <p className="text-gray-500 mt-2">Create a new PO for a supplier.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
                    <select
                        required
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        <option value="" disabled>Select a supplier...</option>
                        {suppliers.map((s: any) => (
                            <option key={s.name} value={s.name}>{s.supplier_name || s.name}</option>
                        ))}
                    </select>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Items Request</h3>
                <div className="space-y-4 mb-6">
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Item Code</label>
                                <select
                                    required
                                    value={item.item_code}
                                    onChange={(e) => handleItemSelect(index, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white"
                                >
                                    <option value="" disabled>Select item...</option>
                                    {itemsList.map((i: any) => (
                                        <option key={i.name} value={i.item_code}>{i.item_code} - {i.item_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-24">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Qty</label>
                                <input
                                    type="number" min="1" required
                                    value={item.qty}
                                    onChange={(e) => handleQtyChange(index, parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                                />
                            </div>
                            <div className="w-32">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Rate (₹)</label>
                                <input type="number" step="0.01" value={item.rate} onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[index].rate = parseFloat(e.target.value) || 0;
                                    newItems[index].amount = newItems[index].rate * newItems[index].qty;
                                    setItems(newItems);
                                }} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                            </div>
                            <div className="w-32">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Amount (₹)</label>
                                <input type="text" readOnly value={item.amount} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 font-bold text-slate-800 cursor-not-allowed" />
                            </div>
                            <button type="button" onClick={() => removeItemRow(index)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg mb-0.5">
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <button type="button" onClick={addItemRow} className="text-sm text-indigo-600 font-medium hover:text-indigo-800 mb-8 inline-block">
                    + Add another row
                </button>

                <div className="border-t pt-4 flex justify-end items-center mb-8 gap-4">
                    <span className="text-gray-500 font-medium">Grand Total:</span>
                    <span className="text-2xl font-bold text-slate-800">₹{totalAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.push('/purchase')} className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" disabled={submitting || items.every(i => !i.item_code)} className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50">
                        {submitting ? 'Saving...' : 'Save Draft PO'}
                    </button>
                </div>
            </form>
        </div>
    );
}
