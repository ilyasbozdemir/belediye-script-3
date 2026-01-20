import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Contact() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="İletişim | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi iletişim bilgileri, ulaşım haritası ve bize ulaşın." />

            {/* Hero Header */}
            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Bize Ulaşın</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Size bir telefon kadar yakınız.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Card 1: Address */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center"
                    >
                        <div className="h-20 w-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 mb-8">
                            <MapPinIcon className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Adresimiz</h3>
                        <p className="text-slate-500 font-bold leading-relaxed">
                            Belediye Cd. No:1, 70410 <br />
                            Güneyyurt, Ermenek / Karaman
                        </p>
                    </motion.div>

                    {/* Card 2: Phone */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center"
                    >
                        <div className="h-20 w-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-8">
                            <PhoneIcon className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">İletişim Hattı</h3>
                        <p className="text-slate-500 font-bold leading-relaxed">
                            +90 338 736 80 04 <br />
                            info@guneyyurt.bel.tr
                        </p>
                    </motion.div>

                    {/* Card 3: Hours */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center"
                    >
                        <div className="h-20 w-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-600 mb-8">
                            <ClockIcon className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Mesai Saatleri</h3>
                        <p className="text-slate-500 font-bold leading-relaxed">
                            Hafta içi: 08:30 - 17:30 <br />
                            Hafta sonu: Kapalı
                        </p>
                    </motion.div>

                </div>

                {/* Form and Map Split */}
                <div className="mt-20 flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2 bg-white rounded-[4rem] p-12 lg:p-20 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center gap-4 mb-10">
                            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">İletişim Formu</h2>
                        </div>

                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Adınız Soyadınız</label>
                                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/10 font-bold" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">E-Posta Adresiniz</label>
                                    <input type="email" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/10 font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Mesajınız</label>
                                <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-600/10 font-bold resize-none"></textarea>
                            </div>
                            <button type="submit" className="btn-premium w-full py-5">Mesajı Gönder</button>
                        </form>
                    </div>

                    <div className="lg:w-1/2 h-[600px] lg:h-auto overflow-hidden rounded-[4rem] shadow-xl border border-slate-100 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12764.444265538!2d32.7481!3d36.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d0f73f55555555%3A0x1234567890abcdef!2zR8bmV5eXVydCBCZWxlZGl5ZXNp!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '600px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Güneyyurt Belediyesi Konumu"
                            className="grayscale hover:grayscale-0 transition-all duration-1000"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
