import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    BuildingOffice2Icon,
    MapIcon,
    DocumentTextIcon,
    MagnifyingGlassIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function Zoning() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="İmar Durumu Sorgulama | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi ada, parsel bazlı imar durumu sorgulama ve şehircilik hizmetleri." />

            {/* Header Section */}
            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">İmar Durumu</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Şehrimizin düzenli gelişimi ve imar planı verilerine anında erişin.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Inquiry Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 bg-white rounded-[4rem] p-12 lg:p-20 shadow-xl shadow-slate-200/50 border border-slate-100"
                    >
                        <div className="flex items-center gap-6 mb-12">
                            <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                                <MagnifyingGlassIcon className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Parsel Sorgulama</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">E-Devlet Entegrasyonlu Veriler</p>
                            </div>
                        </div>

                        <form className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Ada No</label>
                                    <input type="text" placeholder="Örn: 124" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/10 font-black text-slate-900 placeholder-slate-300" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Parsel No</label>
                                    <input type="text" placeholder="Örn: 12" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/10 font-black text-slate-900 placeholder-slate-300" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Mahalle / Mevkii</label>
                                <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/10 font-black text-slate-900 appearance-none">
                                    <option>Seçiniz</option>
                                    <option>Orta Mahallesi</option>
                                    <option>Oda Mahallesi</option>
                                    <option>Pınargözü Mahallesi</option>
                                    <option>Yenimahalle</option>
                                    <option>Kışlacık Mahallesi</option>
                                    <option>Aralık Mahallesi</option>
                                    <option>Cami Mahallesi</option>
                                    <option>Habib Mahallesi</option>
                                </select>
                            </div>
                            <button type="submit" className="btn-premium w-full py-6 flex items-center justify-center gap-4 group">
                                Sorgulamayı Başlat <ArrowIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-16 p-8 bg-blue-50/50 rounded-4xl border border-blue-100/50 flex items-start gap-6">
                            <ExclamationTriangleIcon className="h-8 w-8 text-blue-600 shrink-0" />
                            <p className="text-sm font-bold text-blue-900/70 leading-relaxed italic">
                                Not: Bu sistem bilgilendirme amaçlıdır. Resmi işlemlerde belediyemiz İmar ve Şehircilik Müdürlüğü'nden onaylı "İmar Durum Belgesi" alınması zorunludur.
                            </p>
                        </div>
                    </motion.div>

                    {/* Side Info Cards */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 h-32 w-32 bg-blue-600/20 blur-3xl rounded-full" />
                            <MapIcon className="h-12 w-12 text-blue-400 mb-8" />
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Coğrafi Bilgi Sistemi</h3>
                            <p className="text-slate-400 font-medium mb-8 leading-relaxed">Şehrimizin interaktif haritası üzerinden katmanları inceleyerek detaylı analiz yapabilirsiniz.</p>
                            <a href="https://parselsorgu.tkgm.gov.tr/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">Haritayı Aç <ArrowIcon className="h-4 w-4" /></a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm"
                        >
                            <BuildingOffice2Icon className="h-12 w-12 text-slate-300 mb-8" />
                            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight italic">Başvuru Belgeleri</h3>
                            <ul className="space-y-4">
                                {['Tapu Kaydı (Güncel)', 'Aplikasyon Krokisi', 'Vekaletname (Gerekiyorsa)', 'Hizmet Harcı Dekontu'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-500 font-bold text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    );
}
