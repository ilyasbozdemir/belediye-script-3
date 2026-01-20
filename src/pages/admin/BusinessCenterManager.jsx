import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BuildingOffice2Icon,
    PlusIcon,
    TrashIcon,
    ShoppingCartIcon,
    KeyIcon,
    Square3Stack3DIcon
} from '@heroicons/react/24/outline';

export default function BusinessCenterManager() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        size: '',
        status: 'Satışta',
        price: '',
        features: ''
    });

    useEffect(() => {
        // Mocking for now, as it's a new feature
        setUnits([
            { id: 1, title: 'Zemin Kat - Market Alanı', size: '120 m²', status: 'Satışta', price: 'İhale ile Belirlenecek', features: 'Otomatik Giriş, Depo Alanı, Merkezi Konum' },
            { id: 2, title: '1. Kat - Ofis / Büro', size: '45 m²', status: 'Kiralamaya Uygun', price: '6.500 ₺ / Ay', features: 'Fiber İnternet, Mutfak Nişi, Asansör' },
        ]);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUnit = { ...form, id: Date.now() };
        setUnits([...units, newUnit]);
        setForm({ title: '', size: '', status: 'Satışta', price: '', features: '' });
    };

    const handleDelete = (id) => {
        if (!confirm('Emin misiniz?')) return;
        setUnits(units.filter(u => u.id !== id));
    };

    return (
        <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-4 flex items-center gap-4">
                        <BuildingOffice2Icon className="h-10 w-10 text-blue-600" /> İş Hanı Yönetimi
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">İş hanı dükkan ve ofis alanlarının yönetimi.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 sticky top-12">
                        <h2 className="text-xl font-black mb-8 uppercase italic tracking-tight">Yeni Birim/Dükkan Ekle</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input required type="text" placeholder="Birim Başlığı" className="admin-input w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <input required type="text" placeholder="Metrekare (m²)" className="admin-input" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} />
                                <select className="admin-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                    <option value="Satışta">Satışta</option>
                                    <option value="Kiralamaya Uygun">Kiralık</option>
                                    <option value="Dolu">Dolu</option>
                                </select>
                            </div>

                            <input required type="text" placeholder="Fiyat / Şart Bilgisi" className="admin-input w-full" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />

                            <textarea
                                placeholder="Özellikler (Virgülle ayırın)"
                                className="admin-input w-full min-h-[100px]"
                                value={form.features}
                                onChange={e => setForm({ ...form, features: e.target.value })}
                            />

                            <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                                <PlusIcon className="h-5 w-5" /> Birimi Ekle
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {units.map((unit) => (
                            <div key={unit.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-4 rounded-2xl ${unit.status === 'Satışta' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                        {unit.status === 'Satışta' ? <ShoppingCartIcon className="h-6 w-6" /> : <KeyIcon className="h-6 w-6" />}
                                    </div>
                                    <span className="text-xl font-black text-slate-300 tracking-tighter">{unit.size}</span>
                                </div>

                                <h3 className="text-lg font-black text-slate-900 uppercase italic mb-4">{unit.title}</h3>
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6">{unit.price}</p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {unit.features.split(',').map((f, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-bold rounded-lg uppercase tracking-tight">{f.trim()}</span>
                                    ))}
                                </div>

                                <button onClick={() => handleDelete(unit.id)} className="w-full py-4 bg-red-50 text-red-600 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all">
                                    Sil
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
