import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function GovernanceManager() {
    const [presidents, setPresidents] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const fetchPresidents = async () => {
        const res = await axios.get('/api/president');
        setPresidents(res.data);
    };

    useEffect(() => { fetchPresidents(); }, []);

    const onSubmit = async (data) => {
        await axios.post('/api/president', data);
        fetchPresidents();
        reset();
    };

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-xl font-bold mb-4">Eski Başkanlar Yönetimi</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 p-6 rounded-xl border">
                    <div className="grid grid-cols-2 gap-4">
                        <input {...register("name")} placeholder="Ad Soyad" className="border p-2 rounded" />
                        <input {...register("term")} placeholder="Görev Süresi (Örn: 2010-2015)" className="border p-2 rounded" />
                    </div>
                    <textarea {...register("bio")} placeholder="Kısa Özgeçmiş" className="w-full border p-2 rounded" />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ekle</button>
                </form>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {presidents.map(p => (
                        <div key={p.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
                            <div className="h-12 w-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                            <div>
                                <h3 className="font-bold">{p.name}</h3>
                                <p className="text-sm text-gray-500">{p.term}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
