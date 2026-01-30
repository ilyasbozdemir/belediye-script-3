import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';

export default function FormerPresidents() {
    const [presidents, setPresidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated fetch
        const mockPresidents = [
            { id: 1, name: 'Celil Yağız', term: '2014 - 2019', bio: 'Güneyyurtun modernleşme sürecinde önemli altyapı projelerine imza atmıştır.', imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400' },
            { id: 2, name: 'Sükrü Özdemir', term: '2004 - 2014', bio: 'İki dönem üst üste hizmet vererek beldemizin sosyal tesisleşmesine katkı sağlamıştır.', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
            { id: 3, name: 'Saffet Arı', term: '1999 - 2004', bio: 'Güneyyurtun kurumsal kimliğinin güçlendirilmesi çalışmalarını yürütmüştür.', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' }
        ];
        setPresidents(mockPresidents);
        setLoading(false);
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Eski Belediye Başkanlarımız | Güneyyurt Belediyesi" description="Güneyyurt'a geçmişte hizmet vermiş belediye başkanlarımız." />

            <div className="bg-slate-900 pt-64 lg:pt-72 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">{/* Changed to italic to match other premium pages */} Eski Başkanlarımız</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80 leading-relaxed">Güneyyurt'a emek vermiş, şehrimizin gelişimine katkı sağlamış değerli başkanlarımız.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24">
                {loading ? (
                    <div className="text-center py-40">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Veriler Alınıyor...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {presidents.length === 0 && (
                            <div className="col-span-full py-24 text-center bg-white rounded-[3rem] shadow-sm border border-slate-100">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs opacity-50">Kayıtlı başkan bilgisi bulunamadı.</p>
                            </div>
                        )}
                        {presidents.map((p, idx) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500"
                            >
                                <div className="h-48 w-48 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                                    <img
                                        src={p.imageUrl || 'https://images.unsplash.com/photo-1541810232773-6784534346bb?auto=format&fit=crop&q=80&w=400'}
                                        alt={p.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{p.name}</h3>
                                <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-6">{p.term}</p>
                                <p className="text-slate-500 font-medium leading-relaxed text-sm line-clamp-4 italic">
                                    "{p.bio || 'İlçemize hizmetleri için teşekkür ederiz.'}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
