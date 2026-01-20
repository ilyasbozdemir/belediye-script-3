import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    CalendarDaysIcon,
    TagIcon,
    ArrowLeftIcon,
    ShareIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function AnnouncementDetail() {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/news/${id}`)
            .then(res => {
                setAnnouncement(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching announcement:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4 min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Yükleniyor...</p>
        </div>
    );

    if (!announcement) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">Duyuru Bulunamadı</h2>
            <p className="text-slate-500 mb-8 font-medium">Aradığınız duyuru yayından kalkmış veya taşınmış olabilir.</p>
            <Link to="/duyurular" className="btn-premium px-12 py-5">Duyurulara Dön</Link>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo
                title={`${announcement.title} | Duyurular`}
                description={announcement.content.replace(/<[^>]*>/g, '').substring(0, 160)}
                type="article"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": announcement.title,
                    "datePublished": announcement.date,
                    "author": {
                        "@type": "Organization",
                        "name": "Güneyyurt Belediyesi"
                    }
                }}
            />

            <div className="bg-slate-900 pt-32 pb-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <div className="mx-auto max-w-5xl px-6 relative z-10">
                    <Link to="/duyurular" className="inline-flex items-center gap-2 text-blue-400 font-black uppercase text-[10px] tracking-widest mb-8 hover:text-white transition-colors">
                        <ArrowLeftIcon className="h-4 w-4" /> Duyurular Listesine Dön
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${announcement.priority === 'Yüksek' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                                }`}>
                                {announcement.priority || 'Normal'} Öncelik
                            </span>
                            <span className="px-6 py-2 bg-white/10 text-white/60 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                                {announcement.category || 'Duyuru'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic leading-tight">
                            {announcement.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 -mt-40 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[4rem] p-12 lg:p-24 shadow-2xl shadow-slate-200/50 border border-slate-50"
                >
                    <div className="flex flex-wrap items-center gap-12 pb-12 border-b border-slate-50 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <CalendarDaysIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Yayın Tarihi</p>
                                <p className="font-bold text-slate-900">{new Date(announcement.createdDate).toLocaleDateString('tr-TR')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <TagIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Sorumlu Birim</p>
                                <p className="font-bold text-slate-900">{announcement.author || 'Belediye Basın Birimi'}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-2xl prose-slate max-w-none text-slate-600 font-medium leading-loose"
                        dangerouslySetInnerHTML={{ __html: announcement.content }}
                    />

                    <div className="mt-20 pt-16 border-t border-slate-50 flex flex-wrap gap-4">
                        <button className="flex-1 min-w-[200px] h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                            <ShareIcon className="h-5 w-5" /> Paylaş
                        </button>
                        <button className="flex-1 min-w-[200px] h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all">
                            Yazdır
                        </button>
                    </div>
                </motion.div>

                {/* Alert Box */}
                <div className="mt-8 p-12 bg-amber-50 rounded-[3rem] border border-amber-100 flex gap-8 items-center">
                    <div className="h-16 w-16 bg-amber-200 rounded-3xl flex items-center justify-center text-amber-700 shrink-0">
                        <ExclamationTriangleIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-amber-900 uppercase tracking-tight italic">Önemli Not</h4>
                        <p className="text-amber-800 font-medium leading-relaxed mt-2 italic">Bu duyuruda belirtilen tarihler ve saatler genel planlamayı ifade eder. Acil durumlarda değişiklik yapılabilir.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
