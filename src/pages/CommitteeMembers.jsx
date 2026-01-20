import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    UserGroupIcon,
    ShieldCheckIcon,
    BriefcaseIcon,
    ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';



export default function CommitteeMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await axios.get('/api/governance/committees');
                setMembers(res.data);
            } catch (err) {
                console.error('Failed to fetch committee members');
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Belediye Encümeni | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi Encümen Üyeleri ve karar alma organlarımız." />

            {/* Hero Header */}
            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Belediye Encümeni</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg uppercase tracking-widest leading-loose">Yürütme ve İcra Organımız, Güneyyurt'un Günlük Yönetim Merkezi.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">

                {/* Info Box */}
                <div className="bg-white p-12 lg:p-20 rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/50 mb-20 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="h-20 w-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 shrink-0">
                            <ShieldCheckIcon className="h-10 w-10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-4">Görev ve Yetkiler</h2>
                            <p className="text-slate-500 font-medium leading-[2] text-lg lg:max-w-4xl">
                                Belediye encümeni, 5393 Sayılı Belediye Kanunu'nun 33. maddesi gereğince haftalık kararlar alan, bütçe denetimi, kamulaştırma ve ihale süreçlerini yöneten en üst icra organıdır.
                            </p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-40">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {members.length === 0 && (
                            <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-slate-100 font-black text-slate-300 uppercase tracking-[0.3em] text-xs">
                                Encümen Üyesi Bilgisi Henüz Girilmemiştir.
                            </div>
                        )}
                        {members.map((member, idx) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
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
                                <p className="text-blue-600 group-hover:text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] mb-8">{member.role || member.title}</p>

                                <div className="mt-auto pt-8 border-t border-slate-50 group-hover:border-white/10 w-full flex justify-center gap-4">
                                    <BriefcaseIcon className="h-5 w-5 text-slate-200 group-hover:text-white/40" />
                                    <span className="text-[10px] font-black text-slate-300 group-hover:text-white/30 uppercase tracking-widest">Encümen Üyesi</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Meeting Section */}
                <div className="mt-32 bg-blue-900 rounded-[5rem] p-16 lg:p-32 text-center relative overflow-hidden text-white shadow-2xl">
                    <div className="absolute top-0 right-0 h-full w-1/4 bg-white/5 skew-x-12 translate-x-20" />
                    <UserGroupIcon className="h-20 w-20 text-blue-500 mx-auto mb-10 opacity-40 animate-pulse" />
                    <h4 className="text-5xl font-black mb-8 uppercase tracking-tighter italic leading-tight">Yönetimde <br />Şeffaflık</h4>
                    <p className="text-xl text-blue-100 font-medium leading-[2.2] max-w-3xl mx-auto mb-16 opacity-80 italic">Güneyyurt'un kaynaklarını, belediye kanunlarının bizlere verdiği yetkiler çerçevesinde en verimli ve hesap verilebilir şekilde yönetiyoruz. Tüm yönetim süreçlerimiz kamu denetimine açıktır.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="px-16 py-6 bg-white text-blue-900 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform">Encümen Gündemleri</button>
                        <button className="px-16 py-6 bg-blue-800 text-white border border-blue-700 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all">Soru ve Öneriler</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
