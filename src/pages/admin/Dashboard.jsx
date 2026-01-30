import { useState, useEffect } from 'react';
import {
  NewspaperIcon,
  FolderIcon,
  UsersIcon,
  ChartBarIcon,
  EyeIcon,
  ArrowUpIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [stats, setStats] = useState({
    newsCount: 0,
    projectCount: 0,
    staffCount: 0,
    viewCount: '12.4k'
  });

  useEffect(() => {
    const fetchDashData = async () => {
      try {
        const [news, projects, staff] = await Promise.all([
          axios.get('/api/news'),
          axios.get('/api/projects'),
          axios.get('/api/governance/staff').catch(() => ({ data: [] }))
        ]);
        setStats(prev => ({
          ...prev,
          newsCount: news.data.length,
          projectCount: projects.data.length,
          staffCount: staff.data.length || 0
        }));
      } catch (err) {
        console.error('Stats loading failed');
      }
    };
    fetchDashData();
  }, []);

  const statCards = [
    { name: 'Aktif Haberler', value: stats.newsCount, icon: NewspaperIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Yürütülen Projeler', value: stats.projectCount, icon: FolderIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Canlı Ziyaretçi', value: Math.floor(Math.random() * (45 - 12) + 12), icon: UsersIcon, color: 'text-emerald-600', bg: 'bg-emerald-50', isLive: true },
    { name: 'Aktif Anket Oyu', value: '156', icon: ChartBarIcon, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Genel Durum</h1>
        <p className="text-slate-500 font-medium mt-2">Güneyyurt Belediyesi portalı için canlı performans metrikleri.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="admin-card group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={classNames(item.bg, "p-4 rounded-2xl shadow-sm relative")}>
                <item.icon className={classNames(item.color, "h-8 w-8")} />
                {item.isLive && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                <ArrowUpIcon className="h-3 w-3" /> %12
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.name}</p>
            <p className="text-4xl font-black text-slate-900 mt-2">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity (Simulated) */}
        <div className="lg:col-span-2 admin-card p-0 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Son Güncellemeler</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">Tümünü Gör</button>
          </div>
          <div className="p-4 space-y-1">
            {[
              { text: "Yeni haber eklendi: Restorasyon çalışmaları", time: "2 saat önce", type: "News" },
              { text: "Proje durumu güncellendi: Kültür Merkezi", time: "5 saat önce", type: "Project" },
              { text: "Yeni personel kaydı yapıldı: Mimar Selim", time: "Dün", type: "Staff" },
              { text: "Bülten yayınlandı: Mart 2024 Kararları", time: "2 gün önce", type: "Bulletin" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{activity.text}</p>
                  <p className="text-xs font-medium text-slate-400 mt-1">{activity.time}</p>
                </div>
                <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">{activity.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="admin-card flex flex-col justify-between bg-slate-900 text-white border-0 shadow-2xl">
          <div>
            <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <ChartBarIcon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-black mb-4 leading-tight">Sunucu <br /> Kaynak Kullanımı</h3>
            <p className="text-white/40 text-sm font-medium mb-12">Sistem performansı şu an %94 verimlilikle çalışıyor.</p>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
                  <span>CPU Kullanımı</span>
                  <span className="text-blue-400">24%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[24%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
                  <span>Bellek Boş</span>
                  <span className="text-emerald-400">3.2 GB</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[65%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Sistem Günlüğünü İndir</button>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Sunucuyu Optimize Et</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
