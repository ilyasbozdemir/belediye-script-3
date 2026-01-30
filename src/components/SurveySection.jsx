import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function SurveySection() {
    const [voted, setVoted] = useState(false);
    const [selected, setSelected] = useState(null);

    const options = [
        { id: 1, label: 'Yeni Rekreasyon Alanları', percentage: 42 },
        { id: 2, label: 'Dijital Hizmetlerin Artırılması', percentage: 28 },
        { id: 3, label: 'Kültürel ve Sanat Aktiviteleri', percentage: 18 },
        { id: 4, label: 'Tarımsal Destek Programları', percentage: 12 },
    ];

    const handleVote = (id) => {
        setSelected(id);
        setVoted(true);
    };

    return (
        <section className="py-32 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">

                    <div className="lg:w-1/2">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] block mb-6">ANKET MASASI</span>
                        <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight mb-10">
                            Geleceği <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Birlikte Seçelim</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-medium leading-[2] mb-12 italic opacity-80">
                            Güneyyurt Belediyesi olarak öncelikli projelerimizi siz belirliyoruz. Bu ay hangi hizmete daha fazla yatırım yapalım?
                        </p>
                        <div className="flex items-center gap-6 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                            <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                                <ChartBarIcon className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Katılımcı Sayısı</p>
                                <p className="text-2xl font-black text-slate-900 tracking-tight italic">1,452 Hemşehrimiz Oy Kullandı</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className={`bg-slate-900 p-8 lg:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden transition-all duration-700 ${voted ? 'border-4 border-blue-600/30' : 'border border-white/5'}`}>
                            <div className="absolute top-0 right-0 h-64 w-64 bg-blue-600/10 blur-[100px] pointer-events-none" />

                            <AnimatePresence mode="wait">
                                {!voted ? (
                                    <motion.div
                                        key="poll"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-4"
                                    >
                                        <h4 className="text-white text-xl font-black mb-10 uppercase italic tracking-widest text-center">Öncelikli Yatırım Alanı?</h4>
                                        {options.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleVote(opt.id)}
                                                className="w-full group relative flex items-center justify-between p-6 bg-white/5 hover:bg-blue-600 border border-white/5 hover:border-blue-400 rounded-3xl transition-all duration-300 text-left"
                                            >
                                                <span className="text-white font-bold group-hover:translate-x-2 transition-transform">{opt.label}</span>
                                                <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                                                    <CheckCircleIcon className="h-5 w-5 opacity-0 group-hover:opacity-100" />
                                                </div>
                                            </button>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center mb-10">
                                            <div className="h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-emerald-500/20">
                                                <CheckCircleIcon className="h-10 w-10" />
                                            </div>
                                            <h4 className="text-white text-2xl font-black uppercase italic">Teşekkürler!</h4>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Oyunuz başarıyla kaydedildi.</p>
                                        </div>

                                        <div className="space-y-6">
                                            {options.map((opt) => (
                                                <div key={opt.id} className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                        <span className={selected === opt.id ? 'text-blue-400' : 'text-slate-400'}>{opt.label} {selected === opt.id && '(Senin Tercihin)'}</span>
                                                        <span className="text-white">%{opt.percentage}</span>
                                                    </div>
                                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${opt.percentage}%` }}
                                                            transition={{ duration: 1, delay: 0.2 }}
                                                            className={`h-full rounded-full ${selected === opt.id ? 'bg-blue-600' : 'bg-slate-700'}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setVoted(false)}
                                            className="w-full py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-white transition-colors"
                                        >
                                            Yeni Ankete Göz At
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
