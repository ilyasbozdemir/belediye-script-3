import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BuildingLibraryIcon,
    ShoppingBagIcon,
    ClockIcon,
    MapPinIcon,
    PhoneIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    RectangleGroupIcon,
    TagIcon,
    InformationCircleIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

const assetItems = [
    // KAMU HİZMET TESİSLERİ (Ayrılmaz Varlıklar)
    {
        id: 1,
        name: 'Güneyyurt Kültür Merkezi',
        category: 'Kamu Hizmet Tesisi',
        type: 'Kültür & Sosyal',
        desc: 'Beldemizin vizyon projelerinden biri olan bu merkez; düğün, nişan, konferans ve her türlü kültürel etkinliğe ev sahipliği yapar. Özelleştirilemez belediye varlığıdır.',
        img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
        stats: { size: '1200 m²', capacity: '800 Kişi' },
        features: ['Modern Ses Sistemi', 'Geniş Otopark', 'Klima'],
        schedule: [
            { day: 'Resmi Çalışma', note: '08:30 - 17:30' },
            { day: 'Organizasyon', note: 'Rezervasyon Esaslı' }
        ],
        isCommercial: false
    },
    {
        id: 2,
        name: 'Yarı Olimpik Yüzme Havuzu',
        category: 'Kamu Hizmet Tesisi',
        type: 'Spor & Sağlık',
        desc: 'Tamamlanan projelerimiz kapsamında halkımızın hizmetine sunulan, modern hijyen standartlarına sahip spor tesisimiz.',
        img: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800',
        stats: { size: 'Semi-Olimpik', depth: '1.40m - 2.10m' },
        features: ['Cankurtaran Hizmeti', 'Kadın/Erkek Seansları', 'Sauna'],
        schedule: [
            { day: 'Kadın Günleri', note: 'Salı, Perşembe, Cst.' },
            { day: 'Erkek Günleri', note: 'Pzt., Çarş., Cuma' }
        ],
        isCommercial: false
    },
    {
        id: 3,
        name: 'Belediye Halı Saha Tesisleri',
        category: 'Kamu Hizmet Tesisi',
        type: 'Spor & Gençlik',
        desc: 'Gençlerimizin spor yapabileceği, gece aydınlatmalı ve modern zeminli spor alanı.',
        img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
        stats: { size: '30x50m Standart', surface: 'Suni Çim' },
        features: ['Kafeterya', 'Soyunma Odaları', 'Gece Maçı'],
        schedule: [
            { day: 'Haftanın Her Günü', note: '09:00 - 00:00' }
        ],
        isCommercial: false
    },
    // TİCARİ ALANLAR & İHALE BİRİMLERİ (İş Hanı vb.)
    {
        id: 101,
        name: 'Belediye İş Hanı - Köşe Mağaza',
        category: 'Ticari Tahsis',
        type: 'Kiralık / İhale',
        desc: 'Yeni tamamlanan Belediye İş Hanı projesi içerisinde yer alan, yüksek tabela değerine sahip kiralık ticari alan.',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        stats: { size: '120 m²', floor: 'Zemin Kat' },
        features: ['Çift Cephe', 'Otomatik Kepenk', 'Wc Mevcut'],
        statusText: 'İhale Sürecinde',
        isCommercial: true,
        price: 'İhale ile Belirlenecek'
    },
    {
        id: 102,
        name: 'İş Hanı - 1. Kat Ofis Birimi',
        category: 'Ticari Tahsis',
        type: 'Kiralık / İhale',
        desc: 'İş hanımızın ofis katında yer alan, modern mimariye uygun, profesyonel kullanıma hazır büro alanı.',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
        stats: { size: '45 m²', floor: '1. Kat' },
        features: ['Fiber İnternet', 'Mutfak Nişi', 'Asansör'],
        statusText: 'Kiralamaya Uygun',
        isCommercial: true,
        price: '6.500 ₺ / Ay'
    },
    {
        id: 103,
        name: 'Merkez Park Cafe İşletmesi',
        category: 'Ticari Tahsis',
        type: 'Kiralık / İşletme',
        desc: 'Mülkiyeti belediyemize ait, ihale usulü ile özel girişimciye devredilmeye uygun sosyal tesis alanı.',
        img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
        stats: { size: '200 m²', capacity: '40 Masa' },
        features: ['Açık Alan', 'Park Manzaralı', 'Hazır Mutfak'],
        statusText: 'Kiralık / İşletmeci Bekleniyor',
        isCommercial: true,
        price: 'Teklif Usulü'
    }
];

export default function MunicipalBusinesses() {
    const [filter, setFilter] = useState('ALL');
    const [items, setItems] = useState(assetItems);

    useEffect(() => {
        // Backend entegrasyonu buraya gelecek. Şimdilik mock veriyi kullanıyoruz.
        // axios.get('/api/business?isMunicipal=true').then(...)
    }, []);

    const filteredItems = filter === 'ALL'
        ? items
        : items.filter(i => filter === 'CAMU' ? !i.isCommercial : i.isCommercial);

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo
                title="Belediye Varlıkları ve İşletmeleri | Güneyyurt Belediyesi"
                description="Güneyyurt Belediyesi'ne ait tesisler, projeler, İş Hanı dükkanları ve kiralık ticari alanların şeffaf yönetim portalı."
            />

            {/* Header Hero */}
            <div className="bg-slate-900 pt-32 pb-64 px-6 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                    <BuildingLibraryIcon className="h-16 w-16 text-blue-500 mx-auto mb-8" />
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Belediye Varlıkları & İşletmeler</h1>
                    <p className="mt-8 text-slate-300 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80 leading-relaxed">
                        Beldemizin öz kaynakları, tamamlanan projelerimiz ve halkımıza sunduğumuz ticari imkanlar.
                    </p>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-10 rounded-full"></div>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-32 relative z-20">
                {/* Info Card */}
                <div className="bg-white p-6 rounded-3xl shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
                    <div className="flex items-center gap-4 text-slate-500">
                        <InformationCircleIcon className="h-10 w-10 text-blue-600" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 text-slate-400">Yönetim Politikası</p>
                            <p className="text-xs font-bold leading-relaxed">Kültür ve spor tesisleri belediyemizce işletilir, dükkan ve ofisler ihale usulü halka açılır.</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                        {[
                            { id: 'ALL', label: 'TÜM VARLIKLAR', icon: RectangleGroupIcon },
                            { id: 'CAMU', label: 'KAMU TESİSLERİ', icon: BuildingLibraryIcon },
                            { id: 'COMMERCIAL', label: 'TİCARİ / İHALE', icon: TagIcon }
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setFilter(btn.id)}
                                className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${filter === btn.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                <btn.icon className="h-4 w-4" />
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-50 flex flex-col group h-full"
                            >
                                <div className="h-72 relative overflow-hidden">
                                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.name} />
                                    <div className={`absolute top-8 right-8 px-6 py-2 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${item.isCommercial ? 'bg-amber-500/90 text-white' : 'bg-blue-600/90 text-white'
                                        }`}>
                                        {item.category}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{item.type}</span>
                                        </div>
                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{item.name}</h3>
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col flex-grow">
                                    <p className="text-slate-500 font-medium italic mb-8 leading-relaxed">"{item.desc}"</p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {Object.entries(item.stats).map(([k, v], i) => (
                                            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{k === 'size' ? 'Büyüklük' : k === 'floor' ? 'Konum' : k}</p>
                                                <p className="text-sm font-black text-slate-900">{v}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-4 mb-10">
                                        {item.schedule ? (
                                            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <ClockIcon className="h-4 w-4" /> Hizmet Programı
                                                </p>
                                                <div className="space-y-3">
                                                    {item.schedule.map((s, i) => (
                                                        <div key={i} className="flex justify-between items-center text-[11px]">
                                                            <span className="font-black text-slate-900 uppercase">{s.day}</span>
                                                            <span className="font-bold text-slate-500 italic">{s.note}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50">
                                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <TagIcon className="h-4 w-4" /> Tahsis Bilgisi
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[11px] font-black text-slate-900 uppercase">{item.statusText}</span>
                                                    <span className="text-sm font-black text-amber-600">{item.price}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Info */}
                                    <div className="mt-auto pt-8 border-t border-slate-50 flex flex-wrap gap-2 mb-8">
                                        {item.features.map((f, i) => (
                                            <span key={i} className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded-lg uppercase tracking-tight flex items-center gap-2">
                                                <CheckCircleIcon className="h-3 w-3 text-emerald-500" /> {f}
                                            </span>
                                        ))}
                                    </div>

                                    <button className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all ${item.isCommercial
                                            ? 'bg-slate-900 hover:bg-black text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}>
                                        {item.isCommercial ? 'İhalede Teklif Ver' : 'Bilgi Al & Rezervasyon'}
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 p-12 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[4rem] text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <SparklesIcon className="h-12 w-12 text-blue-300 mx-auto mb-8 animate-pulse" />
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-6 relative z-10">Geleceğin Güneyyurt'unu <br />İnşa Ediyoruz</h3>
                    <p className="text-blue-100 font-medium max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] leading-loose relative z-10">Tüm yatırımlarımız beldemizin kalkınması ve vatandaşlarımızın daha modern imkanlara kavuşması içindir.</p>
                </div>
            </div>
        </div>
    );
}
