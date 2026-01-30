import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    BuildingLibraryIcon,
    ScaleIcon,
    CalendarDaysIcon,
    ArchiveBoxIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';

const decisions = [
    { no: '2024/45', date: '2024-03-19', title: 'İmar Affı ve Yapı Kontrol Kararları', group: 'Encümen' },
    { no: '2024/44', date: '2024-03-19', title: 'Pazar Yeri İşgal Harçları Düzenlemesi', group: 'Encümen' },
    { no: '2024/43', date: '2024-03-12', title: 'Sosyal Yardım Taleplerinin Değerlendirilmesi', group: 'Encümen' },
    { no: '2024/42', date: '2024-03-12', title: 'Sokak İsimlendirme ve Numarataj Çalışmaları', group: 'Encümen' },
    { no: '2024/41', date: '2024-03-05', title: 'Hizmet Aracı Yakıt Alım İhalesi Onayı', group: 'Encümen' }
];

export default function CommitteeDecisions() {
    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? "-" : d.toLocaleDateString('tr-TR');
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Encümen Kararları | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi haftalık encümen toplantı kararları ve arşiv kayıtları." />

            <div className="bg-blue-600 pt-52 lg:pt-64 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="h-20 w-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 border border-white/20">
                        <ScaleIcon className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Encümen Kararları</h1>
                    <div className="h-1.5 w-24 bg-white/20 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-blue-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Haftalık Düzenli Toplantı Tutanakları.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-5xl px-6 -mt-24 relative z-10">
                <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
                    <div className="p-12 lg:p-16 border-b border-slate-50 bg-slate-50/50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Son Kararlar</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Mart 2024 Dönemi</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-white border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all">Arşivde Ara</button>
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20">Tümünü İndir</button>
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {decisions.map((decision, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-10 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:bg-slate-50 transition-all"
                            >
                                <div className="flex items-center gap-8">
                                    <div className="text-center shrink-0">
                                        <p className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-none">{decision.no.split('/')[1]}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">KARAR NO</p>
                                    </div>
                                    <div className="h-12 w-px bg-slate-100 hidden md:block" />
                                    <div className="text-center shrink-0 hidden sm:block">
                                        <p className="text-xl font-black text-slate-600 leading-none">{(1000 + i)}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">DOSYA NO</p>
                                    </div>
                                    <div className="h-12 w-px bg-slate-100 hidden md:block" />
                                    <div>
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <CheckBadgeIcon className="h-3 w-3" /> {decision.group} Kararı
                                        </p>
                                        <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight leading-tight mb-3">
                                            {decision.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-slate-400">
                                            <CalendarDaysIcon className="h-4 w-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{formatDate(decision.date)}</span>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={`/kararlar/${decision.no.replace('/', '-')}.pdf`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="md:h-14 md:w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm"
                                    title="Yeni Sekmede Görüntüle"
                                >
                                    <ArchiveBoxIcon className="h-6 w-6" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-20 p-16 bg-slate-900 rounded-[4rem] text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/4 bg-blue-600/10 skew-x-12 -translate-x-10" />
                    <BuildingLibraryIcon className="h-16 w-16 text-blue-500 mx-auto mb-8 animate-pulse" />
                    <h4 className="text-3xl font-black mb-6 uppercase tracking-tight italic">Şeffaflık Taahhüdü</h4>
                    <p className="text-slate-400 font-bold max-w-2xl mx-auto mb-10 text-[10px] border-t border-white/5 pt-10 uppercase tracking-[0.2em] leading-loose opacity-70">
                        Güneyyurt Belediyesi Encümeni her Salı günü beldemizin geleceği için toplanır. Alınan tüm kararlar kişisel verilerin korunması kanunu çerçevesinde halkımızla paylaşılmaktadır.
                    </p>
                    <div className="flex justify-center gap-4">
                        <div className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">Her Salı: 10:00</div>
                        <div className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">Halka Açık Tutanaklar</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
