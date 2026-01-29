import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BuildingOfficeIcon,
    MapPinIcon,
    ClockIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ArrowLeftIcon,
    BriefcaseIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get('/api/projects');
                const found = res.data.find(p => p.id === id);
                setProject(found);
            } catch (err) {
                console.error('Failed to fetch project');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return null;
    if (!project) return (
        <div className="min-h-screen flex items-center justify-center">Proje Bulunamadı.</div>
    );

    return (
        <div className="bg-white min-h-screen pb-32">
            <Seo
                title={`${project.title} | Yatırımlarımız`}
                description={project.description}
                image={project.imageUrl}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": project.title,
                    "description": project.description,
                    "locationCreated": project.location
                }}
            />

            {/* Hero Banner */}
            <div className="h-[70vh] relative overflow-hidden bg-slate-900">
                <img src={project.imageUrl} className="w-full h-full object-cover opacity-60" alt={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6 lg:px-24">
                    <div className="mx-auto max-w-7xl w-full">
                        <Link to="/projeler/biten" className="inline-flex items-center gap-2 text-white/80 font-black uppercase text-[10px] tracking-[0.3em] mb-12 hover:text-white transition-all bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                            <ArrowLeftIcon className="h-4 w-4" /> Geri Dön
                        </Link>
                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <span className="px-6 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{project.category}</span>
                            <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'Tamamlanan' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                                }`}>
                                {project.status}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[1.1] max-w-4xl drop-shadow-2xl">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-24 -mt-16 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Main Content */}
                    <div className="lg:w-2/3 space-y-20 pt-16">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase italic tracking-tighter">Proje Hakkında</h2>
                            <p className="text-2xl text-slate-500 font-medium leading-[2.2]">
                                {project.description}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-[4rem] p-16 lg:p-24 border border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900 mb-12 uppercase italic tracking-tight">Teknik Detaylar</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {project.features.map((feature, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="h-10 w-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                                            <CheckBadgeIcon className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <p className="font-bold text-slate-700 text-lg">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {project.gallery && (
                            <div>
                                <div className="flex items-center gap-6 mb-16">
                                    <PhotoIcon className="h-12 w-12 text-blue-600" />
                                    <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Şantiyeden Kareler</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-6 auto-rows-[300px]">
                                    {project.gallery.map((img, i) => (
                                        <div key={i} className={`rounded-[3rem] overflow-hidden group shadow-xl ${i === 0 ? 'col-span-2' : ''}`}>
                                            <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={`Gallery ${i}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:w-1/3 space-y-8">
                        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-12 sticky top-32">

                            {/* Progress Wheel */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative w-48 h-48 mb-6">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" className="text-slate-50" strokeWidth="16" />
                                        <circle cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" className="text-blue-600" strokeWidth="16" strokeDasharray={552.92} strokeDashoffset={552.92 * (1 - project.progress / 100)} strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <p className="text-4xl font-black text-slate-900">%{project.progress}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">İlerleme</p>
                                    </div>
                                </div>
                                <p className="text-blue-600 font-black uppercase text-xs tracking-widest">PROJE DURUMU</p>
                            </div>

                            <div className="space-y-8 pt-8 border-t border-slate-50">
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <BanknotesIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Yatırım Bedeli</p>
                                        <p className="text-xl font-black text-slate-900 italic tracking-tighter">{project.budget}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <MapPinIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Konum</p>
                                        <p className="font-bold text-slate-900">{project.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <ClockIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Takvim</p>
                                        <p className="font-bold text-slate-900">{new Date(project.startDate).getFullYear()} - {new Date(project.endDate).getFullYear()}</p>
                                    </div>
                                </div>
                                {project.contractor && (
                                    <div className="flex items-center gap-6">
                                        <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                            <BriefcaseIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Yüklenici Firma</p>
                                            <p className="font-bold text-slate-900">{project.contractor}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="w-full btn-premium py-5 px-8">İletişime Geç / Bilgi Al</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
