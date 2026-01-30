import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, MegaphoneIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function AnnouncementModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show modal after 3 seconds on first load
        const timer = setTimeout(() => {
            const hasSeen = localStorage.getItem('hasSeenAnnouncement');
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const closeModal = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenAnnouncement', 'true');
    };

    return (
        <Transition grow show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0 scale-95 translate-y-8"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-8"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-[3.5rem] bg-white shadow-2xl transition-all border border-slate-100">
                                <div className="relative">
                                    {/* Banner Image */}
                                    <div className="h-64 relative bg-slate-900">
                                        <img
                                            src="https://images.unsplash.com/photo-1541810232773-6784534346bb?auto=format&fit=crop&q=80&w=1200"
                                            className="w-full h-full object-cover opacity-60"
                                            alt="Announcement"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                                        <button
                                            onClick={closeModal}
                                            className="absolute top-6 right-6 h-12 w-12 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-all outline-none"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>

                                        <div className="absolute bottom-0 left-10 translate-y-1/2">
                                            <div className="h-20 w-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-600/40">
                                                <MegaphoneIcon className="h-10 w-10 animate-bounce" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 pt-16">
                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] block mb-4">ÖNEMLİ DUYURU</span>
                                        <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-6 leading-tight">
                                            Belediye <span className="text-blue-600">Yatırım Programı</span> <br />Halk Toplantısı Hakkında
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed mb-8 opacity-80">
                                            Güneyyurt'un yarınlarını birlikte planlamak için düzenleyeceğimiz 2026-2029 Stratejik Plan ve Yatırım Programı toplantısına tüm hemşehrilerimiz davetlidir. Görüşleriniz bizim için değerlidir.
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                                            <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Toplantı Tarihi</p>
                                                <p className="font-bold text-slate-900 italic">15 Şubat 2026 - 14:30</p>
                                            </div>
                                            <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-2xl w-full">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Yer</p>
                                                <p className="font-bold text-slate-900 italic">Kültür Merkezi Salonu</p>
                                            </div>
                                        </div>

                                        <div className="mt-12 flex items-center justify-between gap-6">
                                            <button onClick={closeModal} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Kapat</button>
                                            <button className="btn-premium px-10 py-5 text-xs uppercase tracking-widest group">
                                                Detaylı Bilgi <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
