import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { RocketLaunchIcon, CheckBadgeIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function ProjectList({ statusFilter }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = statusFilter ? `/api/projects?status=${statusFilter}` : '/api/projects';
    axios.get(url)
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [statusFilter]);

  const statusTitle = statusFilter === 'Biten' ? 'Biten Projeler' :
    statusFilter === 'Devam Eden' ? 'Devam Eden Projeler' :
      statusFilter === 'Planlanan' ? 'Planlanan Projeler' : 'Tüm Projeler';

  const getStatusIcon = (status) => {
    if (status === 'Biten') return <CheckBadgeIcon className="h-5 w-5 text-emerald-500" />;
    if (status === 'Devam Eden') return <RocketLaunchIcon className="h-5 w-5 text-blue-500" />;
    return <AdjustmentsHorizontalIcon className="h-5 w-5 text-slate-400" />;
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <Seo title={`${statusTitle} | Güneyyurt Belediyesi`} description={`Güneyyurt Belediyesi ${statusTitle} sayfası ve yatırım detayları.`} />

      {/* Header Section */}
      <div className="bg-slate-900 pt-52 lg:pt-64 pb-48 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">{statusTitle}</h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
          <p className="mt-8 text-slate-400 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80 leading-relaxed">Güneyyurt'un yarınlarını bugünden inşa ediyoruz.</p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">

        {/* Project Stats Category */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Toplam Yatırım', value: '420M ₺', color: 'text-blue-600' },
            { label: 'Tamamlanan', value: '85+', color: 'text-emerald-600' },
            { label: 'Devam Eden', value: '12', color: 'text-amber-600' },
            { label: 'İstihdam', value: '1,200+', color: 'text-indigo-600' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 text-center"
            >
              <p className={`text-2xl font-black ${stat.color} mb-1 uppercase tracking-tighter`}>{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-40">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Yatırımlar Yükleniyor...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.length === 0 && (
              <div className="col-span-full py-24 text-center bg-white rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center gap-6">
                <RocketLaunchIcon className="h-20 w-20 text-slate-100" />
                <p className="text-slate-300 font-black uppercase tracking-widest text-xs">Bu kategoride henüz yayınlanmış bir proje bulunmuyor.</p>
              </div>
            )}
            {projects.map((project, idx) => (
              <Link key={project.id} to={`/proje/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col group hover:-translate-y-2 transition-transform duration-500 h-full cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800'}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-3 shadow-xl">
                        {getStatusIcon(project.status)}
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{project.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{project.title}</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-4 mb-8">{project.description}</p>

                    <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yatırım Detayı</span>
                      <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <RocketLaunchIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
