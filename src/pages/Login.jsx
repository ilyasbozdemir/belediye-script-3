import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EnvelopeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/admin');
        window.location.reload();
      } else {
        const data = await response.json();
        setError(data.message || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      setError('Sistem bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Seo title="Yönetici Güvenli Giriş | Güneyyurt Bld." />

      {/* Left Decoration - Visible on Desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1500"
            className="w-full h-full object-cover opacity-20 blur-[2px]"
            alt="Admin"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative z-10 px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12 h-[100px] w-[100px] bg-blue-600 rounded-[2rem] flex items-center justify-center p-4 shadow-2xl shadow-blue-500/30">
              <img src="/belediye-logo-yazisiz.png" className="" alt=" Logo" />

            </div>
            <h1 className="text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
              Güneyyurt <br /> <span className="text-blue-500 underline decoration-8 underline-offset-8">Yönetim</span> Paneli
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
              Sadece yetkili personel erişimine açıktır. Sistem üzerindeki tüm işlemler kayıt altına alınmaktadır.
            </p>
          </motion.div>
        </div>

        {/* Floating Accent */}
        <div className="absolute bottom-20 left-20 right-20 flex justify-between items-end">
          <div className="flex gap-4">
            <div className="h-2 w-12 bg-blue-600 rounded-full" />
            <div className="h-2 w-4 bg-slate-700 rounded-full" />
            <div className="h-2 w-4 bg-slate-700 rounded-full" />
          </div>
          <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">Secure Access 256-bit AES</p>
        </div>
      </div>

      {/* Right Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-12 py-12 relative">
        <div className="max-w-md w-full">
          <div className="lg:hidden text-center mb-12">
            <img src="/belediye-logo.png" className="h-20 mx-auto mb-6" alt="Logo" />
            <h2 className="text-3xl font-black text-slate-900">Güneyyurt Bld.</h2>
            <p className="text-slate-500 font-bold mt-2">Yönetim Paneli Girişi</p>
          </div>

          <div className="hidden lg:block mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Hoşgeldiniz</h2>
            <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Lütfen giriş bilgilerinizi doğrulayın</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-blue-600 transition-colors">E-Posta Adresi</label>
                <div className="absolute left-4 bottom-3.5 text-slate-400">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold"
                  placeholder="admin@guneyyurt.bel.tr"
                />
              </div>

              <div className="relative group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-blue-600 transition-colors">Şifre</label>
                <div className="absolute left-4 bottom-3.5 text-slate-400">
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex gap-3 items-center"
              >
                <div className="w-2 h-2 rounded-full bg-red-600" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full flex items-center gap-3 py-5 hover:gap-5 disabled:opacity-50"
            >
              {loading ? 'Doğrulanıyor...' : 'Sisteme Güvenli Giriş Yap'}
              {!loading && <ArrowRightIcon className="h-5 w-5" />}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Yardıma mı ihtiyacınız var?</p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors underline underline-offset-4 decoration-2">Teknik Destek</a>
              <a href="#" className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors underline underline-offset-4 decoration-2">Şifremi Unuttum</a>
            </div>
          </div>
        </div>

        {/* Footer info for Mobile */}
        <div className="absolute bottom-8 left-8 right-8 text-center lg:hidden">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Powered by Advanced Agentic Coding © 2026</p>
        </div>
      </div>
    </div>
  );
}
