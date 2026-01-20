import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    CheckCircleIcon,
    ClockIcon,
    DocumentTextIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const standards = [
    {
        id: 1,
        service: 'Ruhsat Başvuruları',
        unit: 'İmar ve Şehircilik',
        duration: '15 İş Günü',
        docs: ['Başvuru Dilekçesi', 'Tapu Kaydı', 'Mimari Proje', 'İlgili Harç Dekontu'],
        icon: DocumentTextIcon
    },
    {
        id: 2,
        service: 'Sosyal Yardım Talebi',
        unit: 'Kültür ve Sosyal İşler',
        duration: '7 İş Günü',
        docs: ['İkametgah', 'Gelir Durum Belgesi', 'Nüfus Kayıt Örneği'],
        icon: HeartIcon
    },
    {
        id: 3,
        service: 'Nikah Başvurusu',
        unit: 'Yazı İşleri (Evlendirme)',
        duration: '1 İş Günü (Randevu Planlama)',
        docs: ['Sağlık Raporu', 'Nüfus Cüzdanı Fotokopisi', '5 Adet Vesikalık Fotoğraf'],
        icon: CheckCircleIcon
    },
    {
        id: 4,
        service: 'Altyapı Arıza Bildirimi',
        unit: 'Fen İşleri',
        duration: '24 Saat İçinde Müdahale',
        docs: ['Telefon veya Web Formu ile Bildirim'],
        icon: ClockIcon
    },
];

function HeartIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
    );
}

export default function ServiceStandards() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Hizmet Standartları | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi tarafından sunulan hizmetlerin tamamlama süreleri ve gerekli belgeler." />

            <div className="bg-emerald-600 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Hizmet Standartları</h1>
                    <div className="h-1.5 w-24 bg-white/20 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-emerald-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Şeffaf, ölçülebilir ve sonuç odaklı hizmet anlayışımız.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {standards.map((s, idx) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[3rem] p-12 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col h-full group hover:border-emerald-500 transition-all duration-500"
                        >
                            <div className="flex items-start justify-between mb-8 pb-8 border-b border-slate-50">
                                <div className="flex items-center gap-6">
                                    <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                        <s.icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">{s.service}</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.unit}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-2">Hedef Süre</span>
                                    <p className="font-black text-slate-900 text-lg tracking-tight italic">{s.duration}</p>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block">Gerekli Belgeler</p>
                                <ul className="space-y-4">
                                    {s.docs.map((doc, i) => (
                                        <li key={i} className="flex items-center gap-4 text-slate-600 font-bold group/item">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover/item:scale-150 transition-transform" />
                                            {doc}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-50">
                                <button className="w-full py-4 bg-slate-900 hover:bg-black rounded-2xl text-[10px] font-black text-white uppercase tracking-widest transition-all">Süreci Başlat / Online Başvuru</button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col lg:flex-row items-center justify-between p-12 bg-white rounded-[4rem] border border-slate-100 shadow-sm gap-12">
                    <div className="flex items-center gap-8 text-center lg:text-left flex-col lg:flex-row">
                        <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0 shadow-inner">
                            <ShieldCheckIcon className="h-12 w-12" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">Vatandaş Odaklı Güvence</h4>
                            <p className="text-slate-500 font-bold mt-2">Hizmet sürelerinde yaşanabilecek gecikmeleri denetliyoruz. Geciken her işlem için doğrudan beyaz masaya başvurabilirsiniz.</p>
                        </div>
                    </div>
                    <button className="px-12 py-5 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0">Yasal Mevzuatı İncele</button>
                </div>
            </div>
        </div>
    );
}
