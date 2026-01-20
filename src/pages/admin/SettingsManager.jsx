import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LinkIcon,
    PhotoIcon,
    ShareIcon,
    PlusIcon,
    TrashIcon,
    SparklesIcon,
    PuzzlePieceIcon
} from '@heroicons/react/24/outline';

export default function SettingsManager() {
    const [activeTab, setActiveTab] = useState('links');
    const [links, setLinks] = useState([]);
    const [socials, setSocials] = useState([]);
    const [slides, setSlides] = useState([]);
    const [qServices, setQServices] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form states
    const [linkForm, setLinkForm] = useState({ title: '', url: '', category: 'General' });
    const [socialForm, setSocialForm] = useState({ platform: '', url: '' });
    const [slideForm, setSlideForm] = useState({ title: '', subtitle: '', description: '', imageUrl: '', linkUrl: '', buttonText: 'İncele', order: 0 });
    const [serviceForm, setServiceForm] = useState({ title: '', iconName: 'HomeIcon', color: 'bg-blue-600', link: '', order: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [l, s, sl, qs] = await Promise.all([
                axios.get('/api/sitesettings/links'),
                axios.get('/api/sitesettings/social'),
                axios.get('/api/sitesettings/slides'),
                axios.get('/api/sitesettings/services')
            ]);
            setLinks(l.data);
            setSocials(s.data);
            setSlides(sl.data);
            setQServices(qs.data);
        } catch (err) {
            console.error('Fetch error', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddLink = async (e) => {
        e.preventDefault();
        await axios.post('/api/sitesettings/links', linkForm);
        setLinkForm({ title: '', url: '', category: 'General' });
        fetchData();
    };

    const handleAddSocial = async (e) => {
        e.preventDefault();
        await axios.post('/api/sitesettings/social', socialForm);
        setSocialForm({ platform: '', url: '' });
        fetchData();
    };

    const handleAddSlide = async (e) => {
        e.preventDefault();
        await axios.post('/api/sitesettings/slides', slideForm);
        setSlideForm({ title: '', subtitle: '', description: '', imageUrl: '', linkUrl: '', buttonText: 'İncele', order: 0 });
        fetchData();
    };

    const handleDeleteLink = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        await axios.delete(`/api/sitesettings/links/${id}`);
        fetchData();
    };

    const handleDeleteSocial = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        await axios.delete(`/api/sitesettings/social/${id}`);
        fetchData();
    };

    const handleDeleteSlide = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        await axios.delete(`/api/sitesettings/slides/${id}`);
        fetchData();
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        await axios.post('/api/sitesettings/services', serviceForm);
        setServiceForm({ title: '', iconName: 'HomeIcon', color: 'bg-blue-600', link: '', order: 0 });
        fetchData();
    };

    const handleDeleteService = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        await axios.delete(`/api/sitesettings/services/${id}`);
        fetchData();
    };

    return (
        <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-4 flex items-center gap-4">
                        <SparklesIcon className="h-10 w-10 text-blue-600" /> Site Ayarları
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Portal görünümü ve dış bağlantı yönetimi.</p>
                </div>

                <div className="flex bg-slate-100 p-2 rounded-[2rem]">
                    {[
                        { id: 'links', label: 'Yararlı Linkler', icon: LinkIcon },
                        { id: 'social', label: 'Sosyal Medya', icon: ShareIcon },
                        { id: 'slides', label: 'Hero Slides', icon: PhotoIcon },
                        { id: 'services', label: 'Hızlı Servisler', icon: PuzzlePieceIcon }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <tab.icon className="h-4 w-4" /> {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 sticky top-12">
                        <h2 className="text-xl font-black mb-8 uppercase italic tracking-tight">Yeni Kayıt Ekle</h2>

                        {activeTab === 'links' && (
                            <form onSubmit={handleAddLink} className="space-y-6">
                                <input required type="text" placeholder="Bağlantı Başlığı" className="admin-input w-full" value={linkForm.title} onChange={e => setLinkForm({ ...linkForm, title: e.target.value })} />
                                <input required type="url" placeholder="URL (https://...)" className="admin-input w-full" value={linkForm.url} onChange={e => setLinkForm({ ...linkForm, url: e.target.value })} />
                                <select className="admin-input w-full" value={linkForm.category} onChange={e => setLinkForm({ ...linkForm, category: e.target.value })}>
                                    <option value="General">Genel</option>
                                    <option value="Ermenek">Ermenek</option>
                                    <option value="Regional">Bölgesel</option>
                                    <option value="News">Haberler</option>
                                </select>
                                <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                                    <PlusIcon className="h-5 w-5" /> Ekle
                                </button>
                            </form>
                        )}

                        {activeTab === 'social' && (
                            <form onSubmit={handleAddSocial} className="space-y-6">
                                <input required type="text" placeholder="Platform (Örn: Facebook)" className="admin-input w-full" value={socialForm.platform} onChange={e => setSocialForm({ ...socialForm, platform: e.target.value })} />
                                <input required type="url" placeholder="Profil URL" className="admin-input w-full" value={socialForm.url} onChange={e => setSocialForm({ ...socialForm, url: e.target.value })} />
                                <button className="w-full py-5 bg-pink-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-pink-700 transition-all flex items-center justify-center gap-3">
                                    <PlusIcon className="h-5 w-5" /> Ekle
                                </button>
                            </form>
                        )}

                        {activeTab === 'slides' && (
                            <form onSubmit={handleAddSlide} className="space-y-6">
                                <input required type="text" placeholder="Slide Başlığı (Ana Yazı)" className="admin-input w-full" value={slideForm.title} onChange={e => setSlideForm({ ...slideForm, title: e.target.value })} />
                                <input required type="text" placeholder="Slogan / Üst Başlık" className="admin-input w-full" value={slideForm.subtitle} onChange={e => setSlideForm({ ...slideForm, subtitle: e.target.value })} />
                                <textarea
                                    placeholder="Detaylı Açıklama (Tailwind sınıfları destekler)"
                                    className="admin-input w-full min-h-[120px]"
                                    value={slideForm.description}
                                    onChange={e => setSlideForm({ ...slideForm, description: e.target.value })}
                                />
                                <input required type="text" placeholder="Görsel URL (Unsplash vb.)" className="admin-input w-full" value={slideForm.imageUrl} onChange={e => setSlideForm({ ...slideForm, imageUrl: e.target.value })} />
                                <input required type="text" placeholder="Buton Linki" className="admin-input w-full" value={slideForm.linkUrl} onChange={e => setSlideForm({ ...slideForm, linkUrl: e.target.value })} />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Buton Metni" className="admin-input" value={slideForm.buttonText} onChange={e => setSlideForm({ ...slideForm, buttonText: e.target.value })} />
                                    <input type="number" placeholder="Sıra" className="admin-input" value={slideForm.order} onChange={e => setSlideForm({ ...slideForm, order: e.target.value })} />
                                </div>
                                <div className="p-4 bg-blue-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">İpucu</p>
                                    <p className="text-[10px] text-blue-800 leading-relaxed font-medium">Açıklama alanında Tailwind sınıfları kullanarak (örneğin: text-blue-400 font-bold) özel stiller verebilirsiniz.</p>
                                </div>
                                <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3">
                                    <PlusIcon className="h-5 w-5" /> Slayt Ekle
                                </button>
                            </form>
                        )}

                        {activeTab === 'services' && (
                            <form onSubmit={handleAddService} className="space-y-6">
                                <input required type="text" placeholder="Hizmet Başlığı" className="admin-input w-full" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} />
                                <div className="grid grid-cols-2 gap-4">
                                    <select className="admin-input" value={serviceForm.iconName} onChange={e => setServiceForm({ ...serviceForm, iconName: e.target.value })}>
                                        <option value="HomeIcon">Ev</option>
                                        <option value="MapIcon">Harita</option>
                                        <option value="HeartIcon">Kalp</option>
                                        <option value="CreditCardIcon">Kart</option>
                                        <option value="BuildingLibraryIcon">Kamu</option>
                                        <option value="NewspaperIcon">Gazete</option>
                                        <option value="PhoneIcon">Telefon</option>
                                    </select>
                                    <select className="admin-input" value={serviceForm.color} onChange={e => setServiceForm({ ...serviceForm, color: e.target.value })}>
                                        <option value="bg-blue-600">Mavi</option>
                                        <option value="bg-emerald-600">Yeşil</option>
                                        <option value="bg-amber-600">Turuncu</option>
                                        <option value="bg-pink-600">Pembe</option>
                                        <option value="bg-slate-900">Siyah</option>
                                        <option value="bg-indigo-600">Lacivert</option>
                                    </select>
                                </div>
                                <input required type="text" placeholder="Yönlendirme Linki" className="admin-input w-full" value={serviceForm.link} onChange={e => setServiceForm({ ...serviceForm, link: e.target.value })} />
                                <input type="number" placeholder="Sıra" className="admin-input w-full" value={serviceForm.order} onChange={e => setServiceForm({ ...serviceForm, order: e.target.value })} />
                                <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                                    <PlusIcon className="h-5 w-5" /> Servis Ekle
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode='wait'>
                        {activeTab === 'links' && (
                            <motion.div key="links" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                                {links.map(link => (
                                    <div key={link.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group">
                                        <div>
                                            <h4 className="font-black text-slate-900 uppercase italic">{link.title}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{link.category} • {link.url}</p>
                                        </div>
                                        <button onClick={() => handleDeleteLink(link.id)} className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'social' && (
                            <motion.div key="social" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {socials.map(s => (
                                    <div key={s.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 group relative">
                                        <div className="h-14 w-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl italic group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                                            {s.platform.slice(0, 1)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 uppercase tracking-tight italic">{s.platform}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate max-w-[150px]">{s.url}</p>
                                        </div>
                                        <button onClick={() => handleDeleteSocial(s.id)} className="absolute top-4 right-4 h-8 w-8 text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'slides' && (
                            <motion.div key="slides" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                {slides.map(slide => (
                                    <div key={slide.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm flex group">
                                        <div className="w-48 h-32 flex-shrink-0 relative">
                                            <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>
                                        <div className="p-6 flex-grow flex items-center justify-between">
                                            <div>
                                                <h4 className="font-black text-slate-900 uppercase italic">{slide.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sıra: {slide.order}</p>
                                            </div>
                                            <button onClick={() => handleDeleteSlide(slide.id)} className="h-12 w-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                                <TrashIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                        {activeTab === 'services' && (
                            <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {qServices.map(s => (
                                    <div key={s.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-12 w-12 ${s.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-inherit/20`}>
                                                <PuzzlePieceIcon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 uppercase italic leading-none">{s.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Sıra: {s.order}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteService(s.id)} className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
