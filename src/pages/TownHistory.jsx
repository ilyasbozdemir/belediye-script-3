import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    AcademicCapIcon,
    MapPinIcon,
    GlobeAltIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function TownHistory() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Beldemizin Tarihçesi | Güneyyurt Belediyesi" description="Güneyyurt'un antik dönemden günümüze uzanan tarihi, kültürel mirası ve kuruluşu." />

            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1541810232773-6784534346bb?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="History BG" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <span className="inline-block px-6 py-2 bg-blue-600/20 border border-blue-400/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Asırlık Miras</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase italic">Zamanın İzinde <br /> <span className="text-blue-600 text-6xl md:text-[100px]">Güneyyurt</span></h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 -mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl border border-slate-50">
                            <h2 className="text-3xl font-black text-slate-900 mb-10 border-l-8 border-blue-600 pl-8 uppercase tracking-tighter">Gargara'dan Güneyyurt'a</h2>
                            <div className="prose prose-xl prose-slate font-medium text-slate-600 leading-[2] space-y-8">
                                <p>
                                    Güneyyurt, tarihin tozlu sayfalarında "Gargara" adıyla anılan, Orta Toroslar'ın en kadim yerleşim merkezlerinden biridir. Bölge, Antik Çağlar'dan bu yana stratejik konumu ve bol su kaynakları nedeniyle pek çok medeniyete ev sahipliği yapmıştır.
                                </p>
                                <p>
                                    İkizin Kaya Mezarları ve çevresinde bulunan arkeolojik kalıntılar, beldemizin Hititler, Frigler ve ardından Roma İmparatorluğu döneminde canlı bir yerleşim alanı olduğunu kanıtlamaktadır. 12. yüzyıldan itibaren Türk boylarının yerleşmesiyle bölge, bugünkü kültürel kimliğinin temellerini atmıştır.
                                </p>
                                <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 flex gap-6 items-center">
                                    <SparklesIcon className="h-12 w-12 text-blue-600 shrink-0" />
                                    <p className="text-sm font-bold text-blue-900 uppercase tracking-widest leading-relaxed">Güneyyurt, 1954 yılında Belediye statüsüne kavuşarak yerel yönetim sürecini başlatmıştır.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 h-40 w-40 bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                            <h3 className="text-2xl font-black mb-10 border-b border-white/10 pb-6 uppercase italic">Tarihsel Dönemeçler</h3>
                            <div className="space-y-12">
                                <div className="relative pl-12 border-l-2 border-white/10 pb-4">
                                    <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-blue-600 shadow-[0_0_20px_#2563eb]" />
                                    <span className="text-blue-400 font-black text-xs block mb-2 tracking-widest">M.Ö. 1200</span>
                                    <h4 className="text-xl font-bold mb-3">Antik Gargara Dönemi</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Hitit ve Frig etkilerinin görüldüğü, kale ve yerleşim alanlarının kurulduğu dönem.</p>
                                </div>
                                <div className="relative pl-12 border-l-2 border-white/10 pb-4">
                                    <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-blue-600" />
                                    <span className="text-blue-400 font-black text-xs block mb-2 tracking-widest">1256</span>
                                    <h4 className="text-xl font-bold mb-3">Karamanoğulları Hakimiyeti</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Bölgenin tam anlamıyla Türk-İslam kimliğine büründüğü, ilk cami ve medreselerin inşa edildiği çağ.</p>
                                </div>
                                <div className="relative pl-12 border-l-2 border-white/10">
                                    <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-emerald-500" />
                                    <span className="text-emerald-400 font-black text-xs block mb-2 tracking-widest">1954 - GÜNÜMÜZ</span>
                                    <h4 className="text-xl font-bold mb-3">Cumhuriyet ve Belediyeleşme</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Modern Güneyyurtun inşası, altyapı seferberliği ve tarımsal kalkınma dönemi.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <AcademicCapIcon className="h-8 w-8" />
                                </div>
                                <p className="font-black text-slate-900 uppercase tracking-tight">Kültürel Arşiv Listesi</p>
                            </div>
                            <GlobeAltIcon className="h-6 w-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
