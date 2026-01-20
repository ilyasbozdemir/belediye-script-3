import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    CalendarDaysIcon,
    MapPinIcon,
    ClockIcon,
    TagIcon
} from '@heroicons/react/24/outline';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultEvents = [
        { id: 1, title: 'Güneyyurt Kültür Festivali', description: 'Geleneksel lezzetler ve yöresel sanatçıların katılımıyla gerçekleşecek olan festivalimize tüm halkımız davetlidir.', startDate: new Date(Date.now() + 86400000 * 5).toISOString(), location: 'Belediye Meydanı', type: 'Festival', imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800' },
        { id: 2, title: 'Yaylada Sinema Gecesi', description: 'Yıldızlar altında, açık havada sinema keyfi. Çocuklar ve yetişkinler için özel gösterimler.', startDate: new Date(Date.now() + 86400000 * 10).toISOString(), location: 'Kuşakpınar Mevkii', type: 'Sosyal', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800' },
        { id: 3, title: 'Doğa Yürüyüşü Etkinliği', description: 'Torosların eteklerinde, rehber eşliğinde doğa ve tarih yürüyüşü gerçekleştirilecektir.', startDate: new Date(Date.now() + 86400000 * 15).toISOString(), location: 'Toroslar Gezi Parkuru', type: 'Doğa', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800' }
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('/api/events');
                if (res.data.length > 0) setEvents(res.data);
                else setEvents(defaultEvents);
            } catch (err) {
                console.error('Failed to fetch events');
                setEvents(defaultEvents);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": events.map((ev, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "Event",
                "name": ev.title,
                "description": ev.description,
                "startDate": ev.startDate,
                "location": {
                    "@type": "Place",
                    "name": ev.location,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": ev.location,
                        "addressLocality": "Güneyyurt",
                        "addressRegion": "Karaman",
                        "addressCountry": "TR"
                    }
                },
                "image": ev.imageUrl
            }
        }))
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo
                title="Etkinlik Takvimi | Güneyyurt Belediyesi"
                description="Beldemizdeki kültürel, sanatsal ve spor etkinliklerini buradan takip edebilirsiniz."
                jsonLd={jsonLd}
            />

            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="h-20 w-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 border border-white/20 backdrop-blur-md">
                        <CalendarDaysIcon className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Etkinlik Takvimi</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Güneyyurt'ta Hayat Var, Sosyal Belediyecilik Her Yerde.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 -mt-24 relative z-10">
                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map((ev, i) => (
                            <motion.div
                                key={ev.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={ev.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'}
                                        alt={ev.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-lg">
                                            {ev.type || 'Kültür'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10">
                                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                                        <CalendarDaysIcon className="h-4 w-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {new Date(ev.startDate).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-6 italic tracking-tight uppercase leading-none group-hover:text-blue-600 transition-colors">
                                        {ev.title}
                                    </h3>
                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                                            <MapPinIcon className="h-5 w-5 text-slate-300" />
                                            {ev.location}
                                        </div>
                                    </div>
                                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 text-sm">
                                        {ev.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                        {events.length === 0 && (
                            <div className="col-span-full bg-white p-20 rounded-[4rem] text-center border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Şu an yayınlanmış bir etkinlik bulunmamaktadır.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
