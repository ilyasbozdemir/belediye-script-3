import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  BookOpenIcon,
  MapIcon,
  BuildingOfficeIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  NewspaperIcon,
  CloudIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  HeartIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from 'lucide-react';

const navigation = [
  {
    name: 'BELDE REHBERİ',
    href: '#',
    children: [
      { name: 'Belde Tarihçesi', href: '/kurumsal/tarihce', icon: BookOpenIcon },
      { name: 'Güneyyurt\'u Tanıyın', href: '/kesfet', icon: MapIcon },
      { name: 'Foto Galeri', href: '/galeri', icon: PhotoIcon },
      { name: 'Nöbetçi Eczaneler', href: '/hizmetler/eczaneler', icon: HeartIcon },
      { name: 'Hava Durumu', href: '/hava-durumu', icon: CloudIcon },
    ]
  },
  {
    name: 'KURUMSAL',
    href: '#',
    children: [
      { name: 'Başkanın Mesajı', href: '/kurumsal/baskan-mesaj', icon: ChatBubbleLeftRightIcon },
      { name: 'Başkanın Özgeçmişi', href: '/kurumsal/baskan-ozgecmis', icon: IdentificationIcon },
      { name: 'Meclis Üyeleri', href: '/kurumsal/meclis', icon: UserGroupIcon },
      { name: 'Encümen Üyeleri', href: '/kurumsal/encumen', icon: UserGroupIcon },
      { name: 'Belediye İştirakleri', href: '/kurumsal/isletmeler?type=istirak', icon: BuildingOfficeIcon },
      { name: 'Belediye Tesisleri', href: '/kurumsal/isletmeler?type=kamu', icon: BuildingLibraryIcon },
      { name: 'Belediye Projelerimiz', href: '/projeler', icon: SparklesIcon },
      { name: 'Mevzuat & Faaliyetler', href: '/kurumsal/mevzuat', icon: DocumentTextIcon },
      { name: 'İhale Duyuruları', href: '/kurumsal/ihale-duyurulari', icon: MegaphoneIcon },
      { name: 'Hizmet Birimleri', href: '/kurumsal/birimler', icon: BuildingOfficeIcon },
      { name: 'Muhtarlıklar', href: '/kurumsal/muhtarliklar', icon: MapIcon },
      { name: 'Eski Başkanlarımız', href: '/kurumsal/eski-baskanlar', icon: AcademicCapIcon },
    ]
  },
  {
    name: 'VATANDAŞ HİZMETLERİ',
    href: '#',
    children: [
      { name: 'E-Belediye Sorgulama', href: 'https://e-hizmet.guneyyurt.bel.tr/', icon: GlobeAltIcon, external: true },
      { name: 'İstek & Şikayet Formu', href: '/hizmetler/basvuru', icon: ChatBubbleLeftRightIcon },
      { name: 'Parsel Sorgulama (TKGM)', href: 'https://parselsorgu.tkgm.gov.tr/', icon: MapIcon, external: true },
      { name: 'Vefat Edenler / Taziye', href: '/hizmetler/vefatlar', icon: NewspaperIcon },
      { name: 'Nikah Başvurusu', href: '/hizmetler/evlendirme', icon: HeartIcon },
      { name: 'Hizmet Rehberi', href: '/hizmetler/rehber', icon: BookOpenIcon },
      { name: 'Online Dilekçe İşlemleri', href: '/hizmetler/dilekce', icon: DocumentTextIcon },
    ]
  },
  {
    name: 'MEDYA & HABER',
    href: '#',
    children: [
      { name: 'Güncel Haberler', href: '/haberler', icon: NewspaperIcon },
      { name: 'Resmi Duyurular', href: '/duyurular', icon: MegaphoneIcon },
      { name: 'Etkinlik Takvimi', href: '/etkinlikler', icon: CalendarDaysIcon },
      { name: 'Basında Güneyyurt', href: '/kurumsal/basinda-biz', icon: GlobeAltIcon },
      { name: 'Hava Durumu', href: '/hava-durumu', icon: CloudIcon },
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
        "fixed left-0 right-0 z-50 transition-all duration-700",
        isScrolled
          ? "top-0 bg-white/95 backdrop-blur-xl shadow-2xl py-5 border-b border-slate-200"
          : "top-0 md:top-10 bg-transparent py-10"
      )}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 lg:px-12" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-4 group">
              <img
                src={isScrolled ? "/belediye-logo.png" : "/belediye-logo-light.png"}
                alt="Güneyyurt Belediyesi"
                className={classNames(
                  "w-auto object-contain transition-all duration-500 group-hover:scale-105",
                  isScrolled ? "h-14 md:h-16" : "h-20 md:h-24"
                )}
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className={classNames(
                "-m-2.5 inline-flex items-center justify-center rounded-xl p-3 transition-colors",
                isScrolled ? "text-slate-900" : (location.pathname === '/' ? "text-white" : "text-slate-900")
              )}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                              {item.children.map((child) => (
                                <div key={child.name} className="relative group/item">
                                  {child.external || child.newTab ? (
                                    <a
                                      href={child.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={() => close()}
                                      className="flex items-center gap-4 group rounded-3xl px-6 py-5 text-sm font-black text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300 uppercase tracking-tight italic"
                                    >
                                      <div className="h-10 w-10 flex-shrink-0 bg-slate-50 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                                        <child.icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors" />
                                      </div>
                                      {child.name}
                                    </a>
                                  ) : (
                                    <Link
                                      to={child.href}
                                      onClick={() => close()}
                                      className="flex items-center gap-4 group rounded-3xl px-6 py-5 text-sm font-black text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300 uppercase tracking-tight italic"
                                    >
                                      <div className="h-10 w-10 flex-shrink-0 bg-slate-50 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                                        <child.icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors" />
                                      </div>
                                      {child.name}
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
                        <Disclosure.Panel className="mt-4 space-y-2 pl-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className="flex items-center gap-4 px-4 py-3 rounded-2xl text-base font-black text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all uppercase italic tracking-tight"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                <child.icon className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                              </div>
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
