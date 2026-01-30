import { useState } from 'react';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoIcon, XMarkIcon, ArrowsPointingOutIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const albums = [
    {
        id: 1,
        title: 'Belediye Hizmet Binası',
        category: 'Kurumsal',
        cover: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80&w=1200',
        images: [
            'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
        ],
        size: 'large'
    },
    {
        id: 2,
        title: 'Park ve Bahçelerimiz',
        category: 'Peyzaj',
        cover: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800'
        ],
        size: 'small'
    },
    {
        id: 3,
        title: 'Kültür Merkezi Açılışı',
        category: 'Etkinlik',
        cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800'
        ],
        size: 'small'
    },
    {
        id: 4,
        title: 'Yeni Yol Çalışmaları',
        category: 'Fen İşleri',
        cover: 'https://images.unsplash.com/photo-1533230393279-38398318504a?auto=format&fit=crop&q=80&w=1200',
        images: [
            'https://images.unsplash.com/photo-1533230393279-38398318504a?auto=format&fit=crop&q=80&w=1200'
        ],
        size: 'tall'
    },
    {
        id: 5,
        title: 'Çocuk Şenliği 2024',
        category: 'Sosyal',
        cover: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&q=80&w=800'
        ],
        size: 'small'
    },
    {
        id: 6,
        title: 'Güneyyurt Gece',
        category: 'Kurumsal',
        cover: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200',
        images: [
            'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200'
        ],
        size: 'wide'
    }
];

export default function Gallery() {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [filter, setFilter] = useState('Hepsi');

    const categories = ['Hepsi', ...new Set(albums.map(a => a.category))];
    const filteredAlbums = filter === 'Hepsi' ? albums : albums.filter(a => a.category === filter);

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Foto Galeri | Güneyyurt Belediyesi" description="Güneyyurt Belediyesi faaliyetleri ve şehrimizden kareler." />

            <div className="bg-slate-900 pt-52 lg:pt-64 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Görsel Hafıza</h1>
                    <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-slate-400 font-medium max-w-2xl mx-auto text-lg">Güneyyurt'un güzelliklerini ve belediyemizin çalışmalarını mercek altına aldık.</p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                                : 'bg-white text-slate-500 hover:bg-slate-100 shadow-sm border border-slate-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Bento/Collage Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
                    <AnimatePresence mode='popLayout'>
                        {filteredAlbums.map((album) => (
                            <motion.div
                                key={album.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 
                                  ${album.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                                  ${album.size === 'tall' ? 'md:row-span-2' : ''}
                                  ${album.size === 'wide' ? 'md:col-span-2' : ''}
                                `}
                                onClick={() => {
                                    setSelectedAlbum(album);
                                    setCurrentPhotoIndex(0);
                                }}
                            >
                                <img
                                    src={album.cover}
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-left">
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 block">{album.category}</span>
                                    <h3 className="text-xl font-black text-white leading-tight opacity-0 group-hover:opacity-100 transition-opacity delay-100">{album.title}</h3>
                                    <p className="text-[10px] font-bold text-slate-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-200">{album.images.length} Fotoğraf</p>
                                </div>

                                <div className="absolute top-6 right-6 h-12 px-4 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 gap-2">
                                    <PhotoIcon className="h-5 w-5" />
                                    <span className="text-[10px] font-black">{album.images.length}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedAlbum && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAlbum(null)}
                            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="relative max-w-7xl w-full h-full flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase italic">{selectedAlbum.title}</h2>
                                    <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center gap-3">
                                        <span className="px-3 py-1 bg-white/5 rounded-lg">{selectedAlbum.category}</span>
                                        <span>Görüntülenen: {currentPhotoIndex + 1} / {selectedAlbum.images.length}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedAlbum(null)}
                                    className="h-14 w-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all shadow-2xl"
                                >
                                    <XMarkIcon className="h-8 w-8" />
                                </button>
                            </div>

                            <div className="flex-1 min-h-0 relative group/viewer">
                                <div className="w-full h-full bg-slate-900 rounded-[3rem] overflow-hidden border border-white/5 flex items-center justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentPhotoIndex}
                                            src={selectedAlbum.images[currentPhotoIndex]}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            className="w-full h-full object-contain"
                                            alt=""
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Navigation Arrows */}
                                {selectedAlbum.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(prev => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length) }}
                                            className="absolute left-8 top-1/2 -translate-y-1/2 h-16 w-16 bg-white/5 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover/viewer:opacity-100 transition-all shadow-2xl"
                                        >
                                            <XMarkIcon className="h-8 w-8 rotate-90" /> {/* Using XMarkIcon as placeholder for arrow if lazy */}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(prev => (prev + 1) % selectedAlbum.images.length) }}
                                            className="absolute right-8 top-1/2 -translate-y-1/2 h-16 w-16 bg-white/10 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover/viewer:opacity-100 transition-all shadow-2xl"
                                        >
                                            <ChevronRightIcon className="h-8 w-8" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-8 flex justify-center gap-4 overflow-x-auto py-4 scrollbar-hide">
                                {selectedAlbum.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPhotoIndex(idx)}
                                        className={`h-20 w-32 rounded-2xl overflow-hidden shrink-0 transition-all border-4 ${currentPhotoIndex === idx ? 'border-blue-600 scale-110 shadow-xl shadow-blue-600/20' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
