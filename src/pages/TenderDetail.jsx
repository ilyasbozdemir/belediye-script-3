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
    ExclamationTriangleIcon,
    ClipboardDocumentCheckIcon,
    GlobeAltIcon,
    ArrowDownTrayIcon,
    ClockIcon,
    ScaleIcon,
    BuildingOfficeIcon,
    DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function TenderDetail() {
    const { id } = useParams();
    const [tender, setTender] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/tenders/${id}`)
            .then(res => {
                setTender(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching tender:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4 min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Yükleniyor...</p>
        </div>
    );

    if (!tender) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">İhale Bulunamadı</h2>
            <p className="text-slate-500 mb-8 font-medium">Aradığınız ihale yayından kalkmış veya taşınmış olabilir.</p>
            <Link to="/kurumsal/ihale-duyurulari" className="btn-premium px-12 py-5">İhalelere Dön</Link>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo
                title={`${tender.title} | İhale Portalı`}
                description={tender.description}
                type="article"
            />

            <div className="bg-slate-900 pt-52 lg:pt-64 pb-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <div className="mx-auto max-w-5xl px-6 relative z-10">
                    <Link to="/kurumsal/ihale-duyurulari" className="inline-flex items-center gap-2 text-blue-400 font-black uppercase text-[10px] tracking-widest mb-8 hover:text-white transition-colors">
                        <ArrowLeftIcon className="h-4 w-4" /> İhale Portalı'na Dön
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <span className="px-6 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                {tender.type}
                            </span>
                            <span className="px-6 py-2 bg-white/10 text-white/60 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 uppercase italic">
                                {tender.ekapNo}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic leading-tight">
                            {tender.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 -mt-40 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl shadow-slate-200/50 border border-slate-50"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-slate-50 mb-12 uppercase italic">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <ClockIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">İhale Tarihi & Saati</p>
                                    <p className="font-bold text-slate-900">{new Date(tender.deadline).toLocaleString('tr-TR')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <TagIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Tahmini Bütçe</p>
                                    <p className="font-bold text-slate-900">{tender.budget} ₺</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <ScaleIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">İhale Usulü</p>
                                    <p className="font-bold text-slate-900">{tender.method}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <BuildingOfficeIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">İlgili Birim</p>
                                    <p className="font-bold text-slate-900">Destek Hizmetleri Müdürlüğü</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-xl font-black text-slate-900 uppercase italic mb-6 flex items-center gap-3">
                                    <DocumentMagnifyingGlassIcon className="h-6 w-6 text-blue-600" /> İhale Özeti
                                </h3>
                                <p className="text-slate-600 font-medium leading-loose text-lg italic uppercase tracking-tight">
                                    {tender.description}
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black text-slate-900 uppercase italic mb-6 flex items-center gap-3">
                                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-600" /> İhale Detayları
                                </h3>
                                <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-4">
                                    <div className="flex justify-between items-center py-4 border-b border-slate-100 italic uppercase">
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">İhale Kayıt No (KİK)</span>
                                        <span className="text-slate-900 font-black">{tender.ekapNo}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-b border-slate-100 italic uppercase">
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">İhalenin Türü</span>
                                        <span className="text-slate-900 font-black">{tender.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-b border-slate-100 italic uppercase">
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">İlan Tarihi</span>
                                        <span className="text-slate-900 font-black">{new Date(tender.announcementDate).toLocaleDateString('tr-TR')}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-4 italic uppercase">
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Durumu</span>
                                        <span className="text-blue-600 font-black">{tender.status}</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.div>

                    {/* Sidebar / Actions */}
                    <div className="lg:w-96 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-50 space-y-4 sticky top-32"
                        >
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <InformationCircleIcon className="h-5 w-5 text-blue-600" /> İşlemler
                            </h4>
                            <a
                                href={`https://ekap.kik.gov.tr/`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all font-premium active:scale-95"
                            >
                                <ClipboardDocumentCheckIcon className="h-5 w-5" /> EKAP'TA GÖRÜNTÜLE
                            </a>
                            <a
                                href={`https://www.ilan.gov.tr/`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95"
                            >
                                <GlobeAltIcon className="h-5 w-5" /> ILAN.GOV.TR İLANI
                            </a>
                            <button className="w-full h-16 bg-white border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95">
                                <ArrowDownTrayIcon className="h-5 w-5" /> TEKNİK ŞARTNAME İNDİR
                            </button>

                            <div className="mt-8 p-6 bg-blue-50 rounded-2xl text-[10px] font-bold text-blue-700 leading-loose italic uppercase uppercase tracking-widest text-center">
                                Bu ihale bilgileri örnek mahiyetindedir. Kesin belgeler için EKAP üzerinden kontrol ediniz.
                            </div>
                        </motion.div>

                        <div className="bg-amber-50 rounded-[3rem] p-8 border border-amber-100 flex gap-4">
                            <ExclamationTriangleIcon className="h-8 w-8 text-amber-600 shrink-0" />
                            <div>
                                <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-1 italic">Dikkat</p>
                                <p className="text-amber-800 text-xs font-medium leading-relaxed italic">
                                    İhale evrakları sadece yukarıdaki butondan dijital imzalı olarak indirilebilir.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
