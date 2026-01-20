import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
    BuildingOfficeIcon,
    TruckIcon,
    TrashIcon,
    FireIcon,
    AcademicCapIcon,
    SunIcon,
    UserGroupIcon,
    PhoneIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const units = [
    {
        name: 'Zabıta Amirliği',
        icon: ShieldCheckIcon,
        desc: 'Beldemizin huzur ve güvenliği için denetim, ruhsat kontrol ve pazar yeri düzenleme faaliyetlerinin yürütülmesi.',
        color: 'bg-slate-900',
        dahili: '128'
    },
    {
        name: 'Fen İşleri Müdürlüğü',
        icon: BuildingOfficeIcon,
        desc: 'İmar uygulama, yol yapım, bakım ve onarım işlerinin yürütülmesi.',
        color: 'bg-blue-500',
        dahili: '112'
    },
    {
        name: 'Temizlik İşleri',
        icon: TrashIcon,
        desc: 'Beldemizin daha temiz ve sağlıklı olması için 7/24 hizmet.',
        color: 'bg-emerald-500',
        dahili: '115'
    },
    {
        name: 'İtfaiye Amirliği',
        icon: FireIcon,
        desc: 'Yangın, kaza ve afet durumlarında halkımızın yanındayız.',
        color: 'bg-red-500',
        dahili: '110'
    },
    {
        name: 'Park ve Bahçeler',
        icon: SunIcon,
        desc: 'Yeşil alanların korunması ve yeni sosyal alanların oluşturulması.',
        color: 'bg-amber-500',
        dahili: '118'
    },
    {
        name: 'Yazı İşleri',
        icon: UserGroupIcon,
        desc: 'Belediye meclis ve encümen kararlarının koordinasyonu.',
        color: 'bg-indigo-500',
        dahili: '120'
    },
    {
        name: 'Mali Hizmetler',
        icon: AcademicCapIcon,
        desc: 'Belediyemizin bütçe ve gelir-gider dengesinin yönetimi.',
        color: 'bg-slate-700',
        dahili: '125'
    },
];

export default function Units() {
    return (
        <div className="bg-white min-h-screen pb-32">
            <Seo title="Hizmet Birimleri | Güneyyurt Belediyesi" description="Belediyemizin idari ve teknik birimleri hakkında bilgiler." />

            <div className="bg-slate-50 pt-32 pb-24 text-center px-6 border-b border-slate-100">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase">Hizmet Birimleri</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-500 font-medium max-w-2xl mx-auto text-lg">Güneyyurt Belediyesi olarak profesyonel birimlerimizle halkımıza en iyi hizmeti sunmak için durmaksızın çalışıyoruz.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {units.map((unit, idx) => (
                        <motion.div
                            key={unit.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 text-center"
                        >
                            <div className={`${unit.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-inherit/20`}>
                                <unit.icon className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-6">{unit.name}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-6">{unit.desc}</p>
                            <div className="bg-slate-50 py-3 px-6 rounded-2xl inline-flex items-center gap-3">
                                <PhoneIcon className="h-4 w-4 text-slate-400" />
                                <span className="text-sm font-black text-slate-900 tracking-tighter">Dahili: {unit.dahili}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
