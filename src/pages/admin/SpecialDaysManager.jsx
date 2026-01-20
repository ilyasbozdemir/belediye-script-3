import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CalendarIcon,
    PlusIcon,
    TrashIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    XCircleIcon,
    GiftIcon,
    AcademicCapIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

export default function SpecialDaysManager() {
    const [greetings, setGreetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGreeting, setEditingGreeting] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchGreetings();
    }, []);

    const fetchGreetings = async () => {
        try {
            const res = await axios.get('/api/holidaygreetings');
            setGreetings(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Greetings fetching error:', err);
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editingGreeting) {
                await axios.put(`/api/holidaygreetings/${editingGreeting.id}`, { ...data, id: editingGreeting.id });
            } else {
                await axios.post('/api/holidaygreetings', data);
            }
            setIsModalOpen(false);
            setEditingGreeting(null);
            reset();
            fetchGreetings();
        } catch (err) {
            console.error('Saving error:', err);
            alert('Kaydedilirken bir hata oluştu.');
        }
    };

    const handleEdit = (greeting) => {
        setEditingGreeting(greeting);
        setValue('title', greeting.title);
        setValue('message', greeting.message);
        setValue('imageUrl', greeting.imageUrl);
        setValue('type', greeting.type);
        setValue('startDate', greeting.startDate?.split('T')[0]);
        setValue('endDate', greeting.endDate?.split('T')[0]);
        setValue('isActive', greeting.isActive);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu kutlama mesajını silmek istediğinize emin misiniz?')) return;
        try {
            await axios.delete(`/api/holidaygreetings/${id}`);
            fetchGreetings();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Official': return <AcademicCapIcon className="h-6 w-6 text-blue-600" />;
            case 'Religious': return <StarIcon className="h-6 w-6 text-emerald-600" />;
            default: return <GiftIcon className="h-6 w-6 text-amber-600" />;
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase italic">İçerik Planlayıcı & Özel Günler</h1>
                    <p className="text-slate-500 font-medium">Resmi bayramlar, dini günler ve başkanın özel kutlama mesajlarını yönetin.</p>
                </div>
                <button
                    onClick={() => { setEditingGreeting(null); reset(); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all"
                >
                    <PlusIcon className="h-5 w-5" /> Yeni Plan Ekle
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {greetings.map((g) => (
                        <div key={g.id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-50 hover:border-blue-200 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all`}>
                                    {getTypeIcon(g.type)}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(g)} className="p-2 text-slate-400 hover:text-blue-600"><PencilSquareIcon className="h-5 w-5" /></button>
                                    <button onClick={() => handleDelete(g.id)} className="p-2 text-slate-400 hover:text-red-600"><TrashIcon className="h-5 w-5" /></button>
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase italic leading-tight">{g.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">{g.message}</p>

                            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tarih Aralığı</span>
                                    <span className="text-xs font-bold text-slate-700">
                                        {new Date(g.startDate).toLocaleDateString('tr-TR')} - {new Date(g.endDate).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                                {g.isActive ?
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">Aktif</span> :
                                    <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest">Pasif</span>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

                        <div className="relative bg-white rounded-[3rem] w-full max-w-2xl p-12 shadow-2xl">
                            <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase italic">
                                {editingGreeting ? 'Kutlama Düzenle' : 'Yeni Kutlama Planı'}
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Başlık / Gün Adı</label>
                                    <input {...register('title', { required: true })} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600" placeholder="Örn: 29 Ekim Cumhuriyet Bayramı" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tür</label>
                                        <select {...register('type')} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600">
                                            <option value="Official">Resmi Tatil / Bayram</option>
                                            <option value="Religious">Dini Gün / Kandil</option>
                                            <option value="General">Genel Kutlama / Mesaj</option>
                                        </select>
                                    </div>
                                    <div className="flex items-end">
                                        <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl w-full">
                                            <input type="checkbox" {...register('isActive')} className="h-5 w-5 text-blue-600 border-none rounded focus:ring-0" />
                                            <span className="text-sm font-bold text-slate-900">Yayınla</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Başlangıç Tarihi</label>
                                        <input type="date" {...register('startDate', { required: true })} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bitiş Tarihi</label>
                                        <input type="date" {...register('endDate', { required: true })} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mesaj (Başkanın Mesajı)</label>
                                    <textarea {...register('message')} rows={4} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Vatandaşlarımıza iletilecek kutlama mesajı..."></textarea>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Görsel URL (Opsiyonel)</label>
                                    <input {...register('imageUrl')} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600" placeholder="https://..." />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="submit" className="flex-1 bg-blue-600 text-white px-8 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                                        Planı Kaydet
                                    </button>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-5 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-slate-900 transition-all">
                                        İptal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
