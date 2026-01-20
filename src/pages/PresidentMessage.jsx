import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';

export default function PresidentMessage() {
    return (
        <div className="bg-white min-h-screen pb-32">
            <Seo title="Başkanın Mesajı | Güneyyurt Belediyesi" description="Güneyyurt Belediye Başkanı'nın halkımıza mesajı." />

            <div className="bg-slate-900 pt-48 pb-64 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541810232773-6784534346bb?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-20"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-6 lg:px-8 -mt-80 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-12 lg:p-24 border border-slate-100"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-12">
                            <div className="absolute -inset-4 bg-blue-600 rounded-full blur-2xl opacity-20 animate-pulse" />
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
                                className="h-48 w-48 rounded-[3rem] object-cover relative z-10 shadow-2xl border-4 border-white"
                                alt="Başkan"
                            />
                            <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl z-20">
                                <HeartIcon className="h-6 w-6" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 italic">
                            "Daha Güzel Bir Güneyyurt İçin <br /> El Ele, Gönül Gönüle"
                        </h1>
                        <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-16">Belediye Başkanı'nın Mesajı</p>

                        <div className="prose prose-2xl prose-slate text-slate-600 font-medium leading-[2.2] text-left">
                            <p>
                                Kıymetli Hemşehrilerim,
                            </p>
                            <p>
                                Güneyyurt, tarihin, doğanın ve kadim kültürün kucaklaştığı müstesna bir coğrafya. Bizler, bu toprakların evlatları olarak, bize emanet edilen bu mirası daha ileriye taşımak için büyük bir heyecan ve sorumlulukla çalışıyoruz.
                            </p>
                            <p>
                                Göreve geldiğimiz günden bu yana, şeffaflık, katılımcılık ve adalet prensiplerinden ödün vermeden, her mahallemize, her sokağımıza ve her bir ferdimize dokunacak projeler geliştirdik. Altyapıdan üstyapıya, sosyal yardımlardan kültürel etkinliklere kadar her alanda "Güneyyurt markasını" yükseltmek temel hedefimizdir.
                            </p>
                            <p>
                                Gücümüzü sizlerin dualarından ve desteğinden alıyoruz. Belediyemizin kapıları her zaman sizlere açık vurgusunu sadece sözde değil, her gün sahada sizlerle iç içe olarak kanıtlıyoruz. Modern bir şehircilik anlayışını, geleneksel bağlarımızla harmanlayarak geleceğin Güneyyurt'unu inşa ediyoruz.
                            </p>
                            <p>
                                Gelin, el birliğiyle daha huzurlu, daha temiz ve daha müreffeh bir Güneyyurt için yürümeye devam edelim. Destekleriniz için şükranlarımı sunuyor, sizleri en kalbi duygularımla selamlıyorum.
                            </p>
                        </div>

                        <div className="mt-20 pt-16 border-t border-slate-50 w-full">
                            <p className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Ahmet ARI</p>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Güneyyurt Belediye Başkanı</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
