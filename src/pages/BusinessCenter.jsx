import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    BuildingOffice2Icon,
    ShoppingCartIcon,
    KeyIcon,
    MapPinIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';

const defaultShops = [
    { id: 1, title: 'Zemin Kat - Market Alanı', size: '120 m²', status: 'Satışta', price: 'İhale ile Belirlenecek', features: ['Otomatik Giriş', 'Depo Alanı', 'Merkezi Konum'] },
    { id: 2, title: '1. Kat - Ofis / Büro', size: '45 m²', status: 'Kiralamaya Uygun', price: '6.500 ₺ / Ay', features: ['Fiber İnternet', 'Mutfak Nişi', 'Asansör'] },
    { id: 3, title: 'Zemin Kat - Butik Dükkan', size: '35 m²', status: 'Satışta', price: 'İhale ile Belirlenecek', features: ['Vitrin Cepheli', 'Wc Mevcut', 'Yüksek Tavan'] },
    { id: 4, title: '2. Kat - Geniş Ofis', size: '85 m²', status: 'Kiralamaya Uygun', price: '12.000 ₺ / Ay', features: ['Manzaralı', 'Teraslı', 'Özel Wc'] },
];

export default function BusinessCenter() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/sitesettings/is-hani').then(res => {
            if (res.data.length > 0) setUnits(res.data);
            else setUnits(defaultShops);
        }).catch(() => {
            setUnits(defaultShops);
        }).finally(() => setLoading(false));
    }, []);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Güneyyurt Belediyesi İş Hanı Ticari Birimler",
        "description": "Güneyyurt'ta kiralık ve satılık modern dükkan ve ofis alanları.",
        "brand": {
            "@type": "GovernmentOrganization",
            "name": "Güneyyurt Belediyesi"
        },
        "offers": units.map(u => ({
            "@type": "Offer",
            "name": u.title,
            "description": `${u.size} büyüklüğünde ${u.status} birim.`,
            "priceCurrency": "TRY",
            "availability": "https://schema.org/InStock"
        }))
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo
                title="Belediye İş Hanı | Güneyyurt Belediyesi"
                description="Güneyyurt Belediyesi İş Hanı dükkan satış ve kiralama bilgileri, ofis alanları."
                jsonLd={jsonLd}
            />

            <div className="bg-slate-900 pt-32 pb-64 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200')] opacity-20 bg-cover bg-center" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <BuildingOffice2Icon className="h-16 w-16 text-blue-500 mx-auto mb-8" />
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Güneyyurt İş Hanı</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-300 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Ticaretin merkezi, beldemizin yeni vizyonu.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { label: 'Toplam Alan', value: '2,450 m²', sub: 'Kapalı Alan' },
                        { label: 'Dükkan Sayısı', value: '32', sub: 'Ticari Birim' },
                        { label: 'Ofis Sayısı', value: '18', sub: 'İdari Birim' },
                        { label: 'Otopark', value: '60', sub: 'Araç Kapasitesi' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 text-center">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
                            <p className="text-blue-600 text-[9px] font-bold mt-2 uppercase tracking-tighter">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3 sticky top-32">
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50">
                            <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">İş Hanı Bilgi</h2>
                            <p className="text-slate-500 font-medium leading-relaxed mb-10">
                                Güneyyurt Belediyesi tarafından hayata geçirilen İş Hanı projesi, modern dükkanları ve konforlu ofis alanlarıyla beldemizin ticaret hayatına yeni bir soluk getiriyor.
                            </p>

                            <div className="space-y-6">
                                {[
                                    'Merkezi Isıtma & Soğutma',
                                    '7/24 Güvenlik & Kamera',
                                    'Modern Asansörler',
                                    'Geniş Vitrin Tasarımı'
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-700">
                                        <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
                                        {feat}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all">
                                <PhoneIcon className="h-4 w-4" /> Satış Ofisini Ara
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-2/3">
                        <div className="flex items-end justify-between mb-12 px-4">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Birim Detayları</h2>
                                <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Mevcut Durum ve Özellikler</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-5 py-2 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg">Satışta</span>
                                <span className="px-5 py-2 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg">Kiralık</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center p-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {units.map((shop, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -10 }}
                                        className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-lg hover:shadow-2xl transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-8">
                                            <div className={`p-4 rounded-2xl ${shop.status === 'Satışta' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {shop.status === 'Satışta' ? <ShoppingCartIcon className="h-8 w-8" /> : <KeyIcon className="h-8 w-8" />}
                                            </div>
                                            <span className="text-2xl font-black text-slate-300">{shop.size}</span>
                                        </div>

                                        <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight italic group-hover:text-blue-600 transition-colors uppercase">{shop.title}</h3>

                                        <div className="space-y-3 mb-8">
                                            {(shop.features || []).map((f, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                                                    {f}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Fiyat/Şart</p>
                                                <p className="text-lg font-black text-blue-600 leading-none">{shop.price}</p>
                                            </div>
                                            <button className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all">
                                                <ArrowRightIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

