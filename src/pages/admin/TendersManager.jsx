import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DocumentDuplicateIcon,
    PlusIcon,
    TrashIcon,
    CalendarIcon,
    TagIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function TendersManager() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        content: '',
        category: 'Yapım İhalesi',
        tenderNumber: '',
        status: 'Aktif',
        publishDate: new Date().toISOString().split('T')[0],
        deadline: '',
        location: 'Belediye Hizmet Binası'
    });

    useEffect(() => {
        fetchTenders();
    }, []);

    const fetchTenders = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/tenders');
            setTenders(res.data);
        } catch (err) {
            console.error('Fetch error', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/tenders', form);
            setForm({
                title: '',
                content: '',
                category: 'Yapım İhalesi',
                tenderNumber: '',
                status: 'Aktif',
                publishDate: new Date().toISOString().split('T')[0],
                deadline: '',
                location: 'Belediye Hizmet Binası'
            });
            fetchTenders();
        } catch (err) {
            alert('Hata oluştu');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        await axios.delete(`/api/tenders/${id}`);
        fetchTenders();
    };

    return (
        <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-4 flex items-center gap-4">
                        <DocumentDuplicateIcon className="h-10 w-10 text-blue-600" /> İhale Yönetimi
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Güncel ihale ve duyuruların yönetimi.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 sticky top-12">
                        <h2 className="text-xl font-black mb-8 uppercase italic tracking-tight">Yeni İhale Ekle</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input required type="text" placeholder="İhale Başlığı" className="admin-input w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            <textarea required placeholder="İhale Detayları" className="admin-input w-full min-h-[120px]" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <input required type="text" placeholder="İhale No" className="admin-input" value={form.tenderNumber} onChange={e => setForm({ ...form, tenderNumber: e.target.value })} />
                                <select className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    <option value="Yapım İhalesi">Yapım İhalesi</option>
                                    <option value="Hizmet Alımı">Hizmet Alımı</option>
                                    <option value="Mal Alımı">Mal Alımı</option>
                                    <option value="Kiralama">Kiralama</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Yayın Tarihi</label>
                                    <input required type="date" className="admin-input w-full" value={form.publishDate} onChange={e => setForm({ ...form, publishDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Son Başvuru</label>
                                    <input required type="date" className="admin-input w-full" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
                                </div>
                            </div>

                            <input required type="text" placeholder="İhale Yeri" className="admin-input w-full" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />

                            <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                                <PlusIcon className="h-5 w-5" /> İhaleyi Yayınla
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {loading ? (
                        <p className="text-center py-20 font-black text-slate-400 uppercase tracking-widest animate-pulse">Yükleniyor...</p>
                    ) : (
                        <div className="space-y-6">
                            {tenders.map((tender, idx) => (
                                <motion.div
                                    key={tender.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 group"
                                >
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">{tender.category}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No: {tender.tenderNumber}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 uppercase italic mb-4">{tender.title}</h3>
                                        <div className="flex flex-wrap gap-6 text-slate-500">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                                <CalendarIcon className="h-4 w-4" /> {new Date(tender.deadline).toLocaleDateString('tr-TR')}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                                <MapPinIcon className="h-4 w-4" /> {tender.location}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(tender.id)} className="h-14 w-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-inner">
                                        <TrashIcon className="h-6 w-6" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
