import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    UserIcon,
    KeyIcon,
    ShieldCheckIcon,
    BellIcon,
    CameraIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
    const [user, setUser] = useState({
        name: 'Güneyyurt Yöneticisi',
        email: 'admin@guneyyurt.bel.tr',
        role: 'Süper Admin',
        phone: '0 (338) 491 20 02',
        avatar: null
    });

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <header>
                <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none flex items-center gap-4">
                    <UserIcon className="h-10 w-10 text-blue-600" /> Profil Ayarları
                </h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 ml-1">Kişisel Bilgiler ve Güvenlik</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Profile Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-600 to-indigo-700" />

                        <div className="relative mt-4">
                            <div className="h-32 w-32 bg-slate-100 rounded-[2.5rem] mx-auto border-4 border-white shadow-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                {user.avatar ? (
                                    <img src={user.avatar} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <UserIcon className="h-12 w-12 text-slate-300" />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <CameraIcon className="h-8 w-8 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-1">
                            <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">{user.name}</h2>
                            <p className="text-blue-600 font-bold uppercase text-[10px] tracking-widest">{user.role}</p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                <span>Durum</span>
                                <span className="flex items-center gap-1 text-emerald-500"><CheckCircleIcon className="h-3 w-3" /> Aktif</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                <span>Son Giriş</span>
                                <span className="text-slate-900 font-bold uppercase">Bugün</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight border-b border-slate-50 pb-5 flex items-center gap-3">
                            <ShieldCheckIcon className="h-5 w-5 text-blue-600" /> Kişisel Bilgiler
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Ad Soyad</label>
                                <input className="admin-input w-full" defaultValue={user.name} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">E-Posta</label>
                                <input className="admin-input w-full" defaultValue={user.email} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Telefon</label>
                                <input className="admin-input w-full" defaultValue={user.phone} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Yetki Seviyesi</label>
                                <input className="admin-input w-full bg-slate-50" readOnly defaultValue={user.role} />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50">
                            <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight mb-8 flex items-center gap-3">
                                <KeyIcon className="h-5 w-5 text-orange-500" /> Şifre Değiştir
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Mevcut Şifre</label>
                                    <input type="password" placeholder="••••••••" className="admin-input w-full" />
                                </div>
                                <div />
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Yeni Şifre</label>
                                    <input type="password" placeholder="••••••••" className="admin-input w-full" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Yeni Şifre (Tekrar)</label>
                                    <input type="password" placeholder="••••••••" className="admin-input w-full" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-8">
                            <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                                Bilgileri Güncelle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
