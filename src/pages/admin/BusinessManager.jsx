import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BriefcaseIcon,
    PlusIcon,
    TrashIcon,
    PhotoIcon,
    StarIcon,
    BuildingOfficeIcon,
    ArrowRightIcon,
    MapPinIcon,
    PhoneIcon,
    LinkIcon
} from '@heroicons/react/24/outline';

const categories = ['Sosyal Tesis', 'Gıda & Market', 'Teknoloji', 'Ulaşım', 'Turizm', 'Hizmet', 'Diğer'];

export default function BusinessManager() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: '',
        category: 'Hizmet',
        description: '',
        address: '',
        phone: '',
        website: '',
        logoUrl: '',
        workingHours: '',
        isFeatured: true, // Default to featured for municipal ones
        isMunicipal: true,
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
            setBusinesses(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Fetch error', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post('/api/business', {
                ...form,
                createdDate: new Date().toISOString()
            });
            setForm({
                name: '',
                category: 'Hizmet',
                description: '',
                address: '',
                phone: '',
                website: '',
                logoUrl: '',
                workingHours: '',
                isFeatured: true,
                isMunicipal: true,
                municipalCategory: 'Belediye İşletmesi',
                tags: ''
            });
            fetchData();
        } catch (err) {
            alert('Hata oluştu');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm('Emin misiniz?')) return;
        try {
            await axios.delete(`/api/business/${id}`);
            fetchData();
        } catch (err) {
            alert('Silme hatası');
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none flex items-center gap-4">
                        <BuildingOfficeIcon className="h-10 w-10 text-blue-600" /> Belediye İştirakleri
                    </h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 ml-1">İşletme ve İştirak Yönetim Paneli</p>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                {/* Form Section */}
                <div className="xl:col-span-1">
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm sticky top-8">
                        <h2 className="text-sm font-black text-slate-900 uppercase italic tracking-tight border-b border-slate-50 pb-4 mb-6">Yeni İştirak Ekle</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">İştirak Adı</label>
                                <input required className="admin-input w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="İşletme adı..." />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Sektör / Kategori</label>
                                <select className="admin-input w-full" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Kısa Açıklama</label>
                                <textarea required className="admin-input w-full min-h-[100px]" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="İşletme hakkında kısa bilgi..." />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Kapak Görseli URL</label>
                                <input className="admin-input w-full" value={form.logoUrl} onChange={e => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://..." />
                            </div>

                            <button
                                disabled={saving}
                                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {saving ? 'Kaydediliyor...' : <><PlusIcon className="h-5 w-5" /> İştiraki Ekle</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {businesses.map((b, i) => (
                                <motion.div
                                    key={b.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={`/admin/manage/businesses/${b.id}`}
                                        className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col gap-6 group hover:shadow-xl transition-all duration-500 relative overflow-hidden h-full"
                                    >
                                        <div className="h-48 w-full bg-slate-50 rounded-[1.5rem] overflow-hidden relative">
                                            {b.logoUrl ? (
                                                <img src={b.logoUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-slate-200">
                                                    <BriefcaseIcon className="h-12 w-12" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[9px] font-black uppercase text-blue-600">{b.category}</span>
                                            </div>
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight group-hover:text-blue-600 transition-colors mb-2">{b.name}</h3>
                                            <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed mb-4">{b.description}</p>

                                            <div className="flex flex-wrap gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-auto border-t border-slate-50 pt-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPinIcon className="h-3 w-3" /> {b.address || 'Adres Belirtilmemiş'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-600 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                                                Detayları Düzenle <ArrowRightIcon className="h-3 w-3" />
                                            </span>
                                            <button
                                                onClick={(e) => handleDelete(b.id, e)}
                                                className="h-10 w-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {businesses.length === 0 && !loading && (
                        <div className="py-24 text-center bg-white rounded-[4rem] border border-slate-100 shadow-sm flex flex-col items-center">
                            <BuildingOfficeIcon className="h-16 w-16 text-slate-100 mb-6" />
                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">İştirak bulunmuyor</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
