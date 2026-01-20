import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    CalendarDaysIcon,
    PlusIcon,
    TrashIcon,
    MapPinIcon,
    ClockIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function EventManager() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ title: '', description: '', location: '', startDate: '', type: 'Cultural', imageUrl: '' });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/events');
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/events', form);
            setForm({ title: '', description: '', location: '', startDate: '', type: 'Cultural', imageUrl: '' });
            fetchEvents();
        } catch (err) {
            alert('Hata oluştu');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        await axios.delete(`/api/events/${id}`);
        fetchEvents();
    };

    return (
        <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-4 flex items-center gap-4">
                        <CalendarDaysIcon className="h-10 w-10 text-blue-600" /> Etkinlik Yönetimi
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Kültürel ve sosyal etkinliklerin takvimi.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 rounded-[4rem] shadow-2xl border border-slate-50 sticky top-12">
                        <h2 className="text-2xl font-black mb-10 uppercase italic tracking-tighter">Yeni Etkinlik</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Etkinlik Adı</label>
                                <input required type="text" className="admin-input w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
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
                                        <option value="Official">Resmi / Protokol</option>
                                        <option value="Social">Sosyal Sorumluluk</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Konum / Yer</label>
                                <input required type="text" className="admin-input w-full" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Görsel URL</label>
                                <input type="text" className="admin-input w-full" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Açıklama</label>
                                <textarea rows="4" className="admin-input w-full" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
                            </div>
                            <button className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
                                Kaydet <PlusIcon className="h-6 w-6" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {events.map((ev, i) => (
                        <div key={ev.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 flex items-center gap-8 group hover:shadow-xl transition-all duration-500">
                            <div className="h-24 w-24 bg-slate-50 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-inner">
                                {ev.imageUrl ? (
                                    <img src={ev.imageUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-slate-200"><PhotoIcon className="h-10 w-10" /></div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[9px] font-black uppercase px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">{ev.type}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(ev.startDate).toLocaleDateString('tr-TR')}</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{ev.title}</h3>
                                <p className="text-sm text-slate-500 font-medium truncate max-w-md">{ev.description}</p>
                            </div>
                            <button onClick={() => handleDelete(ev.id)} className="h-14 w-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white">
                                <TrashIcon className="h-6 w-6" />
                            </button>
                        </div>
                    ))}
                    {events.length === 0 && (
                        <div className="p-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">Kayıt Bulunmuyor</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
