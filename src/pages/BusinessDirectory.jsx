import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    BriefcaseIcon,
    MapPinIcon,
    PhoneIcon,
    GlobeAltIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    TagIcon,
    StarIcon
} from '@heroicons/react/24/outline';

const categories = ['Tümü', 'Restoran & Kafe', 'Market & Gıda', 'Hizmet', 'Teknoloji', 'Giyim & Tekstil', 'Diğer'];

export default function BusinessDirectory() {
    const [businesses, setBusinesses] = useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tümü');

    useEffect(() => {
        axios.get('/api/business').then(res => {
            if (res.data.length > 0) {
                setBusinesses(res.data);
                setFilteredBusinesses(res.data);
            } else {
                throw new Error('Empty');
            }
            setLoading(false);
        }).catch(() => {
            // Mock if empty
            const mock = [
                { id: 1, name: 'Güneyyurt Lezzet Sofrası', category: 'Restoran & Kafe', description: 'Geleneksel lezzetlerin modern sunumuyla buluştuğu nokta.', address: 'Belediye Sk. No:82', phone: '0338 736 00 00', website: '', workingHours: '08:00 - 22:00', isFeatured: true, logoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7ed9d8747c?w=400' },
                { id: 2, name: 'Özcan Teknoloji & İletişim', category: 'Teknoloji', description: 'Elektronik tamir, aksesuar ve yeni nesil teknolojik ürünler.', address: 'Çarşı Meydanı No:5', phone: '0533 000 00 00', website: '', workingHours: '09:00 - 20:00', isFeatured: true, logoUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400' },
                { id: 3, name: 'Birlik Süpermarket', category: 'Market & Gıda', description: 'Taze sebze, meyve ve geniş ürün yelpazesiyle hizmetinizdeyiz.', address: 'Cumhuriyet Cd. No:42', phone: '0338 736 10 10', website: '', workingHours: '07:00 - 23:00', isFeatured: false, logoUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400' },
                { id: 4, name: 'Güneyyurt Terzisi Mehmet', category: 'Giyim & Tekstil', description: 'Özel dikim, tadilat ve her türlü konfeksiyon işleri.', address: 'Eski Çarşı No:3', phone: '0544 000 00 00', website: '', workingHours: '08:30 - 19:00', isFeatured: false, logoUrl: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=400' },
            ];
            setBusinesses(mock);
            setFilteredBusinesses(mock);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        let result = businesses;
        if (activeCategory !== 'Tümü') {
            result = result.filter(b => b.category === activeCategory);
        }
        if (searchTerm) {
            result = result.filter(b =>
                b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredBusinesses(result);
    }, [searchTerm, activeCategory, businesses]);

    // JSON-LD for Local Businesses
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": filteredBusinesses.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "LocalBusiness",
                "name": b.name,
                "description": b.description,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": b.address,
                    "addressLocality": "Güneyyurt",
                    "addressRegion": "Karaman",
                    "addressCountry": "TR"
                },
                "telephone": b.phone,
                "url": b.website || window.location.href,
                "image": b.logoUrl
            }
        }))
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo
                title="İşletme Rehberi"
                description="Güneyyurt'taki yerel işletmeler, dükkanlar ve hizmet noktaları rehberi."
                jsonLd={jsonLd}
            />

            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <BriefcaseIcon className="h-16 w-16 text-blue-500 mx-auto mb-8" />
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic font-outfit">İşletme Rehberi</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Güneyyurt Ticaret Hayatını Keşfedin.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
                {/* Search and Filter */}
                <div className="bg-white p-6 rounded-[3rem] shadow-2xl border border-slate-100 mb-16">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <div className="relative flex-grow w-full">
                            <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
                            <input
                                type="text"
                                placeholder="İşletme adı veya hizmet ara..."
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 w-full lg:w-auto no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-32">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-8"></div>
                        <p className="font-black text-slate-400 uppercase tracking-widest">Veriler Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence mode='popLayout'>
                            {filteredBusinesses.map((b, idx) => (
                                <motion.div
                                    key={b.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="bg-white rounded-[4rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col group hover:shadow-2xl transition-all"
                                >
                                    <div className="h-48 relative overflow-hidden">
                                        <img src={b.logoUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'} alt={b.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-6 left-8 flex items-center gap-3">
                                            <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">{b.category}</span>
                                            {b.isFeatured && <StarIcon className="h-4 w-4 text-amber-400 fill-amber-400" />}
                                        </div>
                                    </div>
                                    <div className="p-10 flex-grow">
                                        <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors uppercase">{b.name}</h3>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3 italic opacity-80">{b.description}</p>

                                        <div className="space-y-4 pt-6 border-t border-slate-50">
                                            <div className="flex items-center gap-4 text-slate-600">
                                                <MapPinIcon className="h-5 w-5 text-blue-500" />
                                                <span className="text-xs font-bold uppercase tracking-tight">{b.address}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-600">
                                                <PhoneIcon className="h-5 w-5 text-blue-500" />
                                                <span className="text-xs font-black tracking-tighter">{b.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-600">
                                                <ClockIcon className="h-5 w-5 text-blue-500" />
                                                <span className="text-xs font-bold uppercase tracking-tight">{b.workingHours}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {b.website && (
                                        <a href={b.website} target="_blank" rel="noreferrer" className="block w-full py-6 bg-slate-50 hover:bg-slate-900 hover:text-white text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                            Web Sitesini Ziyaret Et
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
