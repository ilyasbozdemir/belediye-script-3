import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    ArrowLeftIcon,
    CloudArrowUpIcon,
    TrashIcon,
    SparklesIcon,
    PhotoIcon
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
            const endpoint = type === 'news' ? `/api/news/${id}` : type === 'projects' ? `/api/projects/${id}` : `/api/news/${id}`;
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
            const endpoint = type === 'news' ? `/api/news/${id}` : `/api/projects/${id}`;
            await axios.put(endpoint, data);
            alert('Başarıyla kaydedildi');
            navigate(-1);
        } catch (err) {
            alert('Kayıt hatası');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="h-12 w-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 uppercase italic leading-none">
                            {type === 'news' ? 'Haber Düzenle' : 'Proje Düzenle'}
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">ID: {id} • Son Güncelleme: {new Date(data.createdDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-3"
                >
                    {saving ? 'Kaydediliyor...' : <><CloudArrowUpIcon className="h-5 w-5" /> Değişiklikleri Kaydet</>}
                </button>
            </header>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Başlık</label>
                            <input
                                required
                                className="admin-input w-full text-xl font-bold italic"
                                value={data.title}
                                onChange={e => setData({ ...data, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Kısa Özet</label>
                            <textarea
                                rows={3}
                                className="admin-input w-full resize-none font-medium text-slate-600"
                                value={data.summary || ''}
                                onChange={e => setData({ ...data, summary: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">İçerik Editörü</label>
                            <textarea
                                rows={15}
                                className="admin-input w-full resize-none font-mono text-sm"
                                value={data.content || ''}
                                onChange={e => setData({ ...data, content: e.target.value })}
                            />
                            <p className="text-[10px] text-slate-400 mt-2 italic font-medium">Not: HTML etiketleri (&lt;p&gt;, &lt;b&gt;, &lt;img&gt;) desteklenmektedir.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight border-b border-slate-50 pb-4">Yayın Ayarları</h3>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Kategori</label>
                            <select
                                className="admin-input w-full"
                                value={data.category}
                                onChange={e => setData({ ...data, category: e.target.value })}
                            >
                                <option value="Haber">Haber</option>
                                <option value="Etkinlik">Etkinlik</option>
                                <option value="Duyuru">Duyuru</option>
                                <option value="Proje">Proje</option>
                            </select>
                        </div>

                        <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                            <input
                                type="checkbox"
                                checked={data.isHeadline || false}
                                onChange={e => setData({ ...data, isHeadline: e.target.checked })}
                                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs font-bold text-slate-700">Manşet Olarak Göster</span>
                        </label>

                        {data.isModalFeatured !== undefined && (
                            <label className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl cursor-pointer hover:bg-orange-100 transition-all border border-transparent hover:border-orange-200">
                                <input
                                    type="checkbox"
                                    checked={data.isModalFeatured || false}
                                    onChange={e => setData({ ...data, isModalFeatured: e.target.checked })}
                                    className="h-5 w-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="text-xs font-bold text-orange-900">Giriş Pop-up'ı Yap</span>
                            </label>
                        )}
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight border-b border-slate-50 pb-4">Medya</h3>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Görsel URL</label>
                            <input
                                className="admin-input w-full text-[10px]"
                                value={data.imageUrl || ''}
                                onChange={e => setData({ ...data, imageUrl: e.target.value })}
                                placeholder="https://..."
                            />
                            {data.imageUrl && (
                                <div className="mt-4 rounded-2xl overflow-hidden border border-slate-100 aspect-video">
                                    <img src={data.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => { if (confirm('Silmek istediğinize emin misiniz?')) navigate(-1); }}
                        className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        <TrashIcon className="h-4 w-4" /> Haberi Sil
                    </button>
                </div>
            </form>
        </div>
    );
}
