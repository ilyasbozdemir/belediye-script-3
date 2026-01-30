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
import * as LucideIcons from 'lucide-react';

// Popular Lucide icons for services
const LUCIDE_ICONS = [
    'Home', 'MapPin', 'Heart', 'CreditCard', 'Building', 'Newspaper',
    'Phone', 'Mail', 'Calendar', 'Clock', 'Users', 'FileText',
    'Search', 'Settings', 'Bell', 'Star', 'Shield', 'Award',
    'Briefcase', 'Camera', 'Car', 'Coffee', 'Gift', 'Globe',
    'Hammer', 'Leaf', 'Lightbulb', 'Music', 'Palette', 'Plane',
    'Printer', 'Scissors', 'ShoppingCart', 'Smartphone', 'Trash',
    'Umbrella', 'Video', 'Wifi', 'Zap', 'Archive', 'BarChart',
    'Book', 'Bookmark', 'Box', 'Clipboard', 'Cloud', 'Code',
    'Compass', 'Copy', 'Database', 'Download', 'Edit', 'Eye',
    'Flag', 'Folder', 'Grid', 'HardDrive', 'Headphones', 'Image',
    'Inbox', 'Info', 'Key', 'Layers', 'Layout', 'Link',
    'List', 'Lock', 'LogIn', 'LogOut', 'Map', 'Menu',
    'MessageCircle', 'Mic', 'Monitor', 'Moon', 'MoreHorizontal', 'Move',
    'Package', 'Paperclip', 'PieChart', 'Play', 'Plus', 'Power',
    'RefreshCw', 'Repeat', 'Save', 'Send', 'Server', 'Share',
    'ShoppingBag', 'Sidebar', 'Sliders', 'Sun', 'Tag', 'Target',
    'Terminal', 'ThumbsUp', 'Tool', 'TrendingUp', 'Truck', 'Tv',
    'Type', 'Upload', 'User', 'UserPlus', 'Volume', 'Watch',
    'Wind', 'X', 'ZoomIn', 'ZoomOut'
];

const COLOR_OPTIONS = [
    { value: 'bg-blue-600', label: 'Mavi', preview: '#2563eb' },
    { value: 'bg-emerald-600', label: 'Yeşil', preview: '#059669' },
    { value: 'bg-amber-600', label: 'Turuncu', preview: '#d97706' },
    { value: 'bg-pink-600', label: 'Pembe', preview: '#db2777' },
    { value: 'bg-purple-600', label: 'Mor', preview: '#9333ea' },
    { value: 'bg-red-600', label: 'Kırmızı', preview: '#dc2626' },
    { value: 'bg-indigo-600', label: 'Lacivert', preview: '#4f46e5' },
    { value: 'bg-slate-900', label: 'Siyah', preview: '#0f172a' },
    { value: 'bg-teal-600', label: 'Turkuaz', preview: '#0d9488' },
    { value: 'bg-orange-600', label: 'Portakal', preview: '#ea580c' },
];

export default function SettingsManager() {
    const [activeTab, setActiveTab] = useState('links');
    const [links, setLinks] = useState([]);
    const [socials, setSocials] = useState([]);
    const [slides, setSlides] = useState([]);
    const [qServices, setQServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [iconSearch, setIconSearch] = useState('');

    // Form states
    const [linkForm, setLinkForm] = useState({ title: '', url: '', category: 'General' });
    const [socialForm, setSocialForm] = useState({ platform: '', url: '' });
    const [slideForm, setSlideForm] = useState({ title: '', subtitle: '', description: '', imageUrl: '', linkUrl: '', buttonText: 'İncele', order: 0 });
    const [serviceForm, setServiceForm] = useState({ title: '', iconName: 'Home', color: 'bg-blue-600', link: '', order: 0 });
    const [bankAccounts, setBankAccounts] = useState([]);
    const [bankForm, setBankForm] = useState({ name: '', branch: '', iban: '', type: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [l, s, sl, qs, b] = await Promise.all([
                axios.get('/api/sitesettings/links'),
                axios.get('/api/sitesettings/social'),
                axios.get('/api/sitesettings/slides'),
                axios.get('/api/sitesettings/services'),
                axios.get('/api/sitesettings/bank-accounts')
            ]);
            setLinks(l.data);
            setSocials(s.data);
            setSlides(sl.data);
            setQServices(qs.data);
            setBankAccounts(b.data);
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

    const handleAddBank = async (e) => {
        e.preventDefault();
        await axios.post('/api/sitesettings/bank-accounts', bankForm);
        setBankForm({ name: '', branch: '', iban: '', type: '' });
        fetchData();
    };

    const handleDeleteBank = async (id) => {
        if (!confirm('Emin misiniz?')) return;
        await axios.delete(`/api/sitesettings/bank-accounts/${id}`);
        fetchData();
    };

    return (
        <div className="p-4 sm:p-6 lg:p-12">
            <div className="flex flex-col gap-6 mb-8 lg:mb-16">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-2 sm:mb-4 flex items-center gap-3 sm:gap-4">
                        <SparklesIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-blue-600" /> Site Ayarları
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">Portal görünümü ve dış bağlantı yönetimi.</p>
                </div>

                {/* Responsive Tabs */}
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="flex gap-2 px-4 sm:px-0 pb-2 min-w-max sm:min-w-0 sm:flex-wrap">
                        {[
                            { id: 'links', label: 'Yararlı Linkler', icon: LinkIcon },
                            { id: 'social', label: 'Sosyal Medya', icon: ShareIcon },
                            { id: 'slides', label: 'Hero Slides', icon: PhotoIcon },
                            { id: 'services', label: 'Hızlı Servisler', icon: PuzzlePieceIcon },
                            { id: 'bank', label: 'Banka Bilgileri', icon: LucideIcons.CreditCard }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl' : 'bg-slate-100 text-slate-400 hover:text-slate-600'}`}
                            >
                                <tab.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] shadow-xl lg:shadow-2xl border border-slate-50 lg:sticky lg:top-12">
                        <h2 className="text-lg sm:text-xl font-black mb-6 sm:mb-8 uppercase italic tracking-tight">Yeni Kayıt Ekle</h2>

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

                                {/* Icon Picker */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">İkon Seç</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setShowIconPicker(!showIconPicker)}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-between hover:border-blue-400 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                {(() => {
                                                    const IconComponent = LucideIcons[serviceForm.iconName];
                                                    return IconComponent ? <IconComponent className="h-5 w-5 text-slate-700" /> : null;
                                                })()}
                                                <span className="font-semibold text-slate-700">{serviceForm.iconName}</span>
                                            </div>
                                            <LucideIcons.ChevronDown className="h-4 w-4 text-slate-400" />
                                        </button>

                                        {showIconPicker && (
                                            <div className="absolute z-10 mt-2 w-full bg-white border-2 border-slate-200 rounded-2xl shadow-2xl p-4 max-h-96 overflow-y-auto">
                                                <input
                                                    type="text"
                                                    placeholder="İkon ara..."
                                                    value={iconSearch}
                                                    onChange={(e) => setIconSearch(e.target.value)}
                                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg mb-4 text-sm"
                                                />
                                                <div className="grid grid-cols-6 gap-2">
                                                    {LUCIDE_ICONS
                                                        .filter(icon => icon.toLowerCase().includes(iconSearch.toLowerCase()))
                                                        .map(iconName => {
                                                            const IconComponent = LucideIcons[iconName];
                                                            return (
                                                                <button
                                                                    key={iconName}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setServiceForm({ ...serviceForm, iconName });
                                                                        setShowIconPicker(false);
                                                                        setIconSearch('');
                                                                    }}
                                                                    className={`p-3 rounded-lg hover:bg-blue-50 transition-colors ${serviceForm.iconName === iconName ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-slate-50'
                                                                        }`}
                                                                    title={iconName}
                                                                >
                                                                    {IconComponent && <IconComponent className="h-5 w-5 text-slate-700 mx-auto" />}
                                                                </button>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Color Picker */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Renk Seç</label>
                                    <div className="grid grid-cols-5 gap-3">
                                        {COLOR_OPTIONS.map(color => (
                                            <button
                                                key={color.value}
                                                type="button"
                                                onClick={() => setServiceForm({ ...serviceForm, color: color.value })}
                                                className={`relative p-4 rounded-xl transition-all ${serviceForm.color === color.value ? 'ring-4 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-105'
                                                    }`}
                                                style={{ backgroundColor: color.preview }}
                                                title={color.label}
                                            >
                                                {serviceForm.color === color.value && (
                                                    <LucideIcons.Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2 font-medium">Seçili: {COLOR_OPTIONS.find(c => c.value === serviceForm.color)?.label}</p>
                                </div>

                                <input required type="text" placeholder="Yönlendirme Linki" className="admin-input w-full" value={serviceForm.link} onChange={e => setServiceForm({ ...serviceForm, link: e.target.value })} />
                                <input type="number" placeholder="Sıra" className="admin-input w-full" value={serviceForm.order} onChange={e => setServiceForm({ ...serviceForm, order: e.target.value })} />
                                <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                                    <PlusIcon className="h-5 w-5" /> Servis Ekle
                                </button>
                            </form>
                        {activeTab === 'bank' && (
                            <form onSubmit={handleAddBank} className="space-y-6">
                                <input required type="text" placeholder="Banka Adı" className="admin-input w-full" value={bankForm.name} onChange={e => setBankForm({ ...bankForm, name: e.target.value })} />
                                <input required type="text" placeholder="Şube Bilgisi" className="admin-input w-full" value={bankForm.branch} onChange={e => setBankForm({ ...bankForm, branch: e.target.value })} />
                                <input required type="text" placeholder="IBAN" className="admin-input w-full" value={bankForm.iban} onChange={e => setBankForm({ ...bankForm, iban: e.target.value })} />
                                <input required type="text" placeholder="Hesap Türü (Örn: Tahsilat)" className="admin-input w-full" value={bankForm.type} onChange={e => setBankForm({ ...bankForm, type: e.target.value })} />
                                <button className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
                                    <PlusIcon className="h-5 w-5" /> Banka Hesabı Ekle
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
                                    <div key={slide.id} className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col sm:flex-row group">
                                        <div className="w-full sm:w-48 h-32 flex-shrink-0 relative">
                                            <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>
                                        <div className="p-4 sm:p-6 flex-grow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div>
                                                <h4 className="font-black text-slate-900 uppercase italic text-sm sm:text-base">{slide.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sıra: {slide.order}</p>
                                            </div>
                                            <button onClick={() => handleDeleteSlide(slide.id)} className="h-10 w-10 sm:h-12 sm:w-12 bg-red-50 text-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all self-end sm:self-auto">
                                                <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                        {activeTab === 'services' && (
                            <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {qServices.map(s => {
                                    const IconComponent = LucideIcons[s.iconName] || LucideIcons.HelpCircle;
                                    return (
                                        <div key={s.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-12 ${s.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-inherit/20`}>
                                                    <IconComponent className="h-6 w-6" />
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
                                    );
                                })}
                            </motion.div>
                        {activeTab === 'bank' && (
                            <motion.div key="bank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                                {bankAccounts.map(acc => (
                                    <div key={acc.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                                <LucideIcons.Landmark className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 uppercase italic leading-none">{acc.name}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{acc.type} • {acc.iban}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteBank(acc.id)} className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
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
