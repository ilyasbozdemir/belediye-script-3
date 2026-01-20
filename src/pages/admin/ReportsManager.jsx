import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    DocumentArrowDownIcon,
    TrashIcon,
    PlusIcon,
    DocumentCheckIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ReportsManager() {
    const [activeTab, setActiveTab] = useState('reports'); // reports, plans
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'reports' ? '/api/governance/reports' : '/api/strategicplan';
            const res = await axios.get(endpoint);
            setData(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        if (!confirm('Silmek istediğinize emin misiniz?')) return;
        try {
            const endpoint = activeTab === 'reports' ? '/api/governance/reports' : '/api/strategicplan';
            await axios.delete(`${endpoint}/${id}`);
            fetchData();
        } catch (err) {
            alert('Silme başarısız');
        }
    };

    return (
        <div className="space-y-8">
            <header className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 uppercase italic">Kurumsal Döküman Yönetimi</h1>
                    <p className="text-slate-500 font-medium mt-1">Stratejik Planlar ve Faaliyet Raporları arşivi.</p>
                </div>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'reports' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Faaliyet Raporları
                    </button>
                    <button
                        onClick={() => setActiveTab('plans')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'plans' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Stratejik Planlar
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {data.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-8 group hover:shadow-xl transition-all"
                    >
                        <div className="h-20 w-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shrink-0">
                            <DocumentCheckIcon className="h-10 w-10" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-black text-slate-900 truncate uppercase italic tracking-tighter">{item.title}</h3>
                            <p className="text-sm font-bold text-slate-400 mt-1">{activeTab === 'reports' ? item.date && new Date(item.date).getFullYear() : item.yearRange}</p>
                            <div className="flex items-center gap-4 mt-4">
                                <a href={item.fileUrl} target="_blank" className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all">Dökümanı Gör</a>
                                <button onClick={() => deleteItem(item.id)} className="text-[10px] font-black uppercase text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all">Kaldır</button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 hover:border-blue-300 hover:bg-blue-50 group transition-all cursor-pointer min-h-[160px]">
                    <PlusIcon className="h-10 w-10 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 group-hover:text-blue-600">Yeni Döküman Yükle</p>
                </div>
            </div>
        </div>
    );
}
