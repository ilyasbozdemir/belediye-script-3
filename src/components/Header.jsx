import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'BELDE REHBERİ',
    href: '#',
    children: [
      { name: 'Belde Tarihçesi', href: '/kurumsal/tarihce' },
      { name: 'Güneyyurt\'u Tanıyın', href: '/kesfet' },
      { name: 'Tesisler & Sosyal Alanlar', href: '/kurumsal/isletmeler' },
      { name: 'Nöbetçi Eczaneler', href: '/hizmetler/eczaneler' },
      { name: 'Foto Galeri', href: '/galeri' },
    ]
  },
  {
    name: 'KURUMSAL',
    href: '#',
    children: [
      { name: 'Başkanın Mesajı', href: '/kurumsal/baskan-mesaj' },
      { name: 'Başkanın Özgeçmişi', href: '/kurumsal/baskan-ozgecmis' },
      { name: 'Meclis Üyeleri', href: '/kurumsal/meclis' },
      { name: 'Encümen Üyeleri', href: '/kurumsal/encumen' },
      { name: 'Eski Belediye Başkanlarımız', href: '/kurumsal/eski-baskanlar' },
      { name: 'Belediye Projelerimiz', href: '/projeler' },
      { name: 'Belediye İştirakleri', href: '/kurumsal/isletmeler?type=istirak' },
      { name: 'Encümen Kararları', href: '/kurumsal/encumen-kararlari', newTab: true },
      { name: 'Mevzuat & Faaliyetler', href: '/kurumsal/mevzuat', newTab: true },
      { name: 'İhale Duyuruları', href: '/kurumsal/ihale-duyurulari', newTab: true },
      { name: 'Stratejik Plan', href: '/kurumsal/stratejik-plan', newTab: true },
      { name: 'Hizmet Birimleri (Müdürlükler)', href: '/kurumsal/birimler' },
      { name: 'Muhtarlıklar', href: '/kurumsal/muhtarliklar' },
      { name: 'Hizmet Standartları', href: '/kurumsal/hizmet-standartlari' },
    ]
  },
  {
    name: 'VATANDAŞ HİZMETLERİ',
    href: '#',
    children: [
      { name: 'E-Belediye (Hızlı Ödeme)', href: 'https://e-hizmet.guneyyurt.bel.tr/', external: true },
      { name: 'Online Dilekçe İşlemleri', href: '/hizmetler/dilekce' },
      { name: 'İstek & Şikayet Formu', href: '/hizmetler/basvuru' },
      { name: 'Parsel Sorgulama (TKGM)', href: 'https://parselsorgu.tkgm.gov.tr/', external: true },
      { name: 'Vefat Edenler / Taziye', href: '/hizmetler/vefatlar' },
      { name: 'Nikah Başvurusu', href: '/hizmetler/evlendirme' },
      { name: 'Kent Rehberi', href: '/hizmetler/rehber' },
      { name: 'Alo Moloz Hattı', href: '/hizmetler/basvuru?type=moloz' },
    ]
  },
  {
    name: 'MEDYA & HABER',
    href: '#',
    children: [
      { name: 'Güncel Haberler', href: '/haberler' },
      { name: 'Resmi Duyurular', href: '/duyurular' },
      { name: 'Etkinlik Takvimi', href: '/etkinlikler' },
      { name: 'Basında Güneyyurt', href: '/kurumsal/basinda-biz' },
      { name: 'Hava Durumu', href: '/hava-durumu' },
    ]
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className={classNames(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 overflow-hidden",
        isScrolled ? "h-0 opacity-0" : "h-10 bg-gradient-to-r from-amber-500 to-orange-600"
      )}>
        <div className="mx-auto max-w-7xl h-full flex items-center justify-center px-6 text-white text-[10px] font-black uppercase tracking-[0.2em]">
          <InformationCircleIcon className="h-4 w-4 mr-3 animate-pulse" />
          <span>SİTE ŞU AN DEMO MODUNDADIR. VERİLER TANITIM AMAÇLI OLUP GERÇEĞİ YANSITMAYABİLİR.</span>
        </div>
      </div>

      <header className={classNames(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "top-0 bg-white shadow-xl py-2"
          : "top-10 bg-black/5 md:bg-black/10 backdrop-blur-md py-4 border-b border-white/5"
      )}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-4 group">
              <img
                src={isScrolled ? "/belediye-logo.png" : "/belediye-logo-light.png"}
                alt="Güneyyurt Belediyesi"
                className="h-20 w-auto object-contain transition-all duration-500 group-hover:scale-110"
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className={classNames(
                "-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 transition-colors",
                isScrolled ? "text-slate-900" : (location.pathname === '/' ? "text-white" : "text-slate-900")
              )}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-4">
            {navigation.map((item) => (
              <Popover key={item.name} className="static">
                <Popover.Button className={classNames(
                  "flex items-center gap-x-1.5 px-5 py-2.5 text-sm font-black transition-all duration-300 rounded-full outline-none group",
                  isScrolled
                    ? "text-slate-900 hover:bg-slate-100"
                    : "text-white hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                )}>
                  {item.name}
                  <ChevronDownIcon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-300"
                  enterFrom="opacity-0 -translate-y-4"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-4"
                >
                  <Popover.Panel className="absolute inset-x-0 top-full z-[100] w-full bg-white border-y border-slate-100 shadow-2xl py-12">
                    {({ close }) => (
                      <div className="mx-auto max-w-7xl px-8">
                        <div className="flex flex-col lg:flex-row gap-16">
                          <div className="lg:w-1/4">
                            <div className="bg-slate-50 rounded-[2.5rem] p-10">
                              <h4 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">
                                {item.name}
                              </h4>
                              <p className="text-sm font-bold text-slate-500 leading-relaxed italic uppercase tracking-widest opacity-60">
                                {item.name} menüsü altındaki tüm servislerimize ve bilgilendirici içeriklerimize aşağıdan ulaşabilirsiniz.
                              </p>
                              <div className="mt-8 h-1 w-12 bg-blue-600 rounded-full"></div>
                            </div>
                          </div>

                          <div className="lg:w-3/4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2">
                              {item.children.map((child) => (
                                <div key={child.name} className="relative group/item">
                                  {child.external || child.newTab ? (
                                    <a
                                      href={child.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={() => close()}
                                      className="flex items-center justify-between group rounded-2xl px-6 py-4 text-sm font-black text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300 uppercase tracking-tight italic"
                                    >
                                      {child.name}
                                      <div className="h-6 w-6 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 group-hover:bg-white" />
                                      </div>
                                    </a>
                                  ) : (
                                    <Link
                                      to={child.href}
                                      onClick={() => close()}
                                      className="flex items-center justify-between group rounded-2xl px-6 py-4 text-sm font-black text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300 uppercase tracking-tight italic"
                                    >
                                      {child.name}
                                      <div className="h-6 w-6 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 group-hover:bg-white" />
                                      </div>
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Popover.Panel>
                </Transition>
              </Popover>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
            <a
              href="https://e-hizmet.guneyyurt.bel.tr/"
              target="_blank"
              rel="noreferrer"
              className="btn-premium py-2.5 px-6"
            >
              E-Belediye
            </a>
          </div>
        </nav>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-white px-8 py-8 sm:max-w-sm">
              <div className="flex items-center justify-between mb-12">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                  <img src="/belediye-logo.png" alt="Logo" className="h-10 w-auto" />

                </Link>
                <button
                  type="button"
                  className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6">
                {navigation.map((item) => (
                  <Disclosure as="div" key={item.name} className="border-b border-slate-50 pb-4">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between text-lg font-bold text-slate-900 uppercase">
                          {item.name}
                          <ChevronDownIcon className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 text-slate-400 transition-transform')} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-4 space-y-3 pl-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className="block text-base font-black text-slate-500 hover:text-blue-600 uppercase italic tracking-tight"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <Link
                  to="/iletisim"
                  className="block text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  İletişim
                </Link>
                <div className="pt-8 text-center text-[8px] font-black text-amber-600 uppercase tracking-widest leading-loose">
                  SİTE ŞU AN DEMO MODUNDADIR.
                </div>
                <div className="pt-4">
                  <a href="https://e-hizmet.guneyyurt.bel.tr/" className="btn-premium w-full text-center py-4">
                    E-BELEDİYE SORGULAMA
                  </a>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </header>
    </>
  );
}
