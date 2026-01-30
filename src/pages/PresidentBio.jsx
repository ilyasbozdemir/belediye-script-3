import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  MapPinIcon,
  BriefcaseIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

export default function PresidentBio() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <Seo title="Başkanın Özgeçmişi | Güneyyurt Belediyesi" description="Güneyyurt Belediye Başkanı Sayın Ahmet Arı'nın özgeçmişi." />

      {/* Hero Section */}
      <div className="bg-slate-900 pt-52 lg:pt-64 pb-48 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Belediye Başkanımız</h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 w-full sticky top-32"
          >
            <div className="bg-white rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                alt="Belediye Başkanı"
                className="rounded-[2.5rem] w-full aspect-[4/5] object-cover"
              />
              <div className="p-8 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ahmet ARI</h2>
                <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Güneyyurt Belediye Başkanı</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                <p className="text-2xl font-black text-slate-900 mb-1">2019</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seçim Yılı</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                <p className="text-2xl font-black text-slate-900 mb-1">LİSANS</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eğitim</p>
              </div>
            </div>
          </motion.div>

          {/* Bio Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/3 w-full space-y-12"
          >
            <div className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-sm border border-slate-100">
              <h3 className="text-3xl font-black text-slate-900 mb-10 border-l-8 border-blue-600 pl-8">Yaşam Öyküsü</h3>
              <div className="prose prose-xl prose-slate font-medium text-slate-600 leading-relaxed space-y-8">
                <p>
                  1975 yılında Güneyyurt'ta dünyaya gelen Ahmet Arı, köklü bir ailenin ferdi olarak bu toprakların kültürü ve değerleriyle harmanlanarak yetişti. İlk ve orta öğrenimini üstün başarıyla Güneyyurt'ta tamamlayan Arı, hizmet aşkının tohumlarını o yıllarda attı.
                </p>
                <p>
                  Lisans eğitimini Ankara Üniversitesi Siyasal Bilgiler Fakültesi Kamu Yönetimi bölümünde tamamladıktan sonra, yerel yönetimler ve şehircilik alanında çeşitli akademik çalışmalarda bulundu. Ankara'da edindiği vizyonu, memleketi Güneyyurt'a taşımak en büyük gayesi oldu.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                  <div className="flex gap-4 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <AcademicCapIcon className="h-10 w-10 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-black text-slate-900">Eğitim</p>
                      <p className="text-sm text-slate-500 font-semibold">Ankara Üniversitesi SBF</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <BriefcaseIcon className="h-10 w-10 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-black text-slate-900">Deneyim</p>
                      <p className="text-sm text-slate-500 font-semibold">15+ Yıl Kamu Yönetimi</p>
                    </div>
                  </div>
                </div>

                <p>
                  Uzun yıllar beldemizde esnaflık ve ticaret yaparak halkımızın sorunlarını yakından gözlemleme fırsatı buldu. 2018 yılında, memleketine hizmet borcunu ödemek için yola çıktı.
                </p>
                <p>
                  2019 Mahalli İdareler Seçimleri'nde halkın büyük desteğini alarak Belediye Başkanı seçilen Ahmet Arı, Güneyyurt'u modern belediyecilik standartlarıyla tanıştırmak, şeffaf yönetim modelini oturtmak ve kalıcı değerler üretmek için çalışmalarına devam etmektedir.
                </p>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-blue-600/20">
              <h4 className="text-2xl font-black mb-6 uppercase tracking-tight">Hizmet Vizyonu</h4>
              <p className="text-xl font-medium leading-relaxed opacity-90 italic">
                "Benim için Güneyyurt, sadece bir belediye değil; geleceğimizin, gençlerimizin ve çocuklarımızın güvenle büyüyeceği modern bir yuvadır. Şeffaflıktan ödün vermeden, her kuruşun hesabını halkımıza vererek hizmet etmek en büyük onurumdur."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
