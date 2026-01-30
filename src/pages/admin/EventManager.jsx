import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    CalendarDaysIcon,
    PlusIcon,
    TrashIcon,
    MapPinIcon,
    ClockIcon,
    PhotoIcon,
    ArrowRightIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function EventManager() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        startDate: '',
        type: 'Cultural',
        imageUrl: '',
        category: 'Etkinlik',
        summary: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/events');
            setEvents(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post('/api/events', {
                ...form,
                createdDate: new Date().toISOString()
            });
            setForm({
                title: '',
                description: '',
                location: '',
                startDate: '',
                type: 'Cultural',
                imageUrl: '',
                category: 'Etkinlik',
                summary: ''
            });
            fetchEvents();
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
            await axios.delete(`/api/events/${id}`);
            fetchEvents();
        } catch (err) {
            alert('Silme hatası');
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none flex items-center gap-4">
                        <CalendarDaysIcon className="h-10 w-10 text-blue-600" /> Etkinlik Takvimi
                    </h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 ml-1">Kültürel ve Sosyal Etkinlik Yönetimi</p>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                {/* Quick Add Form */}
                <div className="xl:col-span-1">
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm sticky top-8">
                        <h2 className="text-sm font-black text-slate-900 uppercase italic tracking-tight border-b border-slate-50 pb-4 mb-6 flex items-center gap-2">
                            <SparklesIcon className="h-4 w-4 text-amber-500" /> Hızlı Etkinlik Ekle
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Etkinlik Adı</label>
                                <input required className="admin-input w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Örn: Konser" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Tarih</label>
                                    <input required type="date" className="admin-input w-full" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Tür</label>
                                    <select className="admin-input w-full" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                        <option value="Cultural">Kültürel</option>
                                        <option value="Sports">Spor</option>
                                        <option value="Official">Protokol</option>
                                        <option value="Social">Sosyal</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Konum</label>
                                <input required className="admin-input w-full" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Yer belirtin" />
                            </div>
                            <button
                                disabled={saving}
                                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {saving ? 'Kaydediliyor...' : <><PlusIcon className="h-5 w-5" /> Etkinliği Yayınla</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Events list */}
                <div className="xl:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {events.map((ev, i) => (
                                <motion.div
                                    key={ev.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={`/admin/manage/events/${ev.id}`}
                                        className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col gap-6 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden h-full"
                                    >
                                        <div className="h-48 w-full bg-slate-50 rounded-[1.5rem] overflow-hidden relative">
                                            {ev.imageUrl ? (
                                                <img src={ev.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-slate-200">
                                                    <PhotoIcon className="h-12 w-12" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[9px] font-black uppercase text-blue-600">{ev.type}</span>
                                            </div>
                                        </div>

                                        <div className="flex-grow space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <CalendarDaysIcon className="h-3 w-3" /> {new Date(ev.startDate).toLocaleDateString('tr-TR')}
                                                <span className="mx-2 opacity-20">|</span>
                                                <MapPinIcon className="h-3 w-3" /> {ev.location}
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight group-hover:text-blue-600 transition-colors line-clamp-1">{ev.title}</h3>
                                            <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">{ev.description}</p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest">
                                                Düzenle <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                            <button
                                                onClick={(e) => handleDelete(ev.id, e)}
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

                    {events.length === 0 && !loading && (
                        <div className="py-24 text-center bg-white rounded-[4rem] border border-slate-100 shadow-sm flex flex-col items-center">
                            <CalendarDaysIcon className="h-16 w-16 text-slate-100 mb-6" />
                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">Etkinlik bulunmuyor</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
