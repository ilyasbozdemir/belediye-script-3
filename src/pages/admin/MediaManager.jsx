import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PhotoIcon,
    VideoCameraIcon,
    DocumentIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowUpTrayIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    Squares2X2Icon,
    ListBulletIcon,
    TrashIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const MEDIA_TYPES = {
    ALL: 'Tümü',
    IMAGE: 'Görseller',
    VIDEO: 'Videolar',
    LOGO: 'Logolar',
    BANNER: 'Banner',
    AVATAR: 'Avatarlar',
    DOCUMENT: 'Dökümanlar'
};

const mockMedia = [
    {
        id: '1',
        name: 'kultur-merkezi-acilis.jpg',
        type: 'IMAGE',
        category: 'Görseller',
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
        thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400',
        size: '2.4 MB',
        uploadDate: '2024-01-15',
        dimensions: '1920x1080'
    },
    {
        id: '2',
        name: 'belediye-logo.png',
        type: 'LOGO',
        category: 'Logolar',
        url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=800',
        thumbnail: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=400',
        size: '256.8 KB',
        uploadDate: '2024-01-10',
        dimensions: '512x512'
    },
    {
        id: '3',
        name: 'yuzme-havuzu-tanitim.mp4',
        type: 'VIDEO',
        category: 'Videolar',
        url: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800',
        thumbnail: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=400',
        size: '15.2 MB',
        uploadDate: '2024-01-12',
        duration: '2:34'
    },
    {
        id: '4',
        name: 'millet-bahcesi.jpg',
        type: 'IMAGE',
        category: 'Görseller',
        url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
        thumbnail: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=400',
        size: '3.1 MB',
        uploadDate: '2024-01-14',
        dimensions: '1920x1080'
    },
    {
        id: '5',
        name: 'baskan-avatar.jpg',
        type: 'AVATAR',
        category: 'Avatarlar',
        url: 'https://i.pravatar.cc/400?img=33',
        thumbnail: 'https://i.pravatar.cc/200?img=33',
        size: '128.5 KB',
        uploadDate: '2024-01-08',
        dimensions: '400x400'
    },
    {
        id: '6',
        name: 'anasayfa-banner.jpg',
        type: 'BANNER',
        category: 'Banner',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=400',
        size: '4.2 MB',
        uploadDate: '2024-01-16',
        dimensions: '2560x1440'
    },
    {
        id: '7',
        name: 'stratejik-plan-2024.pdf',
        type: 'DOCUMENT',
        category: 'Dökümanlar',
        url: '/documents/stratejik-plan.pdf',
        thumbnail: null,
        size: '1.8 MB',
        uploadDate: '2024-01-05',
        pages: 45
    },
    {
        id: '8',
        name: 'asfalt-calismasi.jpg',
        type: 'IMAGE',
        category: 'Görseller',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
        thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400',
        size: '2.9 MB',
        uploadDate: '2024-01-13',
        dimensions: '1920x1080'
    }
];

export default function MediaManager() {
    const [media, setMedia] = useState(mockMedia);
    const [filteredMedia, setFilteredMedia] = useState(mockMedia);
    const [selectedType, setSelectedType] = useState('ALL');
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        let filtered = media;

        // Filter by type
        if (selectedType !== 'ALL') {
            filtered = filtered.filter(m => m.type === selectedType);
        }

        // Filter by search
        if (searchQuery) {
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredMedia(filtered);
    }, [selectedType, searchQuery, media]);

    const openLightbox = (index) => {
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % filteredMedia.length);
    };

    const prevImage = () => {
        setLightboxIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
    };

    const getMediaIcon = (type) => {
        switch (type) {
            case 'VIDEO':
                return <VideoCameraIcon className="h-5 w-5" />;
            case 'DOCUMENT':
                return <DocumentIcon className="h-5 w-5" />;
            default:
                return <PhotoIcon className="h-5 w-5" />;
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Medya Yönetimi</h1>
                <p className="text-slate-600">Sistemdeki tüm medya ve dosyalar</p>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 w-full lg:max-w-md">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Dosya adıyla ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 w-full lg:w-auto">
                        <button className="flex-1 lg:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <ArrowUpTrayIcon className="h-5 w-5" />
                            Dosya Yükle
                        </button>

                        {/* View Mode Toggle */}
                        <div className="flex bg-slate-100 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-slate-600'
                                    }`}
                            >
                                <Squares2X2Icon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-slate-600'
                                    }`}
                            >
                                <ListBulletIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
                    {Object.entries(MEDIA_TYPES).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedType(key)}
                            className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${selectedType === key
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Media Grid */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredMedia.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative aspect-square bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 overflow-hidden cursor-pointer transition-all hover:shadow-xl"
                            onClick={() => item.type !== 'DOCUMENT' && openLightbox(index)}
                        >
                            {/* Thumbnail */}
                            {item.thumbnail ? (
                                <img
                                    src={item.thumbnail}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-50">
                                    {getMediaIcon(item.type)}
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white font-semibold text-sm truncate mb-1">{item.name}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-300">
                                        <span>{item.size}</span>
                                        <span className="flex items-center gap-1">
                                            {getMediaIcon(item.type)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Type Badge */}
                            <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-700">
                                {item.category}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                /* List View */
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Önizleme</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Dosya Adı</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Tür</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Boyut</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Tarih</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredMedia.map((item, index) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                                            {item.thumbnail ? (
                                                <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                getMediaIcon(item.type)
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-900">{item.name}</p>
                                        {item.dimensions && <p className="text-xs text-slate-500">{item.dimensions}</p>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{item.size}</td>
                                    <td className="px-6 py-4 text-slate-600">{new Date(item.uploadDate).toLocaleDateString('tr-TR')}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                <ArrowDownTrayIcon className="h-5 w-5 text-slate-600" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                <TrashIcon className="h-5 w-5 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <XMarkIcon className="h-6 w-6 text-white" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <ChevronLeftIcon className="h-6 w-6 text-white" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <ChevronRightIcon className="h-6 w-6 text-white" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightboxIndex}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="max-w-7xl max-h-[90vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={filteredMedia[lightboxIndex]?.url}
                                alt={filteredMedia[lightboxIndex]?.name}
                                className="max-w-full max-h-[90vh] object-contain rounded-2xl"
                            />

                            {/* Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                                <p className="text-white font-bold text-lg mb-2">{filteredMedia[lightboxIndex]?.name}</p>
                                <div className="flex gap-4 text-sm text-slate-300">
                                    <span>{filteredMedia[lightboxIndex]?.size}</span>
                                    {filteredMedia[lightboxIndex]?.dimensions && (
                                        <span>{filteredMedia[lightboxIndex]?.dimensions}</span>
                                    )}
                                    <span>{new Date(filteredMedia[lightboxIndex]?.uploadDate).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold">
                            {lightboxIndex + 1} / {filteredMedia.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {filteredMedia.length === 0 && (
                <div className="text-center py-20">
                    <PhotoIcon className="h-20 w-20 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-semibold text-lg">Medya bulunamadı</p>
                    <p className="text-slate-500 text-sm mt-2">Farklı bir filtre deneyin veya yeni dosya yükleyin</p>
                </div>
            )}
        </div>
    );
}
