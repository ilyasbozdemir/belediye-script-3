
import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const kurumsalLinks = [
  { name: 'Başkanın Özgeçmişi', href: '/kurumsal/baskan-ozgecmis' },
  { name: 'Meclis Üyeleri', href: '/kurumsal/meclis' },
  { name: 'Meclis Kararları', href: '/kurumsal/meclis' },
  { name: 'Encümen Kararları', href: '/kurumsal/encumen-kararlari' },
  { name: 'Faaliyet Raporları', href: '/kurumsal/faaliyet-raporlari' },
  { name: 'Hizmet Birimleri', href: '/kurumsal/birimler' },
];

const hizmetLinks = [
  { name: 'Hizmet Rehberi', href: '/hizmetler/rehber' },
  { name: 'Hizmet Masası', href: '/hizmetler/basvuru' },
  { name: 'E-Belediye', href: 'https://e-hizmet.guneyyurt.bel.tr/', external: true },
  { name: 'İmar Durumu', href: '/hizmetler/imar' },
  { name: 'Nikah Başvurusu', href: '/hizmetler/evlendirme' },
];

export default function Footer() {
  const links = [
    { title: 'T.C. Cumhurbaşkanlığı', url: 'https://www.tccb.gov.tr/' },
    { title: 'E-Devlet Kapısı', url: 'https://www.turkiye.gov.tr/' },
    { title: 'Karaman Valiliği', url: 'http://www.karaman.gov.tr/' },
    { title: 'Ermenek Kaymakamlığı', url: 'http://www.ermenek.gov.tr/' },
    { title: 'CİMER Başvuru', url: 'https://www.cimer.gov.tr/' },
    { title: 'TKGM Parsel Sorgulama', url: 'https://parselsorgu.tkgm.gov.tr/' },
    { title: 'T.C. Resmi Gazete', url: 'https://www.resmigazete.gov.tr/' }
  ];
  const socials = [];

  return (
    <footer className="bg-slate-900 border-t border-white/5 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-8">
              <img src="/belediye-logo-light.png" alt="Logo" className="h-20 w-auto" />
            </Link>
            <p className="text-slate-400 text-xs leading-[2] max-w-xs mb-8 italic opacity-70">
              Modern, şeffaf ve katılımcı belediyecilik anlayışıyla Güneyyurt'un geleceğini birlikte inşa ediyoruz.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/guneyyurtbelediyesi" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all font-black text-[10px]">FB</a>
              <a href="https://instagram.com/guneyyurtbelediyesi" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all font-black text-[10px]">IG</a>
            </div>
          </div>

          {/* Quick Links - Hizmetler */}
          <div>
            <h3 className="text-white font-black mb-8 text-sm uppercase tracking-widest italic">Hizmetler</h3>
            <ul className="space-y-4">
              {hizmetLinks.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block text-[11px] font-bold uppercase tracking-tight">
                      {item.name}
                    </a>
                  ) : (
                    <Link to={item.href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block text-[11px] font-bold uppercase tracking-tight">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Kurumsal */}
          <div>
            <h3 className="text-white font-black mb-8 text-sm uppercase tracking-widest italic">Kurumsal</h3>
            <ul className="space-y-4">
              {kurumsalLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block text-[11px] font-bold uppercase tracking-tight">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-black mb-8 text-sm uppercase tracking-widest italic">Yararlı Linkler</h3>
            <ul className="space-y-4">
              {links.map((item, idx) => (
                <li key={idx}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block text-[11px] font-bold uppercase tracking-tight">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black mb-8 text-sm uppercase tracking-widest italic">İletişim</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-slate-400 text-[11px] font-bold leading-relaxed uppercase tracking-tight">
                  Belediye Sk. No:8 <br /> Güneyyurt, Ermenek / Karaman
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-black tracking-widest">
                    +90 338 736 80 04
                  </p>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Belediye Santral</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium">
            &copy; 1953 - {new Date().getFullYear()} Güneyyurt Belediyesi. Tüm Hakları Saklıdır.
          </p>

          <div className="flex items-center gap-4 px-6 py-2 bg-white/5 rounded-full border border-white/5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">
              Şu An <span className="text-emerald-400 mx-1">{Math.floor(Math.random() * (45 - 12) + 12)}</span> Kişi Sitede Aktif
            </span>
          </div>

          <div className="flex gap-8 text-xs font-bold text-slate-500 tracking-wider uppercase">
            <Link to="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link to="#" className="hover:text-white transition-colors">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
