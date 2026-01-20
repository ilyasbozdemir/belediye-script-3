import { useState } from 'react';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, UserIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const neighborhoods = [
    { id: 1, name: 'Merkez Mahallesi', warden: 'Hikmet Özkoca', phone: '0338 736 80 04' },
    { id: 2, name: 'Cumhuriyet Mahallesi', warden: 'Hasan Yirik', phone: '0338 736 80 04' },
    { id: 3, name: 'Yenimahalle', warden: 'Hacı Kaya', phone: '0338 736 80 04' },
    { id: 4, name: 'Pınargözü Mahallesi', warden: 'Özcan Uçar', phone: '0338 736 80 04' },
    { id: 5, name: 'Kışlacık Mahallesi', warden: 'Ali Akça', phone: '0338 736 80 04' },
    { id: 6, name: 'Aralık Mahallesi', warden: 'Mustafa Tezcan', phone: '0338 736 80 04' },
];

export default function Muhtarliklar() {
    const [visiblePhones, setVisiblePhones] = useState({});

    const togglePhone = (id) => {
        setVisiblePhones(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Muhtarlıklar | Güneyyurt Belediyesi" description="Güneyyurt mahalle muhtarları ve iletişim bilgileri." />

            <div className="bg-slate-900 pt-32 pb-64 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Muhtarlıklarımız</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-300 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Halkımızın sesi, mahallelerimizin temsilcileri.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {neighborhoods.map((n, idx) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-blue-500 transition-all duration-300 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <MapPinIcon className="h-24 w-24 text-blue-600" />
                            </div>

                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-50 relative z-10">
                                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <MapPinIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 leading-tight uppercase italic truncate max-w-[150px]">{n.name}</h3>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mahalle Birimi</span>
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Muhtar</p>
                                        <p className="font-bold text-slate-900">{n.warden}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] group/phone">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400">
                                            <PhoneIcon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">İletişim</p>
                                            <p className="font-black text-slate-900 tracking-tighter">
                                                {visiblePhones[n.id] ? n.phone : '0338 *** ** **'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => togglePhone(n.id)}
                                        className="h-10 w-10 flex items-center justify-center bg-white rounded-xl text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all"
                                    >
                                        {visiblePhones[n.id] ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-5 bg-slate-900 group-hover:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 group-hover:shadow-blue-600/20">Konumu Görüntüle</button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

