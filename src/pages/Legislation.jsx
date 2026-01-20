import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BuildingLibraryIcon,
    DocumentTextIcon,
    ScaleIcon,
    LinkIcon,
    MagnifyingGlassIcon,
    ShieldCheckIcon,
    DocumentChartBarIcon,
    BookmarkIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const staticLegislationData = {
    'Temel Kanunlar': [
        {
            title: '5393 Sayılı Belediye Kanunu',
            ref: 'Resmi Gazete: 13.07.2005 - 25874',
            url: 'https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5393.pdf',
            desc: 'Belediyelerin kuruluşu, organları, yönetimi, görev ve sorumlulukları ile çalışma usul ve esaslarını düzenleyen temel kanun.'
        },
        {
            title: '5018 Sayılı Kamu Mali Yönetimi ve Kontrol Kanunu',
            ref: 'Resmi Gazete: 24.12.2003 - 25326',
            url: 'https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5018.pdf',
            desc: 'Kamu kaynaklarının etkili, ekonomik ve verimli bir şekilde elde edilmesi ve kullanılmasını, hesap verilebilirliği sağlamayı amaçlayan kanun.'
        },
        {
            title: '4734 Sayılı Kamu İhale Kanunu',
            ref: 'Resmi Gazete: 22.01.2002 - 24648',
            url: 'https://www.mevzuat.gov.tr/MevzuatMetin/1.5.4734.pdf',
            desc: 'Kamu kurumlarının her türlü mal veya hizmet alımları ile yapım işlerine ilişkin ihale süreçlerini düzenleyen şeffaf yönetim ilkesi yasası.'
        }
    ],
    'Yönetmelikler': [
        {
            title: 'Güneyyurt Belediyesi Teşkilat Yönetmeliği',
            ref: 'Belediye Meclis Kararı: 2023/12',
            url: '#',
            desc: 'Belediye birimlerinin çalışma usul ve esaslarını belirleyen iç organizasyon yönetmeliği.'
        },
        {
            title: 'Zabıta Emir ve Yasaklar Yönetmeliği',
            ref: 'Belediye Meclis Kararı: 2022/45',
            url: '#',
            desc: 'Beldemizdeki huzur, sağlık ve esenliğin sağlanması için uyulması gereken yerel kurallar bütünü.'
        }
    ]
};

export default function Legislation() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCat = searchParams.get('cat');
    const [activeCategory, setActiveCategory] = useState(initialCat || 'Temel Kanunlar');
    const [dynamicData, setDynamicData] = useState({
        'Faaliyet Raporları': [],
        'Stratejik Planlar': []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reportsRes, plansRes] = await Promise.all([
                    axios.get('/api/governance/reports'),
                    axios.get('/api/strategicplan')
                ]);

                setDynamicData({
                    'Faaliyet Raporları': reportsRes.data.map(r => ({
                        title: r.title,
                        ref: `${r.year} Yılı Raporu - Yayın: ${new Date(r.date).toLocaleDateString('tr-TR')}`,
                        url: r.fileUrl || '#',
                        desc: `Belediyemizin ${r.year} yılına ait şeffaflık ve hesap verilebilirlik ilkeleri çerçevesinde hazırlanan resmi faaliyet raporudur.`,
                        isDownload: true,
                        size: r.size
                    })),
                    'Stratejik Planlar': plansRes.data.map(p => ({
                        title: p.title,
                        ref: `${p.year} Stratejik Belgesi`,
                        url: p.fileUrl || '#',
                        desc: `Beldemizin geleceğini şekillendiren, orta ve uzun vadeli hedeflerimizi içeren ${p.year} dönemi stratejik planlama dökümanı.`,
                        isDownload: true,
                        size: p.size
                    }))
                });
            } catch (err) {
                console.error('Failed to fetch legislation data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const allData = { ...staticLegislationData, ...dynamicData };
    const categories = Object.keys(allData);

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Mevzuat ve Kanunlar | Güneyyurt Belediyesi" description="Belediye hizmetlerimizi dayandırdığımız 5393 Sayılı Belediye Kanunu ve diğer ilgili mevzuat dökümanları." />

            {/* Header */}
            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Mevzuat ve Yasalar</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest leading-relaxed">Şeffaf Belediyeciliğin Hukuki Dayanakları ve Kamu Yönetimi Mevzuatı.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar / Quick Links */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm sticky top-32">
                            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tighter italic">Kategoriler</h3>
                            <div className="space-y-4">
                                {categories.map((cat, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setActiveCategory(cat);
                                            setSearchParams({ cat: cat });
                                        }}
                                        className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : 'text-slate-400 hover:bg-slate-50 hover:text-blue-600'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-600/30">
                            <ShieldCheckIcon className="h-12 w-12 mb-8" />
                            <h4 className="text-2xl font-black mb-4 tracking-tight uppercase italic">Hukuki Portal</h4>
                            <p className="text-blue-100 font-medium text-sm leading-relaxed mb-8 italic">Tüm güncel kanun metinlerine Cumhurbaşkanlığı Mevzuat Bilgi Sistemi üzerinden erişebilirsiniz.</p>
                            <a href="https://www.mevzuat.gov.tr/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest">Sistemi Aç <LinkIcon className="h-4 w-4" /></a>
                        </div>
                    </div>

                    {/* Content List */}
                    <div className="lg:col-span-3 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                {allData[activeCategory].length > 0 ? (
                                    allData[activeCategory].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white p-12 rounded-[4rem] border border-slate-50 shadow-xl shadow-slate-200/50 group hover:border-blue-500 transition-all duration-500"
                                        >
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                            {item.isDownload ? <DocumentChartBarIcon className="h-6 w-6" /> : (activeCategory === 'Temel Kanunlar' ? <ScaleIcon className="h-6 w-6" /> : <DocumentTextIcon className="h-6 w-6" />)}
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block leading-none mb-1">Referans Bilgi</span>
                                                            <p className="text-xs font-bold text-slate-900 italic">{item.ref}</p>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight italic leading-tight group-hover:text-blue-600 transition-colors">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-slate-500 font-medium leading-[2] text-lg lg:max-w-3xl">
                                                        {item.desc}
                                                    </p>

                                                    {item.size && (
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">Dosya Boyutu: {item.size}</p>
                                                    )}
                                                </div>

                                                <a
                                                    href={item.url}
                                                    target={item.url.startsWith('http') || item.isDownload ? "_blank" : "_self"}
                                                    rel="noreferrer"
                                                    className="h-20 w-full md:w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all shadow-sm shrink-0"
                                                >
                                                    {item.isDownload ? <ArrowDownTrayIcon className="h-8 w-8" /> : <LinkIcon className="h-8 w-8" />}
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white p-20 rounded-[4rem] text-center border border-slate-100">
                                        <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-8">
                                            <BookmarkIcon className="h-10 w-10" />
                                        </div>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Bu kategoride henüz döküman bulunmamaktadır.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="p-16 bg-slate-900 rounded-[4rem] text-center">
                            <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight italic">E-Mevzuat Bülteni</h4>
                            <p className="text-slate-400 font-bold max-w-xl mx-auto mb-10 text-xs uppercase tracking-[0.2em] leading-loose opacity-70">Belediye hizmetleriyle ilgili yayınlanan yeni yönetmelik ve tebliğlerden anında haberdar olmak için bültene abone olabilirsiniz.</p>
                            <div className="max-w-md mx-auto flex gap-4">
                                <input type="email" placeholder="E-posta adresiniz" className="flex-1 bg-white/5 border-none rounded-2xl px-8 py-5 text-white placeholder-slate-600 font-bold focus:ring-2 focus:ring-blue-600" />
                                <button className="px-10 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-colors">Kayıt Ol</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
