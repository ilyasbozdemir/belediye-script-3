import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ClipboardDocumentCheckIcon,
    CalendarDaysIcon,
    ArrowDownTrayIcon,
    TagIcon,
    GlobeAltIcon,
    ScaleIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function Tenders() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenders = async () => {
            try {
                const res = await axios.get('/api/tenders');
                setTenders(res.data);
            } catch (err) {
                console.error('Failed to fetch tenders', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTenders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Aktif': return 'bg-emerald-500 text-white shadow-emerald-200';
            case 'Yeni': return 'bg-blue-600 text-white shadow-blue-200';
            case 'Tamamlandı': return 'bg-slate-500 text-white shadow-slate-200';
            default: return 'bg-slate-200 text-slate-500';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Yapım İşi': return <ScaleIcon className="h-4 w-4" />;
            case 'Mal Alımı': return <TagIcon className="h-4 w-4" />;
            case 'Hizmet Alımı': return <ClipboardDocumentCheckIcon className="h-4 w-4" />;
            default: return <InformationCircleIcon className="h-4 w-4" />;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="İhale Duyuruları | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi güncel ihale ilanları, teknik şartnameler ve ihale sonuçları." />

            {/* Header Section */}
            <div className="bg-slate-900 pt-40 pb-64 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <span className="inline-block px-6 py-2 bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        Şeffaf Belediyecilik
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                        İhale <span className="text-blue-600">Portalı</span>
                    </h1>
                    <div className="h-1.5 w-32 bg-blue-600 mx-auto mt-10 rounded-full"></div>
                    <p className="mt-10 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest leading-relaxed opacity-80">
                        Güneyyurt Belediyesi'nin Tüm Alım ve Yapım İhalelerini Buradan Şeffaf Bir Şekilde Takip Edebilirsiniz.
                    </p>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-6xl px-6 lg:px-8 -mt-32 relative z-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[4rem] shadow-xl border border-slate-100">
                        <div className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Veriler Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-10">
                        <AnimatePresence>
                            {tenders.map((tender, idx) => (
                                <motion.div
                                    key={tender.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:border-blue-500 transition-all duration-500"
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Left Side: Main Info */}
                                        <div className="flex-1 p-8 lg:p-12">
                                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                                <span className={`px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${getStatusColor(tender.status)}`}>
                                                    {tender.status}
                                                </span>
                                                <span className="px-5 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 italic">
                                                    {getTypeIcon(tender.type)} {tender.type}
                                                </span>
                                                <span className="px-5 py-1.5 bg-amber-50 border border-amber-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-amber-700">
                                                    {tender.method}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors uppercase tracking-tight italic">
                                                {tender.title}
                                            </h3>

                                            <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg line-clamp-2">
                                                {tender.description}
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-slate-50 mt-auto">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Son Başvuru</p>
                                                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                                                        <ClockIcon className="h-4 w-4 text-orange-500" />
                                                        {new Date(tender.deadline).toLocaleDateString('tr-TR')}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tahmini Bütçe</p>
                                                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                                                        <TagIcon className="h-4 w-4 text-emerald-500" />
                                                        {tender.budget} ₺
                                                    </div>
                                                </div>
                                                <div className="hidden md:block">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kayıt No</p>
                                                    <div className="text-slate-900 font-bold truncate">
                                                        {tender.ekapNo}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Actions */}
                                        <div className="lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-100 p-8 flex flex-col justify-center gap-4">
                                            <a
                                                href={`https://ekap.kik.gov.tr/`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all font-premium active:scale-95"
                                            >
                                                <ClipboardDocumentCheckIcon className="h-5 w-5" /> EKAP Görüntüle
                                            </a>
                                            <a
                                                href={`https://www.ilan.gov.tr/`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95"
                                            >
                                                <GlobeAltIcon className="h-5 w-5" /> ilan.gov.tr
                                            </a>
                                            <button className="w-full h-16 bg-white border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95">
                                                <ArrowDownTrayIcon className="h-5 w-5" /> Teknik Şartname
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Info Card */}
                {!loading && tenders.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 p-12 bg-white rounded-[4rem] border border-blue-100 shadow-xl flex flex-col md:flex-row items-center gap-10"
                    >
                        <div className="h-20 w-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shrink-0">
                            <ExclamationCircleIcon className="h-10 w-10 text-blue-600" />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-slate-900 mb-2 uppercase italic tracking-tighter">İhale Takibi Hakkında</h4>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Tüm ihalelerimiz şeffaflık ilkesi gereği EKAP üzerinden de yayınlanmaktadır.
                                İhalelere katılım koşulları ve gerekli belgeler için ilgili ihale numarasını EKAP üzerinden sorgulayabilirsiniz.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
