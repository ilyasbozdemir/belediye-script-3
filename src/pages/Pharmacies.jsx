import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    BuildingStorefrontIcon,
    MapPinIcon,
    PhoneIcon,
    ClockIcon,
    LifebuoyIcon
} from '@heroicons/react/24/outline';

const dummyPharmacies = [
    {
        id: 1,
        name: 'GÜNEYYURT ECZANESİ',
        address: 'Belediye Cd. No:1/A, Güneyyurt',
        phone: '0338 736 80 15',
        until: '08:30 (Yarın Sabah)',
        onDuty: true
    },
    {
        id: 2,
        name: 'ŞİFA ECZANESİ',
        address: 'Merkez Mah. No:14, Ermenek',
        phone: '0338 716 11 11',
        until: '18:30',
        onDuty: false
    },
    {
        id: 3,
        name: 'ERMENEK ECZANESİ',
        address: 'Cumhuriyet Cad. No:5, Ermenek',
        phone: '0338 716 10 20',
        until: '18:30',
        onDuty: false
    },
    {
        id: 4,
        name: 'DÜNÜRÜ ECZANESİ',
        address: 'Meydan Parkı Karşısı, Başyayla/Ermenek',
        phone: '0338 716 22 33',
        until: '18:30',
        onDuty: false
    }
];

export default function Pharmacies() {
    const [pharmacies, setPharmacies] = useState(dummyPharmacies);

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Nöbetçi Eczaneler | Güneyyurt Belediyesi" description="Güneyyurt genelindeki güncel nöbetçi eczane listesi, adres ve iletişim bilgileri." />

            {/* Header Section */}
            <div className="bg-red-600 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Nöbetçi Eczaneler</h1>
                    <div className="h-1.5 w-24 bg-white/20 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-red-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Sağlığınız İçin 7/24 Kesintisiz Hizmet Noktaları.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-5xl px-6 lg:px-8 -mt-24 relative z-10">
                <div className="space-y-8">
                    {pharmacies.map((pharmacy, idx) => (
                        <motion.div
                            key={pharmacy.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-white p-12 lg:p-16 rounded-[4rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row items-center gap-12 group transition-all duration-500 ${pharmacy.onDuty ? 'ring-4 ring-red-100 border-red-200' : ''}`}
                        >
                            <div className={`h-28 w-28 rounded-4xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500 ${pharmacy.onDuty ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-300'}`}>
                                <BuildingStorefrontIcon className="h-12 w-12" />
                            </div>

                            <div className="flex-grow text-center md:text-left">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">{pharmacy.name}</h3>
                                    {pharmacy.onDuty && (
                                        <span className="px-5 py-2 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                                            ŞUAN NÖBETÇİ
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                                    <div className="flex items-start gap-4">
                                        <MapPinIcon className="h-6 w-6 text-slate-300 shrink-0" />
                                        <p className="text-slate-500 font-bold leading-relaxed">{pharmacy.address}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <PhoneIcon className="h-6 w-6 text-slate-300 shrink-0" />
                                        <p className="text-slate-900 font-black text-xl italic">{pharmacy.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 w-full md:w-auto">
                                <button className="h-20 px-10 bg-slate-900 hover:bg-black rounded-3xl text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all">
                                    <MapPinIcon className="h-5 w-5" /> Yol Tarifi Al
                                </button>
                                <a href={`tel:${pharmacy.phone}`} className="h-20 px-10 bg-red-600 hover:bg-red-700 shadow-xl shadow-red-600/20 rounded-3xl text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all">
                                    <PhoneIcon className="h-5 w-5" /> Hemen Ara
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Emergency Contacts Section */}
                <div className="mt-32 p-16 bg-slate-900 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                    <div className="flex items-center gap-10 flex-col lg:flex-row">
                        <div className="h-24 w-24 bg-red-600/10 rounded-[2.5rem] flex items-center justify-center text-red-500 shadow-2xl shrink-0">
                            <LifebuoyIcon className="h-12 w-12" />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black text-white tracking-tight uppercase italic mb-2">Acil Durum Hattı</h4>
                            <p className="text-slate-400 font-bold max-w-xl uppercase tracking-widest text-xs opacity-80 leading-loose">Her türlü sağlık aciliyetinde 112 Acil Servis ve belediye beyaz masa hattımız hizmetinizdedir.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 shrink-0">
                        <div className="px-10 py-5 bg-white rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">112 ACİL</div>
                        <div className="px-10 py-5 bg-slate-800 rounded-full text-[10px] font-black text-white uppercase tracking-widest">153 BEYAZ MASA</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
