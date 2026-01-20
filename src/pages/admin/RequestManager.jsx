import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CheckCircleIcon,
    ClockIcon,
    EnvelopeIcon,
    PhoneIcon,
    TrashIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function RequestManager() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await axios.get('/api/feedback/all');
            setRequests(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch requests');
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/feedback/update-status/${id}`, `"${status}"`, {
                headers: { 'Content-Type': 'application/json' }
            });
            fetchRequests();
        } catch (err) {
            alert('Güncelleme başarısız');
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 uppercase italic">İstek & Şikayet Yönetimi</h1>
                    <p className="text-slate-500 font-medium mt-1">Vatandaşlardan gelen tüm taleplerin takibi.</p>
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {requests.map((req) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group"
                        >
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="lg:w-1/4">
                                    <div className="flex flex-col gap-4">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-center ${req.status === 'Beklemede' ? 'bg-amber-50 text-amber-600' :
                                                req.status === 'İnceleniyor' ? 'bg-blue-50 text-blue-600' :
                                                    'bg-emerald-50 text-emerald-600'
                                            }`}>
                                            {req.status}
                                        </span>
                                        <div className="space-y-2">
                                            <p className="text-sm font-black text-slate-900">{req.fullName}</p>
                                            <p className="text-xs font-bold text-slate-400 flex items-center gap-2"><EnvelopeIcon className="h-4 w-4" /> {req.email}</p>
                                            <p className="text-xs font-bold text-slate-400 flex items-center gap-2"><PhoneIcon className="h-4 w-4" /> {req.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest">{req.category}</span>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{new Date(req.createdDate).toLocaleString('tr-TR')}</p>
                                        <span className="ml-auto text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic">KOD: {req.trackingCode}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 italic tracking-tight uppercase leading-none">{req.subject}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{req.message}</p>
                                </div>

                                <div className="lg:w-1/4 flex lg:flex-col gap-3 justify-end lg:justify-center">
                                    <button
                                        onClick={() => updateStatus(req.id, 'İnceleniyor')}
                                        className="flex-1 lg:flex-none py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        İncelemeye Al
                                    </button>
                                    <button
                                        onClick={() => updateStatus(req.id, 'Tamamlandı')}
                                        className="flex-1 lg:flex-none py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        Çözüldü Olarak İşaretle
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {requests.length === 0 && (
                        <div className="bg-white p-20 rounded-[3rem] text-center border border-slate-100 border-dashed">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Henüz bir başvuru bulunmuyor.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
