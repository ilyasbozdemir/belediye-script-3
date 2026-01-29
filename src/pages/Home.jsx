import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NewspaperIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  PhoneIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapIcon,
  CloudIcon,
  SunIcon,
  BellIcon,
  ExclamationTriangleIcon,
  CreditCardIcon,
  MegaphoneIcon,
  BriefcaseIcon,
  PhotoIcon,
  SparklesIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const iconMap = {
  NewspaperIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  PhoneIcon,
  HeartIcon,
  MapIcon,
  CloudIcon,
  SunIcon,
  BellIcon,
  CreditCardIcon,
  MegaphoneIcon,
  BriefcaseIcon,
  PhotoIcon,
  SparklesIcon,
  PuzzlePieceIcon
};

const stats = [
  { label: 'Nüfus', value: '5,096' },
  { label: 'Rakım', value: '1,250m' },
  { label: 'Mahalle', value: '6' },
  { label: 'Kuruluş', value: '1954' },
];

const serviceLinks = [
  { name: 'E-İmar Sorgula', icon: MapIcon, color: 'bg-blue-600', href: 'https://bulutkbs.gov.tr/Rehber/' },
  { name: 'İstek Hattı', icon: HeartIcon, color: 'bg-emerald-600', href: '/hizmetler/basvuru' },
  { name: 'Borç Sorgulama', icon: CreditCardIcon, color: 'bg-amber-600', href: 'https://e-hizmet.guneyyurt.bel.tr/' },
  { name: 'Kent Rehberi', icon: PhotoIcon, color: 'bg-slate-900', href: '/isletme-rehberi' },
  { name: 'Belediye İşletmeleri', icon: BriefcaseIcon, color: 'bg-indigo-600', href: '/kurumsal/isletmeler' },
  { name: 'İhale Portalı', icon: ArrowRightIcon, color: 'bg-slate-600', href: '/kurumsal/ihale-duyurulari' },
  { name: 'Proje Galerisi', icon: SparklesIcon, color: 'bg-amber-500', href: '/projeler/biten' },
  { name: 'Kent Fotoğrafları', icon: PhotoIcon, color: 'bg-blue-500', href: '/kesfet' },
];

const slides = [
  {
    title: "Geleceğin Güneyyurt'u",
    subtitle: "Modern Şehircilik Atağı",
    desc: "Altyapıdan üstyapıya, her alanda daha yaşanabilir bir Güneyyurt için durmaksızın çalışıyoruz.",
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2000",
    link: "/projeler/devam-eden",
    cta: "Projeleri İncele"
  },
  {
    title: "Şeffaf Belediyecilik",
    subtitle: "Halkımıza Hesap Veriyoruz",
    desc: "Tüm ihale ve faaliyet raporlarımıza dijital portalımız üzerinden kolayca ulaşabilirsiniz.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
    link: "/kurumsal/ihale-duyurulari",
    cta: "İhaleleri Gör"
  },
  {
    title: "Kültür ve Sanat",
    subtitle: "Tarihimize Sahip Çıkıyoruz",
    desc: "Güneyyurt'un kadim mirasını koruyor, kültürel etkinliklerle geleceğe taşıyoruz.",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=2000",
    link: "/haberler",
    cta: "Etkinlik Takvimi"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlides, setActiveSlides] = useState(slides); // Start with default, then fetch
  const [headlines, setHeadlines] = useState([
    { id: 1, title: 'Güneyyurt Kültür Merkezi İnşaatı Hızla Devam Ediyor', content: 'Beldemizin vizyon projelerinden olan kültür merkezi projesinde kaba inşaat %80 oranında tamamlandı.', createdDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Yeni Park Alanları ve Peyzaj Çalışmaları Başladı', content: 'Gelecek nesiller için daha yeşil bir Güneyyurt hedefiyle park ve bahçelerimizde yenileme çalışmaları sürüyor.', createdDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Belediyemizden Dijital Dönüşüm Hamlesi', content: 'Vatandaşlarımızın işlemlerini daha hızlı yapabilmesi için e-belediye sistemimiz baştan aşağı yenilendi.', createdDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
  ]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Su Kesintisi Hakkında Bilgilendirme', content: 'Şebeke yenileme çalışmaları nedeniyle 15:00-18:00 saatleri arasında geçici kesinti yapılacaktır.', createdDate: new Date().toISOString() },
    { id: 2, title: 'Emlak Vergisi Yapılandırma Son Gün', content: 'Vatandaşlarımızın mağduriyet yaşamaması için yapılandırma işlemlerini hafta sonuna kadar tamamlaması gerekmektedir.', createdDate: new Date().toISOString() },
  ]);
  const [weather, setWeather] = useState({ temp: '14', condition: 'Açık', icon: 'Sun' });
  const [dynamicServices, setDynamicServices] = useState([]);
  const [activeGreeting, setActiveGreeting] = useState(null);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // All API calls removed - running in client-side only mode
    // Data is initialized with defaults above

    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % activeSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "Güneyyurt Belediyesi",
    "url": "https://www.guneyyurt.bel.tr",
    "logo": "https://www.guneyyurt.bel.tr/belediye-logo.png",
    "sameAs": [
      "https://facebook.com/guneyyurtbelediyesi",
      "https://instagram.com/guneyyurtbelediyesi"
    ],
    "event": events.map(e => ({
      "@type": "Event",
      "name": e.title,
      "startDate": e.startDate,
      "location": {
        "@type": "Place",
        "name": e.location,
        "address": "Güneyyurt, Ermenek / Karaman"
      },
      "description": e.description
    }))
  };

  return (
    <div className="bg-white">
      <Seo
        title="Güneyyurt Belediyesi | Resmi Web Sitesi"
        description="Güneyyurt Belediyesi modern, şeffaf ve halk odaklı belediyecilik anlayışı ile hizmetinizde. Haberler, projeler ve e-belediye."
        jsonLd={jsonLd}
      />

      {/* Premium Slider Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={activeSlides[currentSlide].img}
              alt={activeSlides[currentSlide].title}
              className="h-full w-full object-cover opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-6 h-full relative z-10 flex items-center">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block px-5 py-2 mb-8 text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
                  {activeSlides[currentSlide].subtitle}
                </span>
                <h1 className="text-6xl lg:text-[100px] font-black text-white leading-[0.9] mb-10 tracking-tighter">
                  {activeSlides[currentSlide].title.split(' ')[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    {activeSlides[currentSlide].title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
                <div
                  className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl font-medium opacity-80"
                  dangerouslySetInnerHTML={{ __html: activeSlides[currentSlide].desc }}
                />
                <div className="flex flex-wrap gap-6">
                  <Link to={activeSlides[currentSlide].link} className="btn-premium px-12 py-5 text-sm uppercase tracking-widest">
                    {activeSlides[currentSlide].cta}
                  </Link>
                  <a href="https://e-hizmet.guneyyurt.bel.tr/" className="inline-flex items-center gap-3 px-12 py-5 text-sm font-black text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all uppercase tracking-widest">
                    E-Belediye <ArrowRightIcon className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-12 right-12 z-20 flex gap-4">
          <button
            onClick={() => setCurrentSlide(s => (s - 1 + activeSlides.length) % activeSlides.length)}
            className="h-16 w-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentSlide(s => (s + 1) % activeSlides.length)}
            className="h-16 w-16 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-all shadow-2xl shadow-blue-600/30"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-12 left-12 z-20 flex gap-3">
          {activeSlides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-12 bg-blue-500' : 'w-4 bg-white/20'}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-16 container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-10 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-4">
              <p className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{stat.value}</p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Weather Widget */}
      <div className="fixed bottom-12 left-12 z-[100] hidden xl:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-2xl rounded-3xl p-3 border border-slate-100 flex items-center gap-4 cursor-pointer"
        >
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            {weather.icon === 'Sun' ? <SunIcon className="h-5 w-5" /> : <CloudIcon className="h-5 w-5" />}
          </div>
          <div className="pr-4">
            <p className="text-sm font-black text-slate-900 leading-none">{weather.temp}°C</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight mt-0.5">{weather.condition}</p>
          </div>
        </motion.div>
      </div>

      {/* Announcements Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">HIZLI BİLGİ</p>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Son Duyurular</h2>
              </div>
              <Link to="/haberler?category=Duyuru" className="px-8 py-3 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all">Tüm Duyurular</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {announcements.length > 0 ? announcements.map((ann, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <BellIcon className="h-12 w-12 text-blue-600" />
                  </div>
                  <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg mb-6">{new Date(ann.createdDate).toLocaleDateString('tr-TR')}</span>
                  <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{ann.title}</h4>
                  <p className="text-slate-500 font-medium text-sm line-clamp-3 leading-loose">{ann.summary || ann.content}</p>
                </motion.div>
              )) : (
                <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Henüz yayınlanmış bir duyuru bulunmuyor.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="p-12 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 skew-y-12 translate-y-20" />
              <h3 className="text-2xl font-black mb-8 uppercase italic tracking-tighter relative z-10">Önemli Bağlantılar</h3>
              <div className="space-y-4 relative z-10">
                {[
                  { name: 'E-Devlet Kapısı', url: 'https://www.turkiye.gov.tr' },
                  { name: 'T.C. Resmi Gazete', url: 'https://www.resmigazete.gov.tr' },
                  { name: 'GİB İnteraktif V.D.', url: 'https://ivd.gib.gov.tr' },
                  { name: 'E-Nabız Sistemi', url: 'https://enabiz.gov.tr' },
                  { name: 'MEB Portal', url: 'https://www.meb.gov.tr' },
                  { name: 'İçişleri Bakanlığı', url: 'https://www.icisleri.gov.tr' },
                  { name: 'Karaman Valiliği', url: 'http://www.karaman.gov.tr' },
                  { name: 'Ermenek Kaymakamlığı', url: 'http://www.ermenek.gov.tr' }
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">{link.name}</span>
                    <ArrowRightIcon className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kent Bilgi Sistemi CTA */}
      <section className="pt-32 pb-16 container mx-auto px-6">
        <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden text-center lg:text-left">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-blue-600/10 skew-x-12 translate-x-20" />
          <div className="flex items-center gap-8 flex-col lg:flex-row relative z-10">
            <div className="h-24 w-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl blur-bg">
              <MapIcon className="h-12 w-12" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight uppercase italic mb-4">Kent Bilgi Sistemi</h2>
              <p className="text-slate-400 font-bold max-w-xl uppercase tracking-widest text-xs opacity-80 leading-loose">Şehrimizin dijital ikizi, imar durumu, nöbetçi eczaneler ve önemli noktalar bir tık uzağınızda.</p>
            </div>
          </div>
          <a href="https://bulutkbs.gov.tr/Rehber/" target="_blank" rel="noreferrer" className="btn-premium px-12 py-5 text-sm uppercase tracking-widest relative z-10">Sisteme Giriş Yap</a>
        </div>
      </section>

      {/* Upcoming Events Horizontal Scroll */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">SOSYAL YAŞAM</p>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Yaklaşan Etkinlikler</h2>
            </div>
            <Link to="/etkinlikler" className="px-8 py-3 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-emerald-600 hover:text-white transition-all">Tüm Takvim</Link>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide">
            {events.length > 0 ? events.map((ev, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="min-w-[400px] bg-slate-50 rounded-[3rem] p-8 flex gap-8 border border-slate-100/50"
              >
                <div className="h-32 w-32 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg">
                  <img src={ev.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=300'} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-black text-emerald-600 mb-2 uppercase tracking-widest">{new Date(ev.startDate).toLocaleDateString('tr-TR')}</span>
                  <h4 className="text-xl font-black text-slate-900 uppercase italic leading-tight mb-2 truncate max-w-[200px]">{ev.title}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                    <MapIcon className="h-3 w-3" /> {ev.location}
                  </p>
                </div>
              </motion.div>
            )) : (
              <div className="w-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Henüz yeni bir etkinlik planlanmadı.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(dynamicServices.length > 0 ? dynamicServices.map(s => ({
            name: s.title,
            icon: iconMap[s.iconName] || PuzzlePieceIcon,
            color: s.color,
            href: s.link
          })) : serviceLinks).map((service, i) => (
            <motion.a
              key={i}
              href={service.href}
              whileHover={{ y: -12 }}
              className="flex flex-col p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 group"
            >
              <div className={`${service.color} w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-white mb-8 shadow-xl shadow-inherit/20 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">{service.name}</h3>
              <p className="text-slate-400 font-bold leading-relaxed text-[10px] uppercase tracking-widest transition-colors group-hover:text-blue-600">
                Detaylı Bilgi ve İşlemler
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Latest News + Featured Projects */}
      <section className="py-32 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24">

            {/* News Section */}
            <div className="lg:w-2/3">
              <div className="flex items-end justify-between mb-16">
                <div>
                  <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">GÜNCEL AKIŞ</p>
                  <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Belediye Haberleri</h2>
                </div>
                <Link to="/haberler" className="px-8 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all">Tümünü Gör</Link>
              </div>

              <div className="space-y-6">
                {headlines.length > 0 ? headlines.map((news, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-10 bg-white p-10 rounded-[3rem] border border-slate-50 hover:shadow-xl transition-all duration-500 group cursor-pointer"
                  >
                    <div className="md:w-64 h-48 flex-shrink-0 overflow-hidden rounded-[2.5rem] shadow-lg">
                      <img src={news.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=500'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.title} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-black text-blue-600 mb-4 block uppercase tracking-widest">{new Date(news.createdDate).toLocaleDateString('tr-TR')}</span>
                      <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight uppercase">{news.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed line-clamp-2">{news.content}</p>
                    </div>
                  </motion.div>
                )) : (
                  <div className="p-20 text-center bg-white rounded-[4rem] border border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Yükleniyor...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Side Projects */}
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-black text-slate-900 mb-16 flex items-center gap-4 tracking-tighter uppercase italic">
                <BuildingLibraryIcon className="h-8 w-8 text-blue-600" />
                BAŞLICA YATIRIMLAR
              </h2>
              <div className="space-y-10">
                {featuredProjects.map((project, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-[2.5rem] aspect-[4/3] bg-slate-900 shadow-2xl">
                    <img src={project.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10 text-white">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 block">{project.status}</span>
                      <h4 className="font-black text-2xl leading-tight uppercase tracking-tight">{project.title}</h4>
                    </div>
                    <div className="absolute top-8 right-8 h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <ArrowRightIcon className="h-6 w-6" />
                    </div>
                  </div>
                ))}
                <Link to="/projeler/devam-eden" className="block text-center py-6 bg-slate-900 hover:bg-black rounded-[2rem] text-[10px] font-black text-white uppercase tracking-widest transition-all">
                  Tüm Yatırım Projelerimiz
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Municipal Facilities Grid */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 text-center md:text-left">TOPLUMSAL HİZMET</p>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Belediye Tesislerimiz</h2>
          </div>
          <Link to="/kurumsal/isletmeler" className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">Tüm Tesisleri Gör <ArrowRightIcon className="h-4 w-4" /></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Kültür Merkezi', desc: 'Modern nikah ve konferans salonu.', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600', link: '/kurumsal/isletmeler' },
            { name: 'Yüzme Havuzu', desc: 'Haftalık seanslar ve spor kursları.', img: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=600', link: '/kurumsal/isletmeler' },
            { name: 'Halı Saha', desc: 'Profesyonel aydınlatmalı spor tesisleri.', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600', link: '/kurumsal/isletmeler' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative h-96 rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <h4 className="text-2xl font-black uppercase italic tracking-tight mb-2">{item.name}</h4>
                <p className="text-xs font-medium opacity-80 mb-6">{item.desc}</p>
                <Link to={item.link} className="inline-flex h-12 w-12 bg-white/20 hover:bg-white backdrop-blur-md rounded-2xl items-center justify-center text-white hover:text-slate-900 transition-all">
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6">FOTO GALERİ</p>
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">Güneyyurt'tan <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Kareler</span></h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {[
              'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1517248135467-4c7ed9d8747c?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=700',
              'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group rounded-[2.5rem] overflow-hidden"
              >
                <img src={img} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center text-white">
            <Link to="/kesfet" className="inline-flex items-center gap-4 px-16 py-6 bg-white/5 border border-white/20 text-white font-black rounded-full hover:bg-white hover:text-slate-900 transition-all uppercase tracking-widest text-sm backdrop-blur-md">
              Tüm Albümü Keşfet <PhotoIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social News (Ayrılanlar & Evlenenler) */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-10 group">
            <div className="h-24 w-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <NewspaperIcon className="h-10 w-10" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-2">Aramızdan Ayrılanlar</h4>
              <p className="text-xs font-medium text-slate-500 mb-6 uppercase tracking-widest">Vefat eden hemşehrilerimize Allah'tan rahmet diliyoruz.</p>
              <Link to="/hizmetler/vefatlar" className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] hover:text-slate-900 transition-colors">Tüm Kayıtlar & Taziye</Link>
            </div>
          </div>
          <div className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-10 group">
            <div className="h-24 w-24 bg-pink-500 rounded-[2rem] flex items-center justify-center text-white group-hover:-rotate-12 transition-transform shadow-xl shadow-pink-500/20">
              <HeartIcon className="h-10 w-10 text-white fill-current" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-2">Mutluluğa İlk Adım</h4>
              <p className="text-xs font-medium text-slate-500 mb-6 uppercase tracking-widest">Yeni evlenen çiftlerimize ömür boyu mutluluklar dileriz.</p>
              <Link to="/hizmetler/evlendirme" className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em] hover:text-slate-900 transition-colors">Nikah İşlemleri & Tebrik</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Güneyyurt Banner */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[5rem] h-[500px] flex items-center overflow-hidden group border border-slate-100 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=2000"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Keşfet"
            />
            <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
            <div className="relative z-10 px-12 lg:px-24 max-w-2xl text-white">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Kültür ve Turizm</span>
              <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter uppercase italic leading-tight">Güneyyurt'u <br />Keşfedin</h2>
              <p className="text-xl text-blue-100/80 font-medium mb-12 leading-relaxed italic">Doğası, tarihi ve lezzetleriyle Güneyyurt'un gizli kalmış hazinelerini keşfetmeye hazır mısınız?</p>
              <Link to="/kesfet" className="btn-premium px-12 py-5 text-sm uppercase tracking-widest">Rehberi Görüntüle</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Action Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[4rem] p-16 lg:p-32 text-center relative overflow-hidden shadow-2xl shadow-blue-600/30">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-tight uppercase italic">Katılımcı Belediyecilik</h2>
            <p className="text-xl text-blue-100 mb-16 font-medium leading-[2] opacity-80">
              Güneyyurt'un geleceğini birlikte planlıyoruz. Talep, öneri and şikayetleriniz modern dijital takip sistemimizle doğrudan başkanlık makamına ulaşır.
            </p>
            <Link to="/iletisim" className="inline-flex items-center gap-4 px-16 py-6 bg-white text-blue-700 font-black rounded-full shadow-2xl hover:scale-105 transition-transform uppercase tracking-widest text-sm">
              Başkan'a Yazın <HeartIcon className="h-6 w-6 text-pink-500 fill-pink-500" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
