import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const kurumsalLinks = [
  { name: 'Başkanın Özgeçmişi', href: '/kurumsal/baskan-ozgecmis' },
  { name: 'Meclis Üyeleri', href: '/kurumsal/meclis' },
  { name: 'Encümen Kararları', href: '/kurumsal/encumen-kararlari' },
  { name: 'Faaliyet Raporları', href: '/kurumsal/faaliyet-raporlari' },
  { name: 'Stratejik Plan', href: '/kurumsal/stratejik-plan' },
  { name: 'Hizmet Birimleri', href: '/kurumsal/birimler' },
];

const hizmetLinks = [
  { name: 'Hizmet Rehberi', href: '/hizmetler/rehber' },
  { name: 'Hizmet Masası', href: '/hizmetler/basvuru' },
  { name: 'E-Belediye', href: 'https://e-hizmet.guneyyurt.bel.tr/', external: true },
  { name: 'Kent Bilgi Sistemi', href: 'https://bulutkbs.gov.tr/Rehber/', external: true },
  { name: 'İmar Durumu', href: '/hizmetler/imar' },
];

export default function Footer() {
  const [links, setLinks] = useState([
    { title: 'Ermenek Kaymakamlığı', url: 'http://www.ermenek.gov.tr/' },
    { title: 'Karaman Valiliği', url: 'http://www.karaman.gov.tr/' },
    { title: 'Ermenek Belediyesi', url: 'https://www.ermenek.bel.tr/' },
    { title: 'Ermenek Haber', url: 'https://www.ermenekhaber.com/' }
  ]);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    axios.get('/api/sitesettings/links').then(res => {
      if (res.data.length > 0) setLinks(res.data);
    }).catch(() => { });
    axios.get('/api/sitesettings/social').then(res => setSocials(res.data)).catch(() => { });
  }, []);

  return (
    <footer className="bg-slate-900 border-t border-white/5 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-8">
              <img src="/belediye-logo.png" alt="Logo" className="h-20 w-auto" />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs mb-8">
              Modern, şeffaf ve katılımcı belediyecilik anlayışıyla Güneyyurt'un geleceğini birlikte inşa ediyoruz.
            </p>
            <div className="flex gap-4">
              {socials.length > 0 ? socials.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <span className="text-[10px] font-black uppercase">{s.platform.slice(0, 2)}</span>
                </a>
              )) : (
                <>
                  <a href="https://facebook.com/guneyyurtbelediyesi" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all font-black text-[10px]">FB</a>
                  <a href="https://instagram.com/guneyyurtbelediyesi" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all font-black text-[10px]">IG</a>
                </>
              )}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-extrabold mb-8 text-lg">Yararlı Linkler</h3>
            <ul className="space-y-4">
              {links.map((item, idx) => (
                <li key={idx}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block font-medium">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-extrabold mb-8 text-lg">Kurumsal</h3>
            <ul className="space-y-4">
              {kurumsalLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-extrabold mb-8 text-lg">İletişim</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Belediye Cd. No:1 <br /> Güneyyurt, Ermenek / Karaman
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  +90 338 736 80 04 <br />
                  <span className="opacity-50">Belediye Santral</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} Güneyyurt Belediyesi. Tüm Hakları Saklıdır.
          </p>
          <div className="flex gap-8 text-xs font-bold text-slate-500 tracking-wider uppercase">
            <Link to="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link to="#" className="hover:text-white transition-colors">KVKK</Link>
            <Link to="#" className="hover:text-white transition-colors">Yazılım Destek</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
