import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  NewspaperIcon,
  ArrowLeftOnRectangleIcon,
  FolderIcon,
  DocumentDuplicateIcon,
  ChartBarSquareIcon,
  BuildingLibraryIcon,
  MegaphoneIcon,
  ArchiveBoxIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  StarIcon,
  SparklesIcon,
  CloudIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const adminNavigation = [
  {
    category: 'GENEL BAKIŞ',
    items: [
      { name: 'Kontrol Paneli', href: '/admin', icon: HomeIcon },
      { name: 'İstek & Şikayetler', href: '/admin/requests', icon: ChatBubbleLeftRightIcon },
    ]
  },
  {
    category: 'İÇERİK YÖNETİMİ',
    items: [
      { name: 'Haber & Duyuru', href: '/admin/news', icon: NewspaperIcon },
      { name: 'Duyurular', href: '/admin/announcements', icon: MegaphoneIcon },
      { name: 'Etkinlik Takvimi', href: '/admin/events', icon: CalendarDaysIcon },
      { name: 'Belediye İştirakleri', href: '/admin/businesses', icon: BuildingOfficeIcon },
      { name: 'Medya Yönetimi', href: '/admin/media', icon: PhotoIcon },
      { name: 'Anket Yönetimi', href: '/admin/surveys', icon: ChartBarSquareIcon },
      { name: 'Slayt & Ayarlar', href: '/admin/settings', icon: Cog6ToothIcon },
      { name: 'Önemli Günler', href: '/admin/special-days', icon: SparklesIcon },
      { name: 'Hava Durumu & Vakitler', href: '/admin/weather-prayer', icon: CloudIcon },
    ]
  },
  {
    category: 'KURUMSAL YAPI',
    items: [
      { name: 'Başkan & Meclis', href: '/admin/president', icon: BuildingLibraryIcon },
      { name: 'Personel & Birimler', href: '/admin/staff', icon: UsersIcon },
      { name: 'Projeler & Yatırım', href: '/admin/projects', icon: FolderIcon },
      { name: 'Raporlar & Planlar', href: '/admin/reports', icon: ChartBarSquareIcon },
    ]
  },
  {
    category: 'HİZMET MASASI',
    items: [
      { name: 'Evlendirme & Vefat', href: '/admin/life-events', icon: ArchiveBoxIcon },
      { name: 'İhale Yönetimi', href: '/admin/tenders', icon: DocumentDuplicateIcon },
      { name: 'İş Hanı / Dükkanlar', href: '/admin/is-hani', icon: BuildingLibraryIcon },
    ]
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4 ring-1 ring-white/10 shadow-2xl">
                  <div className="flex h-24 shrink-0 items-center gap-3">
                    <img src="/belediye-logo.png" className="h-10 w-auto brightness-0 invert" alt="Logo" />
                    <span className="text-white font-black tracking-tight text-xl italic uppercase">Panel</span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      {adminNavigation.map((group) => (
                        <li key={group.category}>
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">{group.category}</div>
                          <ul role="list" className="-mx-2 space-y-1">
                            {group.items.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={classNames(
                                    location.pathname === item.href
                                      ? 'bg-blue-600 text-white shadow-lg'
                                      : 'text-slate-400 hover:text-white hover:bg-slate-800',
                                    'group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-bold transition-all'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto border-t border-white/5 pt-4">
                    <button
                      onClick={handleLogout}
                      className="group -mx-2 flex w-full gap-x-3 rounded-2xl p-3 text-sm font-bold leading-6 text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      Güvenli Çıkış
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className={classNames(
        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-500 ease-in-out",
        isCollapsed ? "lg:w-24" : "lg:w-80"
      )}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-slate-100 px-8 pb-4 shadow-[20px_0_30px_rgba(0,0,0,0.01)] relative">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-10 h-6 w-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm z-50 hover:bg-blue-600 hover:text-white transition-all text-slate-400"
          >
            {isCollapsed ? <Bars3Icon className="h-3 w-3" /> : <XMarkIcon className="h-3 w-3" />}
          </button>

          <div className={classNames("flex h-24 shrink-0 items-center justify-center gap-4 transition-all duration-500", isCollapsed ? "px-0" : "px-4")}>
            <img
              src={isCollapsed ? "/belediye-logo-yazisiz.png" : "/belediye-logo.png"}
              className={classNames("h-14 w-auto object-contain transition-all duration-500", isCollapsed ? "scale-90" : "scale-100")}
              alt="Logo"
            />
          </div>
          <nav className="flex flex-1 flex-col mt-4 overflow-x-hidden">
            <ul role="list" className="flex flex-1 flex-col gap-y-8">
              {adminNavigation.map((group) => (
                <li key={group.category}>
                  {!isCollapsed && (
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4 transition-all opacity-100 whitespace-nowrap">{group.category}</div>
                  )}
                  <ul role="list" className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          title={isCollapsed ? item.name : undefined}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50',
                            'group flex gap-x-3 rounded-2xl p-4 text-sm leading-6 font-bold transition-all duration-200',
                            isCollapsed ? 'justify-center p-4' : 'px-4'
                          )}
                        >
                          <item.icon className={classNames(
                            location.pathname === item.href ? 'text-white' : 'text-slate-400 group-hover:text-blue-600',
                            'h-6 w-6 shrink-0 transition-colors'
                          )} aria-hidden="true" />
                          {!isCollapsed && <span className="transition-all opacity-100 whitespace-nowrap">{item.name}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-2 pb-6">
            {!isCollapsed && (
              <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 transition-all opacity-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Sistem Durumu</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">Aktif • 45ms</p>
              </div>
            )}

            <button
              onClick={handleLogout}
              className={classNames(
                "flex w-full gap-x-3 rounded-[1.25rem] p-4 text-sm font-bold leading-6 text-red-500 hover:bg-red-50 transition-all",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0 transition-colors" aria-hidden="true" />
              {!isCollapsed && <span>Güvenli Çıkış</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={classNames(
        "transition-all duration-500 ease-in-out flex flex-col min-h-screen",
        isCollapsed ? "lg:pl-24" : "lg:pl-80"
      )}>
        <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between bg-white/70 backdrop-blur-md px-6 sm:px-8 lg:px-12 border-b border-slate-100/50">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-slate-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-col">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight uppercase italic leading-none">
                {adminNavigation.flatMap(g => g.items).find(n => n.href === location.pathname)?.name || 'Kontrol Paneli'}
              </h2>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1">Yönetim Merkesi</p>
            </div>
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-8">
            <div className="flex flex-col text-right hidden lg:flex">
              <span className="text-sm font-black text-slate-900 leading-none">Yönetici</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Sistem Çevrimiçi</span>
            </div>
            <Link to="/admin/profile" className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner group hover:bg-blue-50 transition-all cursor-pointer">
              <UsersIcon className="h-6 w-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </header>

        <main className="flex-1 py-12 px-6 sm:px-8 lg:px-12 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
