import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RssIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon,
    XCircleIcon,
    CloudArrowDownIcon,
    PlusIcon
} from '@heroicons/react/24/outline';

const RSS_SOURCES = [
    { name: 'AA - Yerel Haberler', url: 'https://www.aa.com.tr/tr/rss/default?cat=guncel' },
    { name: 'İHA - Yerel', url: 'https://www.iha.com.tr/rss' },
    { name: 'DHA - Karaman', url: 'https://www.dha.com.tr/rss/' }
];

export default function AdminRssImport() {
    const [loading, setLoading] = useState(false);
    const [feedItems, setFeedItems] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');
    const [status, setStatus] = useState(null);

    const fetchRss = async () => {
        if (!selectedSource) return;
        setLoading(true);
        try {
            // In a real scenario, this would go through a backend proxy to avoid CORS
            // For demo, we simulate fetching and parsing
            setTimeout(() => {
                const mockItems = [
                    {
                        title: 'Karaman Ermenek Yolunda Kar Temizleme Çalışması',
                        content: 'Ermenek ilçesinde yoğun kar yağışı sonrası ekipler seferber oldu...',
                        date: new Date().toISOString()
                    },
                    {
                        title: 'Güneyyurt Kültür Festivali Hazırlıkları Süreçte',
                        content: 'Bu yıl 5.si düzenlenecek olan festival için komisyon toplandı...',
                        date: new Date().toISOString()
                    }
                ];
                setFeedItems(mockItems);
                setLoading(false);
                showStatus('RSS Kaynağı başarıyla güncellendi', 'success');
            }, 1500);
        } catch (err) {
            showStatus('RSS çekilirken bir hata oluştu', 'error');
            setLoading(false);
        }
    };

    const showStatus = (msg, type) => {
        setStatus({ msg, type });
        setTimeout(() => setStatus(null), 3000);
    };

    const importToNews = async (item) => {
        try {
            // API call to save as news
            // await axios.post('/api/news', { ...item, createdDate: new Date() });
            showStatus('Haber taslak olarak kaydedildi', 'success');
            setFeedItems(prev => prev.filter(f => f.title !== item.title));
        } catch (err) {
            showStatus('Kaydetme hatası', 'error');
        }
    };

    return (
        <div className="space-y-8 pb-32">
            <div className="flex items-center justify-between gap-6">
                <div>
                    <nav className="flex gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        <span>Panel</span>
                        <span>/</span>
                        <span className="text-blue-600 font-black">RSS İçerik Merkezi</span>
                    </nav>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Harici İçerik Yönetimi</h1>
                </div>
            </div>

            <div className="admin-card p-10">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">RSS Kaynağı Seçin</label>
                        <select
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-bold text-slate-700 outline-none transition-all"
                        >
                            <option value="">Lütfen seçim yapın...</option>
                            {RSS_SOURCES.map(s => <option key={s.url} value={s.url}>{s.name}</option>)}
                        </select>
                    </div>
                    <button
                        onClick={fetchRss}
                        disabled={loading || !selectedSource}
                        className="btn-premium py-4 px-10 flex items-center gap-3 disabled:opacity-50"
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <CloudArrowDownIcon className="h-5 w-5" />}
                        İçerikleri Çek
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                    {feedItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="admin-card p-10 flex flex-col group border hover:border-blue-500 transition-all duration-500"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <RssIcon className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{new Date(item.date).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight">{item.title}</h3>
                            <p className="text-slate-500 font-medium text-sm line-clamp-3 mb-8">{item.content}</p>

                            <div className="mt-auto flex gap-4">
                                <button
                                    onClick={() => importToNews(item)}
                                    className="flex-1 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" /> Habere Dönüştür
                                </button>
                                <button className="px-6 py-4 bg-slate-50 text-slate-400 rounded-xl hover:text-red-600 transition-colors">
                                    <XCircleIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {feedItems.length === 0 && !loading && (
                <div className="py-24 text-center">
                    <ArrowDownTrayIcon className="h-20 w-20 text-slate-100 mx-auto mb-6" />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Henüz taranmış bir içerik yok.</p>
                </div>
            )}

            {/* Floating Status Notification */}
            <AnimatePresence>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 ${status.type === 'error' ? 'bg-red-600' : 'bg-slate-900'} text-white border border-white/10`}
                    >
                        {status.type === 'error' ? <XCircleIcon className="h-6 w-6" /> : <CheckCircleIcon className="h-6 w-6 text-blue-400" />}
                        <span className="font-bold text-sm tracking-tight">{status.msg}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
