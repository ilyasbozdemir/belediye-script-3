import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BriefcaseIcon,
    PlusIcon,
    TrashIcon,
    PhotoIcon,
    StarIcon
} from '@heroicons/react/24/outline';

const categories = ['Restoran & Kafe', 'Market & Gıda', 'Hizmet', 'Teknoloji', 'Giyim & Tekstil', 'Diğer'];

export default function BusinessManager() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        category: 'Hizmet',
        description: '',
        address: '',
        phone: '',
        website: '',
        logoUrl: '',
        workingHours: '',
        isFeatured: false,
        isMunicipal: false,
        municipalCategory: 'Belediye İşletmesi',
        tags: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/business');
            setBusinesses(res.data);
        } catch (err) {
            console.error('Fetch error', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/business', form);
            setForm({
                name: '',
                category: 'Hizmet',
                description: '',
                address: '',
                phone: '',
                website: '',
                logoUrl: '',
                workingHours: '',
                isFeatured: false,
                isMunicipal: false,
                municipalCategory: 'Belediye İşletmesi',
                tags: ''
            });
            fetchData();
        } catch (err) {
            alert('Hata oluştu');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        await axios.delete(`/api/business/${id}`);
        fetchData();
    };

    return (
        <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-4 flex items-center gap-4">
                        <BriefcaseIcon className="h-10 w-10 text-blue-600" /> İşletme Yönetimi
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Kent rehberi ve Belediye İşletmeleri yönetimi.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 sticky top-12">
                        <h2 className="text-xl font-black mb-8 uppercase italic tracking-tight">Yeni İşletme Ekle</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input required type="text" placeholder="İşletme Adı" className="admin-input w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

                            <select className="admin-input w-full" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>

                            <textarea required placeholder="Kısa Tanıtım" className="admin-input w-full min-h-[100px]" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

                            <input required type="text" placeholder="Adres" className="admin-input w-full" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <input required type="text" placeholder="Telefon" className="admin-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                <input type="text" placeholder="Çalışma Saatleri" className="admin-input" value={form.workingHours} onChange={e => setForm({ ...form, workingHours: e.target.value })} />
                            </div>

                            <input type="url" placeholder="Görsel URL (Logo/Kapak)" className="admin-input w-full" value={form.logoUrl} onChange={e => setForm({ ...form, logoUrl: e.target.value })} />

                            <input type="text" placeholder="Etiketler (Virgülle ayırın)" className="admin-input w-full" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />

                            <div className="space-y-4 pt-4 border-t border-slate-50">
                                <label className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer">
                                    <input type="checkbox" className="h-6 w-6 rounded-lg text-blue-600" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Öne Çıkarılan</span>
                                </label>

                                <label className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl cursor-pointer border border-blue-100">
                                    <input type="checkbox" className="h-6 w-6 rounded-lg text-blue-600" checked={form.isMunicipal} onChange={e => setForm({ ...form, isMunicipal: e.target.checked })} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-800">Belediye İşletmesi/Mülkü</span>
                                </label>

                                {form.isMunicipal && (
                                    <select className="admin-input w-full" value={form.municipalCategory} onChange={e => setForm({ ...form, municipalCategory: e.target.value })}>
                                        <option value="Belediye İşletmesi">Doğrudan Belediye İşletmesi</option>
                                        <option value="İhale / Kiralık">İhale ile Kiraya Verilen</option>
                                    </select>
                                )}
                            </div>

                            <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                                <PlusIcon className="h-5 w-5" /> İşletmeyi Kaydet
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {loading ? (
                        <p className="text-center py-20 font-black text-slate-400">Yükleniyor...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {businesses.map((b) => (
                                <div key={b.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group">
                                    <div className="h-32 w-full bg-slate-50 rounded-2xl mb-6 overflow-hidden">
                                        <img src={b.logoUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase italic mb-2">{b.name}</h3>
                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">{b.category}</p>

                                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-50">
                                        {b.isFeatured && <StarIcon className="h-5 w-5 text-amber-400 fill-amber-400" />}
                                        <button onClick={() => handleDelete(b.id)} className="text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
