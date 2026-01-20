import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    BuildingStorefrontIcon,
    MapPinIcon,
    PhoneIcon,
    ClockIcon,
    StarIcon,
    KeyIcon
} from '@heroicons/react/24/outline';

const facilities = [
    {
        id: 1,
        name: 'Güneyyurt Sosyal Tesisleri & Restoran',
        type: 'Restoran / Kafe',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        desc: 'Eşsiz doğa manzarası eşliğinde, yöresel lezzetlerin sunulduğu beldemizin en gözde ağırlama noktası.',
        features: ['Geniş Park Alanı', 'Çocuk Oyun Alanı', 'Ücretsiz WiFi', 'Yöresel Kahvaltı'],
        hours: '08:00 - 22:00',
        phone: '0338 411 90 90'
    },
    {
        id: 2,
        name: 'Belediye Konukevi',
        type: 'Konaklama',
        img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        desc: 'Misafirleriniz için modern konforun ev sıcaklığı ile buluştuğu güvenli konaklama hizmeti.',
        features: ['24 Saat Resepsiyon', 'Sıcak Su', 'Merkezi Isıtma', 'Otopark'],
        hours: '7/24 Açık',
        phone: '0338 411 80 80'
    }
];

export default function SocialFacilities() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Sosyal Tesislerimiz | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi bünyesindeki restoran, konukevi ve diğer sosyal tesisler hakkında bilgiler." />

            {/* Header */}
            <div className="bg-emerald-600 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Sosyal Tesislerimiz</h1>
                    <div className="h-1.5 w-24 bg-white/20 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-emerald-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Halkımızın Keyifle Vakit Geçireceği Modern Alanlar.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10 space-y-16">
                {facilities.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-50 flex flex-col lg:flex-row group"
                    >
                        <div className="lg:w-2/5 relative h-80 lg:h-auto overflow-hidden">
                            <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.name} />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                            <div className="absolute top-8 left-8">
                                <span className="px-6 py-2 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                    {item.type}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 p-12 lg:p-20">
                            <h3 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight italic leading-tight">{item.name}</h3>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">{item.desc}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                                <div className="space-y-6">
                                    <h4 className="flex items-center gap-3 text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                        <StarIcon className="h-4 w-4 text-emerald-500" /> Tesis Özellikleri
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.features.map(f => (
                                            <span key={f} className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-100">{f}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="flex items-center gap-3 text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                        <ClockIcon className="h-4 w-4 text-emerald-500" /> Hizmet Saatleri
                                    </h4>
                                    <p className="text-2xl font-black text-slate-900 italic tracking-tighter">{item.hours}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 pt-12 border-t border-slate-50">
                                <a href={`tel:${item.phone}`} className="h-20 px-12 bg-slate-900 hover:bg-black rounded-3xl text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all">
                                    <PhoneIcon className="h-6 w-6" /> {item.phone}
                                </a>
                                <button className="h-20 px-12 bg-white border-4 border-slate-100 hover:border-emerald-500 rounded-3xl text-slate-900 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all">
                                    <MapPinIcon className="h-6 w-6 text-emerald-500" /> Konumu Gör
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Footer Info */}
                <div className="p-16 bg-slate-900 rounded-[4rem] text-center text-white shadow-2xl">
                    <KeyIcon className="h-16 w-16 text-emerald-500 mx-auto mb-8 animate-bounce" />
                    <h4 className="text-3xl font-black mb-6 uppercase tracking-tight italic">Kurumsal Rezervasyon</h4>
                    <p className="text-slate-400 font-bold max-w-2xl mx-auto mb-10 text-[10px] uppercase tracking-[0.2em] leading-loose opacity-70">Toplantı, düğün ve özel organizasyonlarınız için tesislerimizi önceden rezerve edebilirsiniz.</p>
                    <button className="px-16 py-6 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all">Online Rezervasyon Formu</button>
                </div>
            </div>
        </div>
    );
}
