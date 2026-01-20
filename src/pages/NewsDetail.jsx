import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    CalendarDaysIcon,
    UserIcon,
    TagIcon,
    ArrowLeftIcon,
    ShareIcon,
    ChatBubbleLeftIcon,
    EyeIcon
} from '@heroicons/react/24/outline';


export default function NewsDetail() {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/news/${id}`)
            .then(res => {
                setNewsItem(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching news:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Yükleniyor...</p>
        </div>
    );
    if (!newsItem) return <div className="p-20 text-center font-black uppercase tracking-widest text-slate-400">Haber bulunamadı.</div>;

    return (
        <div className="bg-white min-h-screen pb-32">
            <Seo
                title={`${newsItem.title} | Haberler`}
                description={newsItem.content.replace(/<[^>]*>/g, '').substring(0, 160)}
                type="article"
                image={newsItem.imageUrl}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": newsItem.title,
                    "description": newsItem.content.replace(/<[^>]*>/g, '').substring(0, 160),
                    "image": [newsItem.imageUrl],
                    "datePublished": newsItem.date,
                    "dateModified": newsItem.date,
                    "author": {
                        "@type": "Organization",
                        "name": "Güneyyurt Belediyesi Basın Birimi"
                    },
                    "publisher": {
                        "@type": "GovernmentOrganization",
                        "name": "Güneyyurt Belediyesi",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.guneyyurt.bel.tr/belediye-logo.png"
                        }
                    },
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": window.location.href
                    }
                }}
            />

            {/* Hero Header with Background Image */}
            <div className="h-[60vh] relative overflow-hidden bg-slate-900">
                <img src={newsItem.imageUrl} className="w-full h-full object-cover opacity-60" alt={newsItem.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-slate-900/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 pb-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <Link to="/haberler" className="inline-flex items-center gap-2 text-white/80 font-black uppercase text-[10px] tracking-[0.3em] mb-12 hover:text-white transition-all bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                            <ArrowLeftIcon className="h-4 w-4" /> Tüm Haberler
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                <span className="px-6 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{newsItem.category}</span>
                                <div className="flex items-center gap-2 text-white/60">
                                    <CalendarDaysIcon className="h-4 w-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{new Date(newsItem.date).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[1.1] drop-shadow-2xl">
                                {newsItem.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Article Content */}
                    <motion.article
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="lg:w-3/4 bg-white rounded-[4rem] p-12 lg:p-24 shadow-2xl shadow-slate-200/50 border border-slate-50"
                    >
                        <div className="flex flex-wrap items-center gap-8 mb-16 pb-12 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                    <UserIcon className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{newsItem.author}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                    <EyeIcon className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{newsItem.views} Görüntülenme</span>
                            </div>
                        </div>

                        <div
                            className="prose prose-2xl prose-slate max-w-none text-slate-600 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: newsItem.content }}
                        />

                        <div className="mt-20 pt-16 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex gap-4">
                                <button className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <ShareIcon className="h-6 w-6" />
                                </button>
                                <button className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                    <ChatBubbleLeftIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">GÜNEYYURT BELEDİYESİ BASIN</span>
                        </div>
                    </motion.article>

                    {/* Sidebar / More News */}
                    <aside className="lg:w-1/4 space-y-10">
                        <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100">
                            <h4 className="text-xl font-black text-slate-900 mb-8 uppercase italic tracking-tight">Etiketler</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Güneyyurt', 'Meydan', 'Yatırım', 'Başkan Arı', 'Mimari'].map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-white text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200">#{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-600 rounded-[3rem] p-10 text-white shadow-xl shadow-blue-600/20">
                            <h4 className="text-xl font-black mb-6 uppercase italic tracking-tight italic">E-Bülten</h4>
                            <p className="text-sm font-medium opacity-80 mb-8">Beldemizdeki gelişmelerden anında haberdar olmak için abone olun.</p>
                            <input type="email" placeholder="E-posta adresiniz" className="w-full bg-white/10 border-none rounded-2xl py-4 px-6 mb-4 placeholder:text-white/40 font-bold" />
                            <button className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Kayıt Ol</button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
