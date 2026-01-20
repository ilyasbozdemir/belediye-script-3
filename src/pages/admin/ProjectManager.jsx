import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const fetchProjects = async () => {
    const res = await axios.get('/api/projects');
    setProjects(res.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const onSubmit = async (data) => {
    await axios.post('/api/projects', data);
    fetchProjects();
    reset();
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Emin misiniz?')) return;
    await axios.delete(`/api/projects/${id}`);
    fetchProjects();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projeler Yönetimi</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-6 rounded-xl border mb-8 grid grid-cols-2 gap-4">
        <input {...register("title")} placeholder="Proje Adı" className="border p-2 rounded" />
        <select {...register("status")} className="border p-2 rounded">
            <option value="Biten">Biten</option>
            <option value="Devam Eden">Devam Eden</option>
            <option value="Planlanan">Planlanan</option>
        </select>
        <input {...register("imageUrl")} placeholder="Resim URL" className="border p-2 rounded col-span-2" />
        <textarea {...register("description")} placeholder="Proje Detayı" className="border p-2 rounded col-span-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-2">Proje Ekle</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => (
           <div key={p.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
               <div>
                   <h3 className="font-bold">{p.title}</h3>
                   <p className="text-sm text-gray-500">{p.status}</p>
               </div>
               <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Sil</button>
           </div>
        ))}
      </div>
    </div>
  );
}
