import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, CloudIcon, MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function WeatherPrayerManager() {
    const [data, setData] = useState({
        city: 'Karaman',
        district: 'Ermenek',
        lastWeatherTemp: '14',
        lastWeatherDesc: 'Açık',
        prayerImsak: '05:42',
        prayerGunes: '07:12',
        prayerOgle: '12:54',
        prayerIkindi: '15:42',
        prayerAksam: '18:12',
        prayerYatsi: '19:42'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/sitesettings/weather-prayer');
            setData(res.data);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post('/api/sitesettings/weather-prayer', data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            alert('Hata oluştu!');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-20 text-center text-slate-400">Yükleniyor...</div>;

    return (
        <div className="p-8 lg:p-12">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Hava Durumu & Vakit Yönetimi</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Portal üzerindeki anlık verileri buradan güncelleyin.</p>
                </div>
                {success && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                        <CheckCircleIcon className="h-4 w-4" /> Başarıyla Kaydedildi
                    </motion.div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
                {/* Location & Weather */}
                <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                    <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
                        <SunIcon className="h-8 w-8 text-blue-600" />
                        <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">Konum ve Hava Durumu</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Şehir</label>
                            <input type="text" value={data.city} onChange={e => setData({ ...data, city: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">İlçe</label>
                            <input type="text" value={data.district} onChange={e => setData({ ...data, district: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sıcaklık (°C)</label>
                            <input type="text" value={data.lastWeatherTemp} onChange={e => setData({ ...data, lastWeatherTemp: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Durum Metni</label>
                            <input type="text" value={data.lastWeatherDesc} onChange={e => setData({ ...data, lastWeatherDesc: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Prayer Times */}
                <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white">
                    <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                        <MoonIcon className="h-8 w-8 text-blue-400" />
                        <h3 className="text-xl font-black uppercase italic tracking-tight">Namaz Vakitleri</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {['Imsak', 'Gunes', 'Ogle', 'Ikindi', 'Aksam', 'Yatsi'].map(v => (
                            <div key={v}>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{v}</label>
                                <input
                                    type="text"
                                    value={data[`prayer${v}`]}
                                    onChange={e => setData({ ...data, [`prayer${v}`]: e.target.value })}
                                    className="w-full px-6 py-4 bg-white/5 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-400 text-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        disabled={saving}
                        className="px-16 py-6 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50"
                    >
                        {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
}
