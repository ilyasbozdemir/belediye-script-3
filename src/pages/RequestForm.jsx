import { useState } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
    WrenchScrewdriverIcon,
    TrashIcon,
    SunIcon,
    LightBulbIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ClockIcon,
    CommandLineIcon
} from '@heroicons/react/24/outline';

const categories = [
    { id: 'temizlik', name: 'Çevre & Temizlik', icon: TrashIcon, options: ['Çöp Toplama Talebi', 'Konteyner Tamiri', 'Moloz Atımı', 'İlaçlama Talebi'] },
    { id: 'altyapi', name: 'Fen İşleri / Altyapı', icon: WrenchScrewdriverIcon, options: ['Yol Bakım Onarım', 'Kaldırım Tamiri', 'Logar Problemi', 'İstinat Duvarı'] },
    { id: 'aydinlatma', name: 'Park & Aydınlatma', icon: LightBulbIcon, options: ['Park Bakımı', 'Aydınlatma Arızası', 'Ağaç Budama', 'Oyun Grubu Tamiri'] },
    { id: 'su', name: 'Su & Kanalizasyon', icon: SunIcon, options: ['Su Patlağı', 'Kanal Tıkanıklığı', 'Sayaç Arızası', 'Abone İşlemleri'] }
];

export default function RequestForm() {
    const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', category: categories[0].name, subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [trackCode, setTrackCode] = useState('');
    const [queryCode, setQueryCode] = useState('');
    const [queryResult, setQueryResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/feedback/submit', formData);
            setTrackCode(res.data.trackingCode);
            setSubmitted(true);
            setLoading(false);
        } catch (err) {
            alert('Gönderim sırasında bir hata oluştu.');
            setLoading(false);
        }
    };

    const handleTrack = async () => {
        if (!queryCode) return;
        setLoading(true);
        try {
            const res = await axios.get(`/api/feedback/track/${queryCode}`);
            setQueryResult(res.data);
            setLoading(false);
        } catch (err) {
            setQueryResult({ error: 'Başvuru bulunamadı.' });
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Hizmet Masası & İstek Hattı | Güneyyurt Belediyesi" description="Beldemiz için istek, öneri ve şikayetlerinizi iletebileceğiniz online hizmet masası." />

            <div className="bg-emerald-600 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="h-20 w-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 border border-white/20">
                        <ChatBubbleLeftRightIcon className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Hizmet Masası</h1>
                    <div className="h-1.5 w-24 bg-white/20 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-emerald-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Çözüm Odaklı Belediyecilik, Hızlı Müdahale.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 -mt-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Form Section */}
                    <div className="flex-grow lg:w-2/3">
                        <div className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl border border-slate-50 min-h-[600px]">
                            <AnimatePresence mode='wait'>
                                {!submitted ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase italic tracking-tighter">Yeni Başvuru Oluştur</h2>

                                        <form onSubmit={handleSubmit} className="space-y-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div>
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Adınız Soyadınız</label>
                                                    <input required type="text" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 font-bold" placeholder="Örn: Ahmet Yılmaz"
                                                        value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Telefon Numaranız</label>
                                                    <input required type="tel" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 font-bold" placeholder="05XX XXX XX XX"
                                                        value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div>
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Hizmet Kategorisi</label>
                                                    <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 font-bold appearance-none"
                                                        value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Konu</label>
                                                    <input required type="text" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 font-bold" placeholder="Kısaca belirtiniz"
                                                        value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Mesajınız / Talebiniz</label>
                                                <textarea required rows="5" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 font-bold" placeholder="Lütfen detaylı bilgi veriniz..."
                                                    value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                                            </div>

                                            <button disabled={loading} className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-4">
                                                {loading ? 'Gönderiliyor...' : 'Talebi Gönder'} <CheckCircleIcon className="h-6 w-6" />
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-20"
                                    >
                                        <div className="h-24 w-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10">
                                            <CheckCircleIcon className="h-12 w-12" />
                                        </div>
                                        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">Başvurunuz Alındı!</h2>
                                        <p className="text-slate-500 font-medium mb-12 max-w-md mx-auto">Talebiniz ilgili birimlerimize iletilmiştir. Takip kodunuzu not almayı unutmayınız.</p>
                                        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 mb-12">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">TAKİP NUMARANIZ</p>
                                            <p className="text-5xl font-black text-emerald-600 tracking-tighter uppercase italic">{trackCode}</p>
                                        </div>
                                        <button onClick={() => setSubmitted(false)} className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors">YENİ BAŞVURU OLUŞTUR</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="lg:w-1/3 space-y-8">
                        <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden h-fit">
                            <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/10 blur-3xl opacity-50" />
                            <h3 className="text-2xl font-black mb-6 uppercase tracking-tight italic">Başvuru Sorgula</h3>
                            <p className="text-slate-400 font-medium mb-10 text-sm">Takip numaranız ile talebinizin durumunu sorgulayın.</p>
                            <div className="space-y-4 mb-8">
                                <input type="text" placeholder="Örn: 8A2B3C" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-slate-700 outline-none focus:border-emerald-500 transition-colors"
                                    value={queryCode} onChange={e => setQueryCode(e.target.value.toUpperCase())} />
                                <button onClick={handleTrack} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Sorgula</button>
                            </div>

                            <AnimatePresence>
                                {queryResult && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-6 rounded-2xl border ${queryResult.error ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10'}`}
                                    >
                                        {queryResult.error ? (
                                            <p className="text-sm font-bold text-center">{queryResult.error}</p>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black uppercase text-slate-500">Durum</span>
                                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${queryResult.status === 'Beklemede' ? 'bg-amber-500 text-white' :
                                                        queryResult.status === 'İnceleniyor' ? 'bg-blue-500 text-white' :
                                                            'bg-emerald-500 text-white'
                                                        }`}>{queryResult.status}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black uppercase text-slate-500">Konu</span>
                                                    <span className="text-xs font-bold text-white truncate max-w-[120px]">{queryResult.subject}</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-2 border-t border-white/5">{new Date(queryResult.createdDate).toLocaleDateString('tr-TR')}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                            <h4 className="flex items-center gap-3 text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-slate-50">
                                <ExclamationCircleIcon className="h-5 w-5 text-emerald-500" /> Önemli Bilgi
                            </h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4 text-sm font-medium text-slate-500">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                    Talepleriniz ilgili birimimize anında iletilir.
                                </li>
                                <li className="flex gap-4 text-sm font-medium text-slate-500">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                    Genellikle 24-48 saat içerisinde değerlendirme yapılır.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
