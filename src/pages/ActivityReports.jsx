import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    DocumentChartBarIcon,
    ArrowDownTrayIcon,
    CalendarIcon,
    ChartPieIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function ActivityReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get('/api/governance/reports');
                setReports(res.data);
            } catch (err) {
                console.error('Failed to fetch reports');
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Faaliyet Raporları | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi yıllık faaliyet raporları, performans programları ve mali tablolar." />

            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Faaliyet Raporları</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Şeffaf Belediyecilik, Hesap Verilebilir Yönetim.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-5xl px-6 -mt-24 relative z-10">
                <div className="grid grid-cols-1 gap-6">
                    {reports.map((report, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center justify-between group hover:border-blue-500 transition-all duration-500"
                        >
                            <div className="flex items-center gap-8 mb-6 md:mb-0">
                                <div className="h-20 w-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                                    <DocumentChartBarIcon className="h-10 w-10" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest">{report.year}</span>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <CalendarIcon className="h-3 w-3" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{new Date(report.date).toLocaleDateString('tr-TR')}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase italic tracking-tight">{report.title}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Dosya Boyutu: {report.size}</p>
                                </div>
                            </div>
                            <button className="h-16 px-10 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all">
                                <ArrowDownTrayIcon className="h-5 w-5" /> Raporu İndir (PDF)
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info Cards */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100">
                        <ChartPieIcon className="h-12 w-12 text-emerald-500 mb-8" />
                        <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-4">Mali Şeffaflık</h4>
                        <p className="text-slate-500 font-medium leading-relaxed">Belediyemizin tüm gelir ve gider tabloları, kesin hesap cetvelleri yasal süreleri içerisinde halkımızla paylaşılmaktadır.</p>
                    </div>
                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100">
                        <ShieldCheckIcon className="h-12 w-12 text-amber-500 mb-8" />
                        <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-4">Denetlenebilirlik</h4>
                        <p className="text-slate-500 font-medium leading-relaxed">Bağımsız denetim raporları ve iç denetim faaliyetlerimizle beldemizin kaynaklarını en verimli şekilde kullanıyoruz.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
