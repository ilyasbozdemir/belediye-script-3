import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    BookOpenIcon,
    LightBulbIcon,
    HandThumbUpIcon,
    ArrowLongRightIcon
} from '@heroicons/react/24/outline';

const articles = [
    {
        id: 1,
        title: 'Sıfır Atık ile Geleceğe Nefes Olun',
        category: 'Çevre',
        author: 'Doğa Koruma Birimi',
        readTime: '4 dk',
        summary: 'Evlerimizde uygulayabileceğimiz basit sıfır atık yöntemleri ile Güneyyurtun doğasını nasıl koruyabiliriz? İşte pratik öneriler.',
        img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        title: 'Modern Akıllı Kent Uygulamaları',
        category: 'Teknoloji',
        author: 'IT Direktörlüğü',
        readTime: '6 dk',
        summary: 'Dijitalleşen belediyecilik anlayışımızla hayatınızı kolaylaştıran yeni nesil çözümler ve e-devlet entegrasyonu hakkında her şey.',
        img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        title: 'Tarihi Dokuyu Korumak Neden Önemli?',
        category: 'Kültür',
        author: 'Kültür İşleri Müd.',
        readTime: '8 dk',
        summary: 'Güneyyurtun kadim tarihini gelecek nesillere aktarmak için yürüttüğümüz restorasyon çalışmalarının felsefesi ve teknik detayları.',
        img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800'
    },
];

export default function Articles() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Bilgilendirici Makaleler | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi uzmanları tarafından hazırlanan bilgilendirici makaleler, rehberler ve ipuçları." />

            <div className="bg-amber-500 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Bilgi Hazinesi</h1>
                    <div className="h-1.5 w-24 bg-white/20 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-amber-500 font-black max-w-2xl mx-auto text-lg uppercase tracking-widest bg-white/90 py-4 px-8 rounded-full shadow-2xl">Uzmanlarımızdan halkımıza özel rehberler.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {articles.map((article, idx) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={article.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
                                <div className="absolute top-6 left-6">
                                    <span className="px-5 py-2 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-xl">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-10 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                                    <span className="flex items-center gap-2"><BookOpenIcon className="h-4 w-4" /> {article.author}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-2"><LightBulbIcon className="h-4 w-4" /> {article.readTime} oku</span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-6 group-hover:text-amber-600 transition-colors uppercase tracking-tight italic">
                                    {article.title}
                                </h3>

                                <p className="text-slate-500 font-medium leading-relaxed mb-10 line-clamp-3">
                                    {article.summary}
                                </p>

                                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between group/btn cursor-pointer">
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Hemen Oku</span>
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center group-hover/btn:bg-amber-500 group-hover/btn:text-white transition-all transform group-hover/btn:translate-x-2">
                                        <ArrowLongRightIcon className="h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Suggestion CTA */}
                <div className="mt-20 p-12 lg:p-24 bg-white rounded-[4rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <div className="h-20 w-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-600 mb-10 shadow-inner">
                        <HandThumbUpIcon className="h-10 w-10" />
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tight uppercase italic">Makale Önerisinde Bulunun</h4>
                    <p className="text-slate-500 font-bold max-w-xl leading-relaxed mb-12 uppercase tracking-widest text-xs opacity-80">Hangi konularda bilgi sahibi olmak istersiniz? Belediyemiz bünyesindeki uzmanlar talep ettiğiniz konularda bilgilendirici içerikler hazırlasın.</p>
                    <button className="px-12 py-5 bg-slate-900 hover:bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl">Fikir Gönder</button>
                </div>
            </div>
        </div>
    );
}
