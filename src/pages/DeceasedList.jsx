import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { SparklesIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function DeceasedList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeceased = async () => {
      try {
        const res = await axios.get('/api/services/deceased');
        setList(res.data);
      } catch (err) {
        console.error('Failed to fetch deceased list');
      } finally {
        setLoading(false);
      }
    };
    fetchDeceased();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <Seo title="Aramızdan Ayrılanlar | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi vefat ilanları ve defin bilgileri." />

      <div className="bg-slate-900 pt-40 pb-48 text-center px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 z-0"
        >
          <SparklesIcon className="w-full h-full text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Aramızdan Ayrılanlar</h1>
          <div className="h-1.5 w-24 bg-slate-600 mx-auto mt-8 rounded-full"></div>
          <p className="mt-8 text-slate-400 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest leading-loose">Başımız Sağolsun. <br /> "Her nefis ölümü tadacaktır."</p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 -mt-24 relative z-10">
        {loading ? (
          <div className="text-center py-40">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {list.length === 0 && (
              <div className="py-32 text-center bg-white rounded-[3rem] shadow-sm border border-slate-100 italic text-slate-400 font-bold tracking-widest text-[10px]">
                YAYINLANMIŞ İLAN BULUNMAMAKTADIR.
              </div>
            )}
            {list.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row items-center gap-10 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="h-28 w-28 bg-slate-50 rounded-[2rem] flex-shrink-0 flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-105 transition-transform">
                  {item.photoUrl ? (
                    <img src={item.photoUrl} alt={item.name} className="h-full w-full object-cover rounded-[2rem] opacity-70" />
                  ) : (
                    <div className="text-slate-200 text-3xl font-black">◈</div>
                  )}
                </div>

                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter uppercase">{item.name}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{new Date(item.deathDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPinIcon className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Defin: {item.burialPlace || 'Belirtilmedi'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 px-8 py-3 bg-slate-50 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  Mekanı Cennet Olsun
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <p className="text-slate-400 font-medium leading-relaxed max-w-lg mx-auto italic">
            Güneyyurt Belediyesi olarak vefat eden tüm vatandaşlarımıza Allah'tan rahmet, kederli ailelerine sabır ve başsağlığı dileriz.
          </p>
        </div>
      </div>
    </div>
  );
}
