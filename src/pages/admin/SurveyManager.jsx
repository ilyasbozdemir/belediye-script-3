import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChartBarIcon,
    PlusIcon,
    TrashIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ChartPieIcon
} from '@heroicons/react/24/outline';

export default function SurveyManager() {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        options: [
            { id: 1, label: '', votes: 0 },
            { id: 2, label: '', votes: 0 }
        ],
        isActive: true
    });

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        setLoading(true);
        try {
            // Simulated API call - In a real app, replace with actual endpoint
            // const res = await axios.get('/api/surveys');
            // setSurveys(res.data);

            // Mock data for demonstration
            setSurveys([
                {
                    id: 1,
                    question: 'Güneyyurt Belediyesi\'nden beklentiniz nedir?',
                    isActive: true,
                    totalVotes: 156,
                    options: [
                        { id: 1, label: 'Yeni Rekreasyon Alanları', percentage: 42, votes: 65 },
                        { id: 2, label: 'Dijital Hizmetlerin Artırılması', percentage: 28, votes: 44 },
                        { id: 3, label: 'Kültürel ve Sanat Aktiviteleri', percentage: 18, votes: 28 },
                        { id: 4, label: 'Tarımsal Destek Programları', percentage: 12, votes: 19 },
                    ]
                }
            ]);
        } catch (err) {
            console.error('Anketler yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const handleAddOption = () => {
        setFormData({
            ...formData,
            options: [
                ...formData.options,
                { id: Date.now(), label: '', votes: 0 }
            ]
        });
    };

    const handleRemoveOption = (id) => {
        if (formData.options.length <= 2) return;
        setFormData({
            ...formData,
            options: formData.options.filter(opt => opt.id !== id)
        });
    };

    const handleOptionChange = (id, value) => {
        setFormData({
            ...formData,
            options: formData.options.map(opt => opt.id === id ? { ...opt, label: value } : opt)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // In a real app:
        // await axios.post('/api/surveys', formData);
        alert('Anket kaydedildi (Simülasyon)');
        setShowForm(false);
        fetchSurveys();
    };

    const toggleStatus = async (id) => {
        // In a real app:
        // await axios.patch(`/api/surveys/${id}/toggle`);
        setSurveys(surveys.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
    };

    const deleteSurvey = async (id) => {
        if (!confirm('Anket silinecek, emin misiniz?')) return;
        // In a real app:
        // await axios.delete(`/api/surveys/${id}`);
        setSurveys(surveys.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-[2.5rem] shadow-lg border border-purple-500/20">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase italic tracking-tight">
                            Anket & Katılımcı Yönetimi
                        </h1>
                        <p className="text-purple-100 font-medium mt-2">
                            Vatandaşların görüşlerini toplayın ve analiz edin.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={fetchSurveys}
                            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all"
                        >
                            <ArrowPathIcon className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => setShowSurveys(!showForm)}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-2xl font-bold transition-all shadow-xl hover:scale-105"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Yeni Anket
                        </button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Survey List */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="flex justify-center p-20 bg-white rounded-[3rem] border border-slate-100">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                        </div>
                    ) : surveys.length > 0 ? (
                        surveys.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                                {item.isActive ? 'Yayında' : 'Taslak'}
                                            </span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                <ChartBarIcon className="h-4 w-4" />
                                                {item.totalVotes} Oy
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 italic tracking-tight leading-tight">
                                            {item.question}
                                        </h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleStatus(item.id)}
                                            className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all"
                                            title={item.isActive ? 'Yayından Kaldır' : 'Yayınla'}
                                        >
                                            <CheckCircleIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteSurvey(item.id)}
                                            className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                                            title="Sil"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Results Preview */}
                                <div className="space-y-3">
                                    {item.options.map(opt => (
                                        <div key={opt.id} className="space-y-1">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                                                <span>{opt.label}</span>
                                                <span className="text-slate-900">{opt.percentage}% ({opt.votes})</span>
                                            </div>
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${opt.percentage}%` }}
                                                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                            <ChartPieIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Henüz bir anket oluşturulmamış.</p>
                        </div>
                    )}
                </div>

                {/* New Survey Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50 sticky top-12">
                        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-8">Yeni Anket</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="admin-label">Soru</label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Vatandaşlara ne sormak istersiniz?"
                                    className="admin-input w-full resize-none"
                                    value={formData.question}
                                    onChange={e => setFormData({ ...formData, question: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="admin-label">Seçenekler</label>
                                    <button
                                        type="button"
                                        onClick={handleAddOption}
                                        className="text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline"
                                    >
                                        + Seçenek Ekle
                                    </button>
                                </div>
                                {formData.options.map((opt, index) => (
                                    <div key={opt.id} className="flex gap-2">
                                        <input
                                            required
                                            type="text"
                                            placeholder={`Seçenek ${index + 1}`}
                                            className="admin-input flex-1"
                                            value={opt.label}
                                            onChange={e => handleOptionChange(opt.id, e.target.value)}
                                        />
                                        {formData.options.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveOption(opt.id)}
                                                className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-200">
                                Anketi Oluştur
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function XMarkIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}
