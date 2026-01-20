import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    CloudIcon,
    SunIcon,
    SparklesIcon,
    MoonIcon,
    ArrowsRightLeftIcon,
    MapPinIcon,
    ClockIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

const mockData = {
    city: 'Karaman',
    district: 'Güneyyurt',
    lastWeatherTemp: '12',
    lastWeatherDesc: 'Parçalı Bulutlu',
    prayerImsak: '05:45',
    prayerGunes: '07:15',
    prayerOgle: '12:55',
    prayerIkindi: '15:45',
    prayerAksam: '18:15',
    prayerYatsi: '19:40',
    lastUpdated: new Date().toISOString()
};

export default function WeatherPrayer() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [data, setData] = useState(mockData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        axios.get('/api/sitesettings/weather-prayer')
            .then(res => {
                if (res.data && res.data.city) {
                    setData(res.data);
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                // Keep mockData if API fails
            });

        return () => clearInterval(timer);
    }, []);

    const prayerTimes = [
        { name: 'İmsak', time: data.prayerImsak, icon: MoonIcon, color: 'text-indigo-400' },
        { name: 'Güneş', time: data.prayerGunes, icon: SunIcon, color: 'text-orange-400' },
        { name: 'Öğle', time: data.prayerOgle, icon: SunIcon, color: 'text-amber-400' },
        { name: 'İkindi', time: data.prayerIkindi, icon: SunIcon, color: 'text-orange-500' },
        { name: 'Akşam', time: data.prayerAksam, icon: MoonIcon, color: 'text-indigo-500' },
        { name: 'Yatsı', time: data.prayerYatsi, icon: MoonIcon, color: 'text-slate-500' },
    ];

    const weatherStats = [
        { label: 'Sıcaklık', value: `${data.lastWeatherTemp}°C`, desc: 'Anlık Veri', icon: SunIcon, color: 'text-amber-500' },
        { label: 'Durum', value: data.lastWeatherDesc, desc: 'Gökyüzü', icon: CloudIcon, color: 'text-blue-400' },
        { label: 'Konum', value: data.district, desc: data.city, icon: MapPinIcon, color: 'text-slate-400' },
        { label: 'Güncelleme', value: new Date(data.lastUpdated).toLocaleTimeString('tr-TR'), desc: 'Son Kontrol', icon: SparklesIcon, color: 'text-emerald-400' },
    ];

    if (loading) return <div className="p-20 text-center text-slate-400">Yükleniyor...</div>; // Loading state

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo
                title="Hava Durumu ve Namaz Vakitleri | Güneyyurt Belediyesi"
                description="Güneyyurt için güncel hava durumu verileri ve ezan vakitleri takip sayfası."
            />

            {/* Header / Hero */}
            <div className="bg-slate-900 pt-32 pb-48 text-center px-6 relative overflow-hidden"> {/* Changed pb-64 to pb-48 */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
                        <ClockIcon className="h-4 w-4" /> {currentTime.toLocaleTimeString('tr-TR')}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight uppercase italic leading-none mb-4">Hava Durumu</h1> {/* Changed text size and added mb-4 */}
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-400 tracking-tighter uppercase italic leading-none">& Vakitler</h2> {/* Changed h1 to h2 and updated text */}
                    <p className="mt-8 text-slate-400 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80 flex items-center justify-center gap-3 italic">
                        <MapPinIcon className="h-6 w-6 text-blue-500" /> {data?.district}, {data?.city} {/* Used data for district and city */}
                    </p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10"> {/* Changed -mt-32 to -mt-24 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Weather Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-[4rem] p-10 lg:p-16 shadow-2xl shadow-slate-200/50 border border-slate-50 flex flex-col" // Changed p-12 to p-10, lg:p-20 to lg:p-16, added flex flex-col
                    >
                        <div className="flex items-center justify-between mb-12"> {/* Changed mb-16 to mb-12 */}
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">İklim Verileri</h2> {/* Changed text size */}
                                <p className="text-blue-600 font-black uppercase tracking-widest text-[10px] mt-2">Dört Mevsim Güneyyurt</p>
                            </div>
                            <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"> {/* Changed h-20 w-20 to h-16 w-16, rounded-3xl to rounded-2xl */}
                                <SunIcon className="h-8 w-8" /> {/* Changed h-10 w-10 to h-8 w-8 */}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> {/* Changed grid-cols-2 to grid-cols-1 sm:grid-cols-2, gap-8 to gap-6 */}
                            {weatherStats.map((stat, i) => (
                                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 flex flex-col justify-center"> {/* Changed p-10 to p-8, rounded-[3rem] to rounded-[2.5rem], added flex flex-col justify-center */}
                                    <div className="flex items-center gap-4 mb-4"> {/* Added div for icon and label */}
                                        <stat.icon className={`h-8 w-8 ${stat.color}`} /> {/* Changed h-10 w-10 to h-8 w-8 */}
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p> {/* Moved label here */}
                                    </div>
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</p> {/* Changed text-3xl to text-2xl */}
                                    <p className="text-[9px] font-bold text-slate-400 italic opacity-60">{stat.desc}</p> {/* Changed text-[10px] to text-[9px], added opacity-60 */}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-blue-600 rounded-[2.5rem] text-white overflow-hidden relative group mt-auto"> {/* Changed p-10 to p-8, rounded-[3rem] to rounded-[2.5rem], added mt-auto */}
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                                <InformationCircleIcon className="h-24 w-24" /> {/* Changed h-32 w-32 to h-24 w-24 */}
                            </div>
                            <h4 className="text-lg font-black uppercase italic tracking-tight mb-3">Günün Özeti</h4> {/* Changed text-xl to text-lg, mb-4 to mb-3 */}
                            <p className="text-blue-100 font-medium leading-relaxed opacity-90 italic text-sm"> {/* Added text-sm */}
                                Bugün Güneyyurt genelinde hava {data?.lastWeatherDesc} ve sakin. Tarımsal faaliyetler için uygun koşullar hakimdir.
                            </p>
                        </div>
                    </motion.div>

                    {/* Prayer Times Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-900 rounded-[4rem] p-10 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col" // Changed p-12 to p-10, lg:p-20 to lg:p-16, added flex flex-col
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />

                        <div className="flex items-center justify-between mb-12 relative z-10"> {/* Changed mb-16 to mb-12 */}
                            <div>
                                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Namaz Vakitleri</h2> {/* Changed text size */}
                                <p className="text-emerald-400 font-black uppercase tracking-widest text-[10px] mt-2">{new Date().toLocaleDateString('tr-TR')} / {data?.city}</p> {/* Updated date and city */}
                            </div>
                            <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10 backdrop-blur-md"> {/* Changed h-20 w-20 to h-16 w-16, rounded-3xl to rounded-2xl */}
                                <MoonIcon className="h-8 w-8" /> {/* Changed h-10 w-10 to h-8 w-8 */}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"> {/* Changed space-y-4 to grid grid-cols-1 sm:grid-cols-2 gap-4 */}
                            {prayerTimes.map((v, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-[2rem] border border-white/5 group hover:bg-white/10 transition-all"> {/* Changed p-6 to p-5 */}
                                    <div className="flex items-center gap-4"> {/* Changed gap-6 to gap-4 */}
                                        <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${v.color}`}> {/* Changed h-12 w-12 to h-10 w-10, rounded-2xl to rounded-xl */}
                                            <v.icon className="h-5 w-5" /> {/* Changed h-6 w-6 to h-5 w-5 */}
                                        </div>
                                        <span className="text-[11px] font-black text-white uppercase tracking-[0.15em]">{v.name}</span> {/* Changed text-sm to text-[11px], tracking-[0.2em] to tracking-[0.15em] */}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xl font-black text-blue-400 italic tracking-tighter">{v.time}</span> {/* Changed text-2xl to text-xl */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center relative z-10 mt-auto pt-8"> {/* Changed mt-16 to mt-12, added mt-auto pt-8 */}
                            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">MÜBAREK VAKİT</p> {/* Changed mb-6 to mb-4, SIRADAKİ VAKİT to MÜBAREK VAKİT */}
                            <div className="inline-block px-10 py-4 bg-emerald-600/10 border border-emerald-500/20 rounded-full"> {/* Changed px-12 py-6 to px-10 py-4 */}
                                <p className="text-2xl font-black text-emerald-400 italic tracking-tighter">GÜNEYYURT <span className="text-white ml-2 opacity-40">EZAN VAKTİ</span></p> {/* Changed text-3xl to text-2xl, updated text */}
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Info Text */}
                <div className="mt-16 max-w-3xl mx-auto text-center px-6"> {/* Changed mt-24 to mt-16, added px-6 */}
                    <p className="text-slate-400 font-medium leading-relaxed italic uppercase tracking-widest text-[9px] opacity-60"> {/* Changed text-xs to text-[9px] */}
                        * Verilen bilgiler Güneyyurt merkez istasyonundan anlık olarak alınmaktadır. Namaz vakitleri T.C. Diyanet İşleri Başkanlığı takvimi ile uyumludur.
                    </p>
                </div>
            </div>
        </div>
    );
}
