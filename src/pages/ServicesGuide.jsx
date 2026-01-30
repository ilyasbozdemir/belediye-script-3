import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BuildingLibraryIcon,
    BanknotesIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    DocumentDuplicateIcon,
    ArrowRightIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const categories = [
    {
        title: 'Mali Hizmetler',
        icon: BanknotesIcon,
        links: [
            { name: 'E-Belediye İşlemleri', url: 'https://www.turkiye.gov.tr/guneyyurt-belediyesi' },
            { name: 'Emlak Vergisi Sorgulama', url: 'https://www.turkiye.gov.tr/guneyyurt-belediyesi' },
            { name: 'Arsa Rayiç Değerleri', url: 'https://www.turkiye.gov.tr/guneyyurt-belediyesi' },
            { name: 'Borç Ödeme (E-Devlet)', url: 'https://www.turkiye.gov.tr/guneyyurt-belediyesi' }
        ]
    },
    {
        title: 'Hukuk & Mevzuat',
        icon: BuildingLibraryIcon,
        links: [
            { name: 'Meclis Kararları', href: '/kurumsal/meclis' },
            { name: 'Encümen Kararları', href: '/kurumsal/encumen-kararlari' },
            { name: 'İhale Duyuruları', href: '/kurumsal/ihale-duyurulari' },
            { name: 'Hizmet Standartları', href: '/kurumsal/hizmet-standartlari' }
        ]
    },
    {
        title: 'İdari İşlemler',
        icon: IdentificationIcon,
        links: [
            { name: 'İstek & Şikayet Başvurusu', href: '/hizmetler/basvuru' },
            { name: 'Sicil No Sorgulama', url: 'https://www.turkiye.gov.tr/guneyyurt-belediyesi' },
            { name: 'Dilekçe Örnekleri', href: '/hizmetler/dilekce' },
            { name: 'Birimlerimiz', href: '/kurumsal/birimler' }
        ]
    },
    {
        title: 'Sosyal Destek',
        icon: ShieldCheckIcon,
        links: [
            { name: 'Sosyal Yardım Talebi', href: '/hizmetler/basvuru' },
            { name: 'Evlendirme İşlemleri', href: '/hizmetler/evlendirme' },
            { name: 'Vefat ve Cenaze', href: '/hizmetler/vefatlar' },
            { name: 'Muhtarlıklar', href: '/kurumsal/muhtarliklar' }
        ]
    },
    {
        title: 'Çevre & Kent',
        icon: GlobeAltIcon,
        links: [
            { name: 'Parsel Sorgulama (TKGM)', url: 'https://parselsorgu.tkgm.gov.tr/' },
            { name: 'İmar Durumu Bilgisi', href: '/hizmetler/imar' },
            { name: 'Nöbetçi Eczaneler', href: '/hizmetler/eczaneler' },
            { name: 'Hava Durumu', href: '/hava-durumu' }
        ]
    },
    {
        title: 'Kültür & Turizm',
        icon: DocumentDuplicateIcon,
        links: [
            { name: 'Güncel Duyurular', href: '/duyurular' },
            { name: 'Etkinlik Takvimi', href: '/etkinlikler' },
            { name: 'Belediye Tesisleri', href: '/kesfet/tesisler' },
            { name: 'Fotoğraf Galerisi', href: '/galeri' }
        ]
    }
];

export default function ServicesGuide() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Hizmet Rehberi | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi tarafından sunulan tüm dijital ve fiziksel hizmetlerin rehberi." />

            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Hizmet Rehberi</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Tek Noktadan Tüm Belediye Hizmetlerine Erişim.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[4rem] p-12 lg:p-16 shadow-2xl border border-slate-100 flex flex-col group"
                        >
                            <div className="flex items-center gap-6 mb-12">
                                <div className="h-20 w-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                                    <cat.icon className="h-10 w-10" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{cat.title}</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4 flex-grow">
                                {cat.links.map((link, i) => {
                                    const isExternal = !!link.url;
                                    const Tag = isExternal ? 'a' : Link;
                                    const props = isExternal ? {
                                        href: link.url,
                                        target: "_blank",
                                        rel: "noreferrer"
                                    } : {
                                        to: link.href
                                    };

                                    return (
                                        <Tag
                                            key={i}
                                            {...props}
                                            className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 hover:bg-slate-900 hover:text-white transition-all group/item"
                                        >
                                            <span className="font-black text-[11px] uppercase tracking-widest leading-none">{link.name}</span>
                                            <div className="flex items-center gap-3">
                                                {isExternal && <GlobeAltIcon className="h-4 w-4 text-slate-400 group-hover/item:text-blue-400" />}
                                                <ArrowRightIcon className="h-5 w-5 opacity-30 group-hover/item:opacity-100 transition-opacity" />
                                            </div>
                                        </Tag>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Support Section */}
                <div className="mt-32 p-16 bg-blue-600 rounded-[5rem] text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 h-full w-1/4 bg-white/5 skew-x-12 -translate-x-10" />
                    <ShieldCheckIcon className="h-16 w-16 mx-auto mb-8 text-white opacity-40 animate-pulse" />
                    <h4 className="text-4xl font-black mb-6 uppercase tracking-tight italic">Yardım mı Lazım?</h4>
                    <p className="text-blue-100 font-bold max-w-2xl mx-auto mb-12 text-[10px] uppercase tracking-[0.2em] leading-loose opacity-70 border-t border-white/10 pt-10">
                        Aradığınız hizmeti bulamadıysanız veya dijital işlemlerle ilgili sorun yaşıyorsanız 7/24 hizmet veren WhatsApp destek hattımıza ulaşabilirsiniz.
                    </p>
                    <a
                        href="https://wa.me/903384912002"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-16 py-6 bg-white text-blue-600 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform"
                    >
                        WhatsApp Destek Hattı
                    </a>
                </div>
            </div>
        </div>
    );
}
