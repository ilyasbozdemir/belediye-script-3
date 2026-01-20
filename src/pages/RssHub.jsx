import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    RssIcon,
    CodeBracketIcon,
    ShareIcon,
    BellAlertIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

const feeds = [
    { name: 'Haberler RSS', type: 'XML', url: '/api/news/rss', color: 'bg-orange-500' },
    { name: 'Duyurular RSS', type: 'XML', url: '/api/announcements/rss', color: 'bg-blue-500' },
    { name: 'İhale Duyuruları RSS', type: 'XML', url: '/api/tenders/rss', color: 'bg-emerald-500' },
    { name: 'Vefat Listesi RSS', type: 'XML', url: '/api/deceased/rss', color: 'bg-slate-600' }
];

export default function RssHub() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="RSS İçerik Kanalları | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi haberlerini ve duyurularını RSS okuyucunuzla anında takip edin." />

            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-600/5 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="h-20 w-20 bg-orange-500/10 rounded-[2rem] flex items-center justify-center text-orange-500 mx-auto mb-8 border border-orange-500/20">
                        <RssIcon className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">RSS İçerik Kanalları</h1>
                    <div className="h-1.5 w-24 bg-orange-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Belediyemizin Anlık Bilgilendirme Servisleri.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-5xl px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {feeds.map((feed, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-12 rounded-[4rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-between group hover:border-orange-500 transition-all duration-500"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`h-14 w-14 ${feed.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                    <RssIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 leading-tight uppercase italic">{feed.name}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Format: {feed.type}</p>
                                </div>
                            </div>
                            <a
                                href={feed.url}
                                target="_blank"
                                rel="noreferrer"
                                className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-orange-600 group-hover:text-white transition-all"
                            >
                                <CodeBracketIcon className="h-6 w-6" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Information Section */}
                <div className="bg-white rounded-[4rem] p-12 lg:p-24 shadow-2xl border border-slate-50">
                    <div className="flex items-center gap-6 mb-12">
                        <InformationCircleIcon className="h-12 w-12 text-orange-500" />
                        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">RSS Nedir?</h2>
                    </div>

                    <div className="prose prose-2xl prose-slate max-w-none text-slate-500 font-medium leading-[2.2]">
                        <p>
                            RSS (Really Simple Syndication), web sitelerinde yayınlanan içeriklerin tek bir merkezden takip edilmesini sağlayan bir teknolojidir.
                            Güneyyurt Belediyesi'nin yukarıdaki bağlantıları sayesinde, beldemize dair tüm gelişmeleri web sitemizi her gün ziyaret etmek zorunda kalmadan,
                            RSS okuyucu uygulamalarınız üzerinden anında takip edebilirsiniz.
                        </p>
                        <h3>Neden Kullanmalısınız?</h3>
                        <ul>
                            <li><strong>Hız:</strong> Haber ve duyurular yayınlandığı saniyede bildirim alırsınız.</li>
                            <li><strong>Düzen:</strong> Tüm kaynakları tek bir uygulamada (Feedly, Pocket vb.) toplarsınız.</li>
                            <li><strong>Verimlilik:</strong> Zaman kaybını önler, sadece ilginizi çeken başlıklara odaklanırsınız.</li>
                        </ul>
                    </div>

                    <div className="mt-20 p-12 bg-orange-50 rounded-[3rem] border border-orange-100 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                        <BellAlertIcon className="h-14 w-14 text-orange-600" />
                        <div>
                            <h4 className="text-xl font-black text-orange-900 uppercase tracking-tight italic">Kurumsal Entegrasyon</h4>
                            <p className="text-orange-800/80 font-bold text-xs uppercase tracking-widest leading-loose mt-2">Bu servisler kamuya açıktır. Diğer haber platformları veya dijital tabelalar bu linkleri kullanarak içeriklerimizi otomatik yansıtabilir.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
