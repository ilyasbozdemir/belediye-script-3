import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    PhotoIcon,
    MapPinIcon,
    SunIcon,
    SparklesIcon,
    CakeIcon,
    HomeIcon
} from '@heroicons/react/24/outline';

const places = [
    {
        title: 'İkizin Kaya Mezarları',
        desc: 'Beldemizin en önemli antik miraslarından biri. Kayalara oyulmuş bu yapılar, tarihin derinliklerini günümüze taşıyor.',
        img: 'https://images.unsplash.com/photo-1541810232773-6784534346bb?auto=format&fit=crop&q=80&w=600'
    },
    {
        title: 'Kuşakpınar Alaca İn',
        desc: 'Kuşakpınar mevkisinde bulunan kaya kiliseleri ve antik yerleşim kalıntıları, doğa ve tarih severleri bekliyor.',
        img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600'
    },
    {
        title: 'Ermenek Baraj Gölü',
        desc: 'Beldemize komşu, turkuaz rengi sularıyla muhteşem bir manzara sunan baraj gölünde huzuru bulacaksınız.',
        img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=2000'
    }
];

const foods = [
    { name: 'Güneyyurt Batırığı', desc: 'İlçemizin en meşhur lezzeti. Kavrulmuş fıstık, bulgur ve taze sebzelerle hazırlanan eşsiz bir şifa kaynağı.' },
    { name: 'Tarhana Başı (Bulgurca)', desc: 'Geleneksel yöntemlerle hazırlanan, bereketli sofralarımızın vazgeçilmez kış lezzeti.' },
    { name: 'Cevizli Ermenek Helvası', desc: 'Yöremizin dünyaca ünlü tahinli ve cevizli helvası, tatlı krizlerinin doğal çözümü.' }
];

export default function DiscoverCity() {
    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Güneyyurt'u Tanıyın | Kültür, Turizm ve Yaşam" description="Güneyyurt'un tarihi yerleri, doğal güzellikleri ve yöresel mutfağı hakkında bilgiler." />

            {/* Hero */}
            <div className="h-[70vh] relative flex items-center justify-center overflow-hidden bg-slate-900">
                <img
                    src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    alt="Guvenyurt Panorama"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center px-6"
                >
                    <span className="inline-block px-6 py-2 bg-blue-600/10 border border-blue-400/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Kadim Topraklar</span>
                    <h1 className="text-6xl md:text-[120px] font-black text-white leading-none tracking-tighter uppercase italic">Keşfet <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Güneyyurt</span></h1>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {[
                        { label: 'Gezilecek Yerler', icon: MapPinIcon, color: 'text-blue-600' },
                        { label: 'Yöresel Lezzetler', icon: CakeIcon, color: 'text-amber-600' },
                        { label: 'Kültür & Sanat', icon: SparklesIcon, color: 'text-indigo-600' },
                        { label: 'Doğa & Yaşam', icon: SunIcon, color: 'text-emerald-600' },
                    ].map((cat, i) => (
                        <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 text-center flex flex-col items-center">
                            <cat.icon className={`h-12 w-12 ${cat.color} mb-6`} />
                            <p className="font-black text-slate-900 uppercase tracking-tighter leading-none">{cat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Featured Places */}
                <div className="mb-40">
                    <div className="flex items-end justify-between mb-20 px-4">
                        <div>
                            <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">ROTANIZI OLUŞTURUN</p>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Gezilecek Yerler</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {places.map((place, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl mb-8">
                                    <img src={place.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={place.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase italic tracking-tight">{place.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{place.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Local Flavors */}
                <div className="bg-slate-900 rounded-[5rem] p-16 lg:p-32 relative overflow-hidden text-center lg:text-left">
                    <div className="absolute top-0 right-0 h-full w-1/3 bg-blue-600/10 skew-x-12 translate-x-20" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <CakeIcon className="h-20 w-20 text-blue-500 mb-10 mx-auto lg:mx-0" />
                            <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-tight uppercase italic">Yöresel <br />Mutfak</h2>
                            <p className="text-xl text-slate-300 font-medium leading-[2] mb-12">Güneyyurt'un bereketli topraklarından gelen doğal ürünlerle hazırlanan, asırlık gelenekleri günümüze taşıyan eşsiz lezzet serüveni.</p>
                            <button className="btn-premium px-12 py-6 text-sm">Gurme Rehberini İndir</button>
                        </div>
                        <div className="space-y-10">
                            {foods.map((food, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 group hover:bg-white/10 transition-all">
                                    <h4 className="text-2xl font-black text-blue-400 mb-4 uppercase italic tracking-tight">{food.name}</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed">{food.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Geography & Stats */}
                <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center">
                                <p className="text-4xl font-black text-slate-900 mb-2">1.250m</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ortalama Rakım</p>
                            </div>
                            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center">
                                <p className="text-4xl font-black text-slate-900 mb-2">6.500</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yerleşik Nüfus</p>
                            </div>
                            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center">
                                <p className="text-4xl font-black text-slate-900 mb-2">%85</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yeşil Alan Oranı</p>
                            </div>
                            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center">
                                <p className="text-4xl font-black text-slate-900 mb-2">35km</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İlçe Merkezine Uzaklık</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 px-10">
                        <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">COĞRAFİ YAPI & İKLİM</p>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic mb-8">Torosların <br />Eteğinde Bir Cevher</h2>
                        <p className="text-lg text-slate-500 font-medium leading-[2]">
                            Güneyyurt, Orta Toroslar'ın kuzey yamaçlarında, muazzam bir doğa örtüsüyle çevrilidir. Yazları serin yayla havası, kışları ise bembeyaz kar örtüsüyle dört mevsim farklı bir güzellik sunar.
                            Beldemiz, zengin su kaynakları ve verimli topraklarıyla bölgesinin tarım ve yaşam merkezidir.
                        </p>
                    </div>
                </div>

                {/* Extended Town Guide Section */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl shadow-slate-200/50 border border-slate-50">
                        <div className="flex items-center gap-6 mb-12">
                            <div className="h-16 w-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
                                <SunIcon className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">İklim & Hava</h3>
                                <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mt-1">Anlık Güneyyurt Verileri</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sıcaklık</p>
                                    <p className="text-4xl font-black text-slate-900 leading-none">14°C</p>
                                </div>
                                <SunIcon className="h-12 w-12 text-amber-500 opacity-20" />
                            </div>
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nem Oranı</p>
                                    <p className="text-4xl font-black text-slate-900 leading-none">%42</p>
                                </div>
                                <SparklesIcon className="h-12 w-12 text-blue-400 opacity-20" />
                            </div>
                        </div>
                        <div className="mt-12 p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100">
                            <p className="text-blue-800 font-medium leading-relaxed italic text-sm">
                                "Güneyyurt'ta bugün hava açık ve güneşli. Özellikle yayla kesimlerinde akşam saatlerinde serinlik beklendiğinden tedbirli olunması önerilir."
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-16 text-white relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                        <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-8">Namaz Vakitleri</h4>
                        <div className="space-y-4">
                            {[
                                { name: 'İmsak', time: '05:42' },
                                { name: 'Güneş', time: '07:12' },
                                { name: 'Öğle', time: '12:54' },
                                { name: 'İkindi', time: '15:42' },
                                { name: 'Akşam', time: '18:12' },
                                { name: 'Yatsı', time: '19:42' }
                            ].map((v, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest">{v.name}</span>
                                    <span className="font-black italic text-blue-400">{v.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
