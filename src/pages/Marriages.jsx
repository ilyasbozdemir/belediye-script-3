import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Marriages() {
  const [marriages, setMarriages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarriages = async () => {
      try {
        const res = await axios.get('/api/services/marriages');
        setMarriages(res.data);
      } catch (err) {
        console.error('Failed to fetch marriages');
      } finally {
        setLoading(false);
      }
    };
    fetchMarriages();
  }, []);

  return (
    <div className="bg-white min-h-screen pb-32">
      <Seo title="Mutluluğa 'Evet' Diyenler | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi'nde dünya evine giren çiftlerimiz." />

      <div className="bg-pink-500 pt-40 pb-32 text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <SparklesIcon className="w-full h-full animate-pulse" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Mutluluğa 'Evet' Diyenler</h1>
          <p className="mt-8 text-pink-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80">Belediyemizde yeni bir hayata adım atan çiftlerimizi tebrik ediyoruz.</p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-20">
        {loading ? (
          <div className="text-center py-40">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {marriages.length === 0 && (
              <div className="col-span-full py-24 text-center bg-white rounded-[3rem] shadow-sm border border-pink-100 flex flex-col items-center gap-6">
                <HeartIcon className="h-20 w-20 text-pink-100" />
                <p className="text-pink-300 font-black uppercase tracking-widest text-xs">Henüz yayınlanmış bir kayıt bulunmuyor.</p>
              </div>
            )}
            {marriages.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(219,39,119,0.05)] border border-pink-50 group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={m.photoUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'}
                    alt="Yeni Evli Çift"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-10 text-center">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight uppercase tracking-tighter">{m.husbandName} & {m.wifeName}</h3>
                  <div className="h-1 w-12 bg-pink-100 mx-auto mb-6 rounded-full group-hover:w-24 group-hover:bg-pink-500 transition-all duration-500" />
                  <p className="text-pink-500 font-black text-[10px] uppercase tracking-[0.3em]">{new Date(m.marriageDate).toLocaleDateString('tr-TR')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-32">
        <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-pink-500/10 skew-x-12 translate-x-20" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-10 tracking-tighter uppercase italic">Geleneksel Güneyyurt Düğünleri</h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-3xl mb-12">
              Beldemizde düğünler, asırlık geleneklerin yaşatıldığı, yardımlaşma ve dayanışmanın en güzel örneklerinin sergilendiği kutlamalardır.
              Düğün pilavından kına gecesine, gelin almadan takı törenine kadar her aşama Güneyyurt'un kendine has kültürel dokusunu yansıtır.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-pink-400 font-black uppercase tracking-widest mb-4 italic">Düğün Pilavı</h4>
                <p className="text-sm text-slate-400">Tüm belde halkının davetli olduğu, dev kazanlarda pişirilen geleneksel lezzet.</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-pink-400 font-black uppercase tracking-widest mb-4 italic">Seyirlik Oyunlar</h4>
                <p className="text-sm text-slate-400">Düğün akşamlarında sergilenen yerel tiyatro ve halk oyunları gösterileri.</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-pink-400 font-black uppercase tracking-widest mb-4 italic">Gelin Alma</h4>
                <p className="text-pink-400/50 mb-2">◈◈◈</p>
                <p className="text-sm text-slate-400">Dualar ve maniler eşliğinde, yöresel kıyafetlerin sergilendiği görkemli yürüyüş.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
