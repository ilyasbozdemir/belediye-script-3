import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    ClipboardDocumentCheckIcon,
    ClockIcon,
    CalendarDaysIcon,
    ArrowDownTrayIcon,
    TagIcon,
    GlobeAltIcon,
    ScaleIcon
} from '@heroicons/react/24/outline';

const tenders = [
    {
        id: 1,
        title: 'Kent Meydanı Düzenleme ve Restorasyon İşi',
        refNo: '2024/GNY-001',
        date: '2024-03-25',
        status: 'Açık',
        type: 'Yapım İşi',
        lawNo: '4734 Sayılı K.İ.K. 19. Madde',
        ilanGovTr: 'https://www.ilan.gov.tr/',
        ekapUrl: 'https://ekap.kik.gov.tr/',
        desc: 'Güneyyurt merkez meydanının modern peyzaj kriterlerine göre yeniden düzenlenmesi ve tarihi dokunun korunması projesi.'
    },
    {
        id: 2,
        title: 'Sosyal Tesisler İçin Mutfak Ekipmanı Alımı',
        refNo: '2024/GNY-002',
        date: '2024-04-10',
        status: 'Yeni',
        type: 'Mal Alımı',
        lawNo: '4734 Sayılı K.İ.K. 21/f Maddesi',
        ilanGovTr: 'https://www.ilan.gov.tr/',
        ekapUrl: 'https://ekap.kik.gov.tr/',
        desc: 'Belediyemiz bünyesindeki sosyal tesislerin mutfak standartlarının yükseltilmesi için gerekli endüstriyel ekipman tedariği.'
    },
    {
        id: 3,
        title: 'Çöp Toplama Araçları Kiralama Hizmeti',
        refNo: '2024/GNY-003',
        date: '2024-03-15',
        status: 'Kapandı',
        type: 'Hizmet Alımı',
        lawNo: '4734 Sayılı K.İ.K. 19. Madde',
        ilanGovTr: 'https://www.ilan.gov.tr/',
        ekapUrl: 'https://ekap.kik.gov.tr/',
        desc: '12 ay süreyle beldemiz genelinde kullanılmak üzere 3 adet hidrolik sıkıştırmalı çöp kamyonu kiralama işi.'
    },
];

export default function Tenders() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="İhale Duyuruları | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi güncel ihale ilanları, teknik şartnameler ve ihale sonuçları." />

            <div className="bg-slate-900 pt-32 pb-64 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">İhale Portalı</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Şeffaf yönetim, adil rekabet ve kamu yararı.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-5xl px-6 lg:px-8 -mt-32 relative z-10 space-y-12">
                {tenders.map((tender, idx) => (
                    <motion.div
                        key={tender.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-10 lg:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100 group transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:bg-blue-600/5 transition-colors" />
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${tender.status === 'Açık' ? 'bg-emerald-500 text-white' :
                                        tender.status === 'Yeni' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                                        }`}>
                                        {tender.status}
                                    </span>
                                    <span className="px-6 py-2 bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100">
                                        {tender.type}
                                    </span>
                                    <span className="px-6 py-2 bg-amber-50 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-700 border border-amber-100 flex items-center gap-2">
                                        <ScaleIcon className="h-3 w-3" /> {tender.lawNo}
                                    </span>
                                </div>

                                <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors uppercase tracking-tight italic">
                                    {tender.title}
                                </h3>

                                <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg">
                                    {tender.desc}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-slate-50">
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            <CalendarDaysIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">İhale Tarihi</p>
                                            <p className="font-bold text-slate-900">{new Date(tender.date).toLocaleDateString('tr-TR')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                            <TagIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Kayıt No</p>
                                            <p className="font-bold text-slate-900">{tender.refNo}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex lg:flex-col gap-4 w-full lg:w-auto">
                                <a href={tender.elanUrl || 'https://www.ilan.gov.tr/'} target="_blank" rel="noreferrer" className="flex-1 lg:w-56 h-16 bg-slate-900 hover:bg-black rounded-2xl flex items-center justify-center gap-3 text-white text-[10px] font-black uppercase tracking-widest transition-all">
                                    <GlobeAltIcon className="h-5 w-5" /> ilan.gov.tr
                                </a>
                                <a href={tender.ekapUrl || 'https://ekap.kik.gov.tr/'} target="_blank" rel="noreferrer" className="flex-1 lg:w-56 h-16 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 rounded-2xl flex items-center justify-center gap-3 text-white text-[10px] font-black uppercase tracking-widest transition-all">
                                    <ClipboardDocumentCheckIcon className="h-5 w-5" /> EKAP Bülten
                                </a>
                                <button className="flex-1 lg:w-56 h-16 bg-slate-100 hover:bg-slate-200 rounded-2xl flex items-center justify-center gap-3 text-slate-600 text-[10px] font-black uppercase tracking-widest transition-all">
                                    <ArrowDownTrayIcon className="h-5 w-5" /> Şartname İndir
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
