import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    HeartIcon,
    HandThumbUpIcon,
    TrashIcon,
    PlusIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function LifeEventManager() {
    const [activeTab, setActiveTab] = useState('marriages');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/services/${activeTab}`);
            setData(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Fetch error');
            setLoading(false);
        }
    };

    const [newItem, setNewItem] = useState({
        husbandName: '', wifeName: '', marriageDate: '',
        name: '', surname: '', fatherName: '', birthDate: '', deathDate: '', burialDate: '', burialPlace: '', mosque: ''
    });

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/services/${activeTab}`, activeTab === 'marriages' ? {
                husbandName: newItem.husbandName,
                wifeName: newItem.wifeName,
                marriageDate: newItem.marriageDate
            } : {
                name: newItem.name,
                surname: newItem.surname || '',
                fatherName: newItem.fatherName || '',
                birthDate: newItem.birthDate || '',
                deathDate: newItem.deathDate,
                burialDate: newItem.burialDate || '',
                burialPlace: newItem.burialPlace,
                mosque: newItem.mosque || ''
            });
            fetchData();
            setNewItem({
                husbandName: '', wifeName: '', marriageDate: '',
                name: '', surname: '', fatherName: '', birthDate: '', deathDate: '', burialDate: '', burialPlace: '', mosque: ''
            });
        } catch (err) {
            alert('Hata oluştu');
        }
    };

    return (
        <div className="space-y-8">
            <header className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 uppercase italic">Kent Rehberi Veri Yönetimi</h1>
                    <p className="text-slate-500 font-medium mt-1">Evlilik ve vefat kayıtlarının dijital arşivi.</p>
                </div>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    <button
                        onClick={() => setActiveTab('marriages')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'marriages' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Evlendirme
                    </button>
                    <button
                        onClick={() => setActiveTab('deceased')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'deceased' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Aramızdan Ayrılanlar
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="admin-card h-fit">
                    <h3 className="text-lg font-black text-slate-900 mb-8 uppercase italic flex items-center gap-3">
                        <PlusIcon className="h-5 w-5 text-blue-600" /> Yeni Kayıt Ekle
                    </h3>
                    <form onSubmit={handleAdd} className="space-y-6">
                        {activeTab === 'marriages' ? (
                            <>
                                <div>
                                    <label className="admin-label">Damat Adı Soyadı</label>
                                    <input type="text" className="admin-input" required value={newItem.husbandName} onChange={e => setNewItem({ ...newItem, husbandName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="admin-label">Gelin Adı Soyadı</label>
                                    <input type="text" className="admin-input" required value={newItem.wifeName} onChange={e => setNewItem({ ...newItem, wifeName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="admin-label">Nikah Tarihi</label>
                                    <input type="date" className="admin-input" required value={newItem.marriageDate} onChange={e => setNewItem({ ...newItem, marriageDate: e.target.value })} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="admin-label">Adı</label>
                                    <input type="text" className="admin-input" required value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="admin-label">Soyadı</label>
                                    <input type="text" className="admin-input" required value={newItem.surname} onChange={e => setNewItem({ ...newItem, surname: e.target.value })} />
                                </div>
                                <div>
                                    <label className="admin-label">Baba Adı</label>
                                    <input type="text" className="admin-input" value={newItem.fatherName} onChange={e => setNewItem({ ...newItem, fatherName: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="admin-label">Doğum Tarihi/Yılı</label>
                                        <input type="text" placeholder="Örn: 1950" className="admin-input" value={newItem.birthDate} onChange={e => setNewItem({ ...newItem, birthDate: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="admin-label">Vefat Tarihi</label>
                                        <input type="date" className="admin-input" required value={newItem.deathDate} onChange={e => setNewItem({ ...newItem, deathDate: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="admin-label">Defin Tarihi</label>
                                        <input type="date" className="admin-input" value={newItem.burialDate} onChange={e => setNewItem({ ...newItem, burialDate: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="admin-label">Cenaze Camii</label>
                                        <input type="text" className="admin-input" value={newItem.mosque} onChange={e => setNewItem({ ...newItem, mosque: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="admin-label">Mezar / Defin Yeri</label>
                                    <input type="text" className="admin-input" required value={newItem.burialPlace} onChange={e => setNewItem({ ...newItem, burialPlace: e.target.value })} />
                                </div>
                            </>
                        )}
                        <button type="submit" className="w-full btn-premium py-4">Kayıt Oluştur</button>
                    </form>
                </div>

                {/* List */}
                <div className="lg:col-span-2 admin-card p-0 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                        <h3 className="text-lg font-black text-slate-900 uppercase italic">Güncel Listeler</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                                <tr>
                                    <th className="px-8 py-4">{activeTab === 'marriages' ? 'Çift İsimleri' : 'Adı Soyadı'}</th>
                                    <th className="px-8 py-4">Tarih</th>
                                    <th className="px-8 py-4">{activeTab === 'marriages' ? '' : 'Defin Yeri'}</th>
                                    <th className="px-8 py-4 text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.map(item => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${activeTab === 'marriages' ? 'bg-pink-50 text-pink-500' : 'bg-slate-100 text-slate-500'}`}>
                                                    {activeTab === 'marriages' ? <HeartIcon className="h-5 w-5" /> : <UserGroupIcon className="h-5 w-5" />}
                                                </div>
                                                <span className="text-sm font-bold text-slate-900">
                                                    {activeTab === 'marriages' ? `${item.husbandName} & ${item.wifeName}` : `${item.name} ${item.surname || ''}`}
                                                    {activeTab === 'deceased' && item.fatherName && <span className="block text-[10px] text-slate-400 font-medium">BABA: {item.fatherName}</span>}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-medium text-slate-500">
                                            {new Date(activeTab === 'marriages' ? item.marriageDate : item.deathDate).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-slate-900 uppercase tracking-tight italic">
                                            {activeTab === 'deceased' ? item.burialPlace : ''}
                                        </td>
                                        <td className="px-8 py-6 text-right text-red-500">
                                            <button className="p-2 hover:bg-red-50 rounded-xl transition-all">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data.length === 0 && !loading && (
                            <div className="p-20 text-center">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Veri bulunamadı.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
