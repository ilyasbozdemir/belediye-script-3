import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    DocumentChartBarIcon,
    ArrowDownTrayIcon,
    PresentationChartLineIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function StrategicPlan() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await axios.get('/api/strategicplan');
                setDocuments(res.data);
            } catch (err) {
                console.error('Failed to fetch plans');
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Stratejik Plan & Raporlar | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi orta ve uzun vadeli stratejik planları, performans programları." />

            <div className="bg-indigo-700 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <PresentationChartLineIcon className="h-20 w-20 text-indigo-200 mx-auto mb-8 opacity-40" />
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Gelecek Vizyonumuz</h1>
                    <div className="h-1.5 w-24 bg-white/20 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-indigo-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Şeffaf, Planlı ve Sürdürülebilir Bir Güneyyurt İçin.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-5xl px-6 -mt-24 relative z-10">
                <div className="grid grid-cols-1 gap-6">
                    {documents.map((doc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-xl border border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-indigo-500 transition-all"
                        >
                            <div className="flex items-center gap-8">
                                <div className="h-20 w-20 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                                    <DocumentChartBarIcon className="h-10 w-10" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{doc.title}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{doc.year} Yılı Yayınlanma • PDF • {doc.size}</p>
                                </div>
                            </div>
                            <button className="px-10 py-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all">
                                <ArrowDownTrayIcon className="h-5 w-5" /> İndir
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-16 bg-white rounded-[4rem] text-center shadow-sm border border-slate-100">
                    <ShieldCheckIcon className="h-16 w-16 text-indigo-500 mx-auto mb-8" />
                    <h4 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight italic">Hesap Verilebilir Yönetim</h4>
                    <p className="text-slate-500 font-bold leading-relaxed max-w-2xl mx-auto uppercase tracking-widest text-[10px] opacity-70">
                        5018 Sayılı Kamu Mali Yönetimi ve Kontrol Kanunu uyarınca hazırlanan planlarımızla, halkımızın her bir kuruşunun nereye, ne zaman ve nasıl harcanacağını titizlikle planlıyoruz.
                    </p>
                </div>
            </div>
        </div>
    );
}
