import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { MegaphoneIcon, ArrowTopRightOnSquareIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Press() {
    const [pressNews, setPressNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/news?category=Basin')
            .then(res => {
                setPressNews(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching press news:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-white min-h-screen pb-32">
            <Seo title="Basında Biz | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi hakkında ulusal ve yerel medyada çıkan haberler." />

            <div className="bg-slate-50 pt-48 lg:pt-64 pb-48 text-center px-6 border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase">Basında Biz</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-500 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Gündemi belirleyen projelerimiz ulusal mecrada.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pressNews.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Henüz bu kategoride haber bulunmuyor.</p>
                            </div>
                        )}
                        {pressNews.map((news, idx) => (
                            <Link to={`/haber/${news.id}`} key={news.id} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col group hover:-translate-y-2 transition-transform duration-500 h-full cursor-pointer"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img src={news.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=500'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.title} />
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-2xl transform translate-y-10 group-hover:translate-y-0 transition-transform">
                                                <ArrowTopRightOnSquareIcon className="h-8 w-8" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Medya / Basın
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {new Date(news.createdDate).toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-widest italic mb-8">
                                            {news.title}
                                        </h3>

                                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Haberi Oku</span>
                                            <div className="h-10 w-10 text-slate-300 group-hover:text-blue-600 transition-colors">
                                                <MegaphoneIcon className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Newspaper Archive Illustration */}
                <div className="mt-32 p-16 bg-slate-900 rounded-[4rem] flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left overflow-hidden relative">
                    <div className="absolute bottom-0 right-0 h-64 w-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
                    <div className="h-32 w-32 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white shrink-0 shadow-2xl">
                        <NewspaperIcon className="h-16 w-16" />
                    </div>
                    <div className="flex-grow">
                        <h4 className="text-3xl font-black text-white mb-4 tracking-tight uppercase italic">Medya Arşivi</h4>
                        <p className="text-slate-400 font-bold max-w-2xl leading-relaxed">Geçmişten günümüze Güneyyurt hakkında yayınlanan tüm basın bültenleri ve kupürleri için dijital arşivimizi ziyaret edebilirsiniz.</p>
                    </div>
                    <button className="px-12 py-5 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0">Arşivi Aç</button>
                </div>
            </div>
        </div>
    );
}
