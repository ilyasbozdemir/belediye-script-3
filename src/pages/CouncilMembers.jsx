import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ShieldCheckIcon,
  ScaleIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export default function CouncilMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('/api/Council');
        setMembers(res.data);
      } catch (err) {
        console.error('Failed to fetch council members');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <Seo title="Belediye Meclisi | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi Meclis Üyeleri, komisyonlar ve karar alma organlarımız." />

      {/* Hero Header */}
      <div className="bg-slate-900 pt-52 lg:pt-64 pb-48 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Belediye Meclisimiz</h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
          <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest leading-loose">Demokrasinin Yereldeki Gücü, Güneyyurt'un Karar Merkezi.</p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <ScaleIcon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">15</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meclis Üyesi</p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShieldCheckIcon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">08</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İhtisas Komisyonu</p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <UserGroupIcon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">02</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Siyasi Parti Grubu</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-40">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {members.length === 0 && (
              <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-slate-100 font-black text-slate-300 uppercase tracking-[0.3em] text-xs">
                Meclis Üyesi Bilgisi Henüz Girilmemiştir.
              </div>
            )}
            {members.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-[3rem] p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center text-center group hover:bg-slate-900 transition-all duration-500"
              >
                <div className="h-40 w-40 bg-slate-100 rounded-[3rem] flex items-center justify-center mb-10 overflow-hidden ring-8 ring-white shadow-xl group-hover:ring-slate-800 transition-all">
                  <img
                    src={member.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                    alt={member.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-white transition-colors mb-2 uppercase tracking-tight italic leading-tight">{member.name}</h3>
                <p className="text-blue-600 group-hover:text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] mb-8">{member.title || 'Meclis Üyesi'}</p>

                <div className="mt-auto flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20">
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                  </button>
                  <button className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 font-black text-[10px]">
                    CV
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Meeting Info Section */}
        <div className="mt-32 bg-blue-600 rounded-[4rem] p-16 lg:p-24 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-white/5 skew-x-12 translate-x-20" />
          <div className="relative z-10 max-w-3xl">
            <h4 className="text-4xl font-black mb-8 uppercase tracking-tighter italic">Meclis Toplantıları</h4>
            <p className="text-xl font-medium leading-[2] opacity-90 mb-12">
              Belediye meclisimiz her ayın ilk haftasında mutat olarak toplanmaktadır. Toplantılarımız tüm Güneyyurt halkına açık olup, alınan kararlar web sitemiz üzerinden şeffaf bir şekilde paylaşılmaktadır.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="px-10 py-5 bg-white text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">Son Kararları İncele</button>
              <button className="px-10 py-5 bg-blue-700 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500 hover:bg-blue-800 transition-all">Gündem Arşivi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
