import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news?category=Haber')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <Seo
        title="Belediye Haberleri | Güneyyurt Belediyesi"
        description="Güneyyurt Belediyesi'nden en son haberler, etkinlikler ve duyurular."
      />

      {/* Header Section */}
      <div className="bg-slate-900 pt-32 pb-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Belediye Haberleri</h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
          <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg">Güneyyurt'tan en güncel gelişmeler, tamamlanan projeler ve duyuruları buradan takip edebilirsiniz.</p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Haberler Yükleniyor...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.length === 0 && (
              <div className="col-span-full py-32 text-center bg-white rounded-[3rem] shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold">Henüz yayınlanmış bir haber bulunmuyor.</p>
              </div>
            )}

            {news.map((item, idx) => (
              <Link key={item.id} to={`/haber/${item.id}`} className="flex">
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 group w-full cursor-pointer h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden text-center md:text-left">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800'}
                      alt={item.title}
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                        Güncel
                      </span>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date(item.createdDate).toLocaleDateString('tr-TR')}
                      </div>
                      <div className="flex items-center gap-2 text-center">
                        <ClockIcon className="h-4 w-4" />
                        {new Date(item.createdDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-6 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 mb-10">
                      {item.content}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-widest group/btn">
                        Devamını Oku
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all">
                          <ArrowRightIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
