import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    MegaphoneIcon,
    CalendarDaysIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const dummyData = [
        { id: 1, title: 'Beldemizde Yeni Park Alanları Oluşturuluyor', content: 'Gelecek nesillere daha yeşil bir Güneyyurt bırakmak için park ve bahçeler müdürlüğümüz çalışmalarını hızlandırdı.', createdDate: new Date().toISOString(), category: 'Genel' },
        { id: 2, title: 'İnteraktif Vergi Dairesi Hizmete Girdi', content: 'Vatandaşlarımızın ödemelerini daha kolay yapabilmesi için GİB interaktif vergi dairesi sistemimiz entegre edilmiştir.', createdDate: new Date().toISOString(), category: 'Hizmet' },
        { id: 3, title: 'Geleneksel Batırık Günü Hazırlıkları', content: 'Yöresel lezzetimiz Batırık festivali için hazırlık toplantısı bu hafta sonu gerçekleştirilecektir.', createdDate: new Date().toISOString(), category: 'Kültür' }
    ];

    useEffect(() => {
        axios.get('/api/news?category=Duyuru')
            .then(res => {
                if (res.data.length > 0) setAnnouncements(res.data);
                else setAnnouncements(dummyData);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching announcements:', err);
                setAnnouncements(dummyData);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Duyurular | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi güncel duyurular, kesintiler ve resmi bilgilendirmeler." />

            {/* Header Section */}
            <div className="bg-amber-500 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Güncel Duyurular</h1>
                    <div className="h-1.5 w-24 bg-white/20 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-amber-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Güneyyurt'tan Haberiniz Olsun. Anlık Bilgilendirme Akışı.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-5xl px-6 lg:px-8 -mt-24 relative z-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-amber-600/20 border-t-amber-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Duyurular Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {announcements.length === 0 && (
                            <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Henüz aktif bir duyuru bulunmuyor.</p>
                            </div>
                        )}
                        {announcements.map((item, idx) => (
                            <Link key={item.id} to={`/duyuru/${item.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row gap-10 group hover:border-amber-500 transition-all duration-500 mb-6 cursor-pointer"
                                >
                                    <div className={`h-24 w-24 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500 bg-blue-50 text-blue-600`}>
                                        <InformationCircleIcon className="h-10 w-10" />
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex flex-wrap items-center gap-4 mb-6">
                                            <span className="px-5 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Duyuru
                                            </span>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <CalendarDaysIcon className="h-4 w-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{new Date(item.createdDate).toLocaleDateString('tr-TR')}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-amber-600 transition-colors uppercase tracking-tight italic leading-tight">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-500 font-medium leading-relaxed text-lg line-clamp-2">
                                            {item.summary || item.content.substring(0, 150)}
                                        </p>
                                    </div>

                                    <div className="flex items-center md:items-end justify-start md:justify-center">
                                        <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-amber-500 group-hover:text-white transition-all transform group-hover:rotate-45 shadow-sm">
                                            <MegaphoneIcon className="h-6 w-6" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Newsletter Subscription */}
                <div className="mt-32 p-16 lg:p-24 bg-slate-900 rounded-[4rem] text-center relative overflow-hidden text-white shadow-2xl">
                    <div className="absolute top-0 left-0 h-full w-1/4 bg-amber-500/10 -skew-x-12 -translate-x-20" />
                    <MegaphoneIcon className="h-20 w-20 text-amber-500 mx-auto mb-10 opacity-40 animate-bounce" />
                    <h4 className="text-4xl font-black mb-6 uppercase tracking-tight italic">Anlık Bildirim Alın</h4>
                    <p className="text-slate-400 font-bold max-w-2xl mx-auto mb-12 uppercase tracking-widest text-[10px] opacity-80 leading-loose">WhatsApp hattımıza abone olarak beldemizdeki gelişmelerden, su ve elektrik kesintilerinden anında haberdar olabilirsiniz.</p>
                    <button className="px-16 py-6 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all">WhatsApp Duyuru Hattı</button>
                </div>
            </div>
        </div>
    );
}
