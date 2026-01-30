import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    ArrowLeftIcon,
    CloudArrowUpIcon,
    TrashIcon,
    SparklesIcon,
    PhotoIcon,
    CalendarDaysIcon,
    MapPinIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function ItemDetailManager() {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, [type, id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpointMap = {
                news: '/api/news',
                projects: '/api/projects',
                events: '/api/events',
                businesses: '/api/business'
            };
            const endpoint = `${endpointMap[type] || '/api/news'}/${id}`;
            const res = await axios.get(endpoint);
            setData(res.data);
        } catch (err) {
            console.error('Data fetch error', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const endpointMap = {
                news: '/api/news',
                projects: '/api/projects',
                events: '/api/events',
                businesses: '/api/business'
            };
            const endpoint = `${endpointMap[type] || '/api/news'}/${id}`;
            await axios.put(endpoint, data);
            alert('Başarıyla kaydedildi');
            navigate(-1);
        } catch (err) {
            alert('Kayıt hatası');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
        setSaving(true);
        try {
            const endpointMap = {
                news: '/api/news',
                projects: '/api/projects',
                events: '/api/events',
                businesses: '/api/business'
            };
            const endpoint = `${endpointMap[type] || '/api/news'}/${id}`;
            await axios.delete(endpoint);
            navigate(-1);
        } catch (err) {
            alert('Silme hatası');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
    );

    if (!data) return (
        <div className="p-20 text-center">
            <p className="text-slate-400 font-black uppercase italic tracking-widest">Veri bulunamadı.</p>
        </div>
    );

    const typeLabels = {
        news: 'Haber & Duyuru',
        projects: 'Yatırım & Proje',
        events: 'Etkinlik / Takvim',
        businesses: 'Belediye İştiraki / Tesis'
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-32">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="h-14 w-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm group"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-slate-600 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">
                            {typeLabels[type]} - Düzenle
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3 ml-1">
                            SİSTEM KAYIDI: #{id} • {new Date(data.createdDate || data.startDate || Date.now()).toLocaleDateString('tr-TR')}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-8 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-3 disabled:opacity-50"
                >
                    {saving ? 'Kayıt Ediliyor...' : <><CloudArrowUpIcon className="h-5 w-5" /> Değişiklikleri Yayınla</>}
                </button>
            </header>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Başlık / İsim</label>
                            <input
                                required
                                className="admin-input w-full text-xl font-bold italic"
                                value={data.title || data.name || ''}
                                onChange={e => {
                                    if (data.title !== undefined) setData({ ...data, title: e.target.value });
                                    else setData({ ...data, name: e.target.value });
                                }}
                            />
                        </div>

                        {type === 'events' && (
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Etkinlik Tarihi</label>
                                    <input
                                        type="date"
                                        className="admin-input w-full"
                                        value={data.startDate?.split('T')[0] || ''}
                                        onChange={e => setData({ ...data, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Konum</label>
                                    <input
                                        className="admin-input w-full"
                                        value={data.location || ''}
                                        onChange={e => setData({ ...data, location: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Kısa Özet / Alt Başlık</label>
                            <textarea
                                rows={3}
                                className="admin-input w-full resize-none font-medium text-slate-500"
                                value={data.summary || data.description || ''}
                                onChange={e => {
                                    if (data.summary !== undefined) setData({ ...data, summary: e.target.value });
                                    else setData({ ...data, description: e.target.value });
                                }}
                            />
                        </div>

                        {(type === 'news' || type === 'projects') && (
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Detaylı İçerik (HTML)</label>
                                <textarea
                                    rows={15}
                                    className="admin-input w-full resize-none font-mono text-sm"
                                    value={data.content || ''}
                                    onChange={e => setData({ ...data, content: e.target.value })}
                                />
                                <p className="text-[10px] text-slate-400 mt-3 italic font-bold">Zengin metin için HTML etiketleri kullanabilirsiniz.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight border-b border-slate-50 pb-5">Yayın Detayları</h3>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">Kategori</label>
                            <input
                                className="admin-input w-full"
                                value={data.category || data.type || ''}
                                onChange={e => {
                                    if (data.category !== undefined) setData({ ...data, category: e.target.value });
                                    else setData({ ...data, type: e.target.value });
                                }}
                            />
                        </div>

                        <label className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                            <input
                                type="checkbox"
                                checked={data.isHeadline || data.isFeatured || false}
                                onChange={e => {
                                    if (data.isHeadline !== undefined) setData({ ...data, isHeadline: e.target.checked });
                                    else setData({ ...data, isFeatured: e.target.checked });
                                }}
                                className="h-6 w-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Öne Çıkar</span>
                        </label>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight border-b border-slate-50 pb-5">Medya Galeri</h3>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">Kapak Görseli URL</label>
                            <input
                                className="admin-input w-full text-[10px]"
                                value={data.imageUrl || data.logoUrl || ''}
                                onChange={e => {
                                    if (data.imageUrl !== undefined) setData({ ...data, imageUrl: e.target.value });
                                    else setData({ ...data, logoUrl: e.target.value });
                                }}
                                placeholder="https://..."
                            />
                            {(data.imageUrl || data.logoUrl) && (
                                <div className="mt-6 rounded-3xl overflow-hidden border border-slate-50 shadow-inner aspect-[16/10]">
                                    <img src={data.imageUrl || data.logoUrl} className="w-full h-full object-cover" alt="" />
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full py-5 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 border border-red-100/50"
                    >
                        <TrashIcon className="h-5 w-5" /> Kaydı Sil
                    </button>
                </div>
            </form>
        </div>
    );
}
