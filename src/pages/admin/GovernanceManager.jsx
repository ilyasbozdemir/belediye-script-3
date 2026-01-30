import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UsersIcon,
    PlusIcon,
    TrashIcon,
    CheckBadgeIcon,
    ClockIcon,
    CameraIcon,
    PencilSquareIcon,
    UserCircleIcon,
    ArrowPathIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function GovernanceManager() {
    const [presidents, setPresidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: '',
        term: '',
        bio: '',
        imageUrl: '',
        isCurrent: false
    });

    useEffect(() => {
        fetchPresidents();
    }, []);

    const fetchPresidents = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/president');
            setPresidents(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Presidents fetch error', err);
            setPresidents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post('/api/president', form);
            setForm({ name: '', term: '', bio: '', imageUrl: '', isCurrent: false });
            fetchPresidents();
        } catch (err) {
            alert('Kayıt hatası');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        try {
            await axios.delete(`/api/president/${id}`);
            fetchPresidents();
        } catch (err) {
            alert('Silme hatası');
        }
    };

    const toggleCurrent = async (pres) => {
        try {
            await axios.put(`/api/president/${pres.id}`, {
                ...pres,
                isCurrent: !pres.isCurrent
            });
            fetchPresidents();
        } catch (err) {
            alert('Güncelleme hatası');
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none flex items-center gap-4">
                        <UsersIcon className="h-10 w-10 text-blue-600" /> Belediye Başkanları
                    </h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 ml-1">Görevdeki Başkan ve Arşiv Yönetimi</p>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                {/* Form Section */}
                <div className="xl:col-span-1">
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm sticky top-8">
                        <h2 className="text-sm font-black text-slate-900 uppercase italic tracking-tight border-b border-slate-50 pb-4 mb-6 flex items-center gap-2">
                            <SparklesIcon className="h-4 w-4 text-amber-500" /> Başkan Ekle
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Ad Soyad</label>
                                <input required className="admin-input w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Başkan adı..." />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Görev Süresi</label>
                                <input required className="admin-input w-full" value={form.term} onChange={e => setForm({ ...form, term: e.target.value })} placeholder="Örn: 2019 - Devam Ediyor" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Fotoğraf URL</label>
                                <input className="admin-input w-full" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Kısa Özgeçmiş</label>
                                <textarea rows={4} className="admin-input w-full" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Başkanın hayatı ve başarıları..." />
                            </div>

                            <label className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl cursor-pointer border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                <input type="checkbox" className="h-6 w-6 rounded-lg text-blue-600 focus:ring-blue-500" checked={form.isCurrent} onChange={e => setForm({ ...form, isCurrent: e.target.checked })} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-900">Şu anki Başkan</span>
                            </label>

                            <button
                                disabled={saving}
                                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {saving ? 'Kaydediliyor...' : <><PlusIcon className="h-5 w-5" /> Kaydı Yayınla</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-3 space-y-12">
                    {/* Active President */}
                    <section>
                        <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight mb-8 ml-4 flex items-center gap-3">
                            <CheckBadgeIcon className="h-5 w-5 text-emerald-500" /> Görevdeki Başkan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {presidents.filter(p => p.isCurrent).map(p => (
                                <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-[3.5rem] border-2 border-emerald-100 shadow-xl shadow-emerald-500/5 flex gap-8 group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -mr-16 -mt-16 opacity-50" />

                                    <div className="h-32 w-32 bg-slate-100 rounded-[2.5rem] overflow-hidden border-2 border-emerald-100 shadow-inner flex-shrink-0">
                                        {p.imageUrl ? (
                                            <img src={p.imageUrl} className="w-full h-full object-cover" />
                                        ) : (
                                            <UserCircleIcon className="w-full h-full text-slate-200" />
                                        )}
                                    </div>
                                    <div className="flex-grow space-y-2 relative">
                                        <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg">Aktif Görevde</span>
                                        <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{p.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.term}</p>
                                        <p className="text-sm text-slate-500 font-medium line-clamp-2 pt-2">{p.bio}</p>

                                        <div className="flex items-center gap-4 pt-4">
                                            <button onClick={() => toggleCurrent(p)} className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2">
                                                <ArrowPathIcon className="h-3 w-3" /> Arşive Taşı
                                            </button>
                                            <button onClick={() => handleDelete(p.id)} className="text-[10px] font-black uppercase text-red-500 hover:text-red-600 transition-colors">
                                                Kaydı Sil
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Former Presidents */}
                    <section>
                        <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight mb-8 ml-4 flex items-center gap-3">
                            <ClockIcon className="h-5 w-5 text-slate-400" /> Başkanlık Arşivi
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {presidents.filter(p => !p.isCurrent).map((p, i) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="h-20 w-20 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                                                {p.imageUrl ? (
                                                    <img src={p.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                ) : (
                                                    <UserCircleIcon className="w-full h-full text-slate-200" />
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="text-lg font-black text-slate-900 uppercase italic tracking-tight group-hover:text-blue-600 transition-colors">{p.name}</h4>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.term}</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <button onClick={() => toggleCurrent(p)} className="text-[9px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                                                <CheckBadgeIcon className="h-4 w-4" /> Görevli Yap
                                            </button>
                                            <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {presidents.filter(p => !p.isCurrent).length === 0 && (
                            <div className="py-20 text-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Arşiv henüz boş</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
