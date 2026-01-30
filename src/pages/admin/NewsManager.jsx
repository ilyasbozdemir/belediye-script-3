import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  PhotoIcon,
  NewspaperIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/news');
      const haberler = res.data.filter(item => item.category !== 'Duyuru');
      setNews(haberler);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post('/api/news', {
        title: newTitle,
        content: '',
        category: 'Haber',
        createdDate: new Date().toISOString()
      });
      navigate(`/admin/manage/news/${res.data.id}`);
    } catch (err) {
      alert('Hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu haberi silmek istediğinize emin misiniz?')) return;
    try {
      await axios.delete(`/api/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <header className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center gap-4">
            <NewspaperIcon className="h-10 w-10 text-blue-600" /> Haber Merkezi
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 ml-1">İçerik Editörü • Son Güncelleme: {new Date().toLocaleDateString()}</p>
        </div>
        <button
          onClick={() => setShowQuickAdd(true)}
          className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-3"
        >
          <PlusIcon className="h-6 w-6" /> Yeni Haber Ekle
        </button>
      </header>

      {/* Quick Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <MagnifyingGlassIcon className="h-6 w-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Haberlerde ara..."
            className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold placeholder:text-slate-300"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Premium Table List */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Haber</th>
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell">Kategori</th>
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden lg:table-cell">Tarih</th>
              <th className="px-8 py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredNews.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <PhotoIcon className="h-6 w-6 text-slate-300 m-auto mt-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 italic tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">ID: #{item.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 hidden md:table-cell">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {item.category}
                  </span>
                </td>
                <td className="px-8 py-6 hidden lg:table-cell text-xs font-bold text-slate-400 italic">
                  {new Date(item.createdDate).toLocaleDateString()}
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/manage/news/${item.id}`)}
                      className="h-10 w-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="h-10 w-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredNews.length === 0 && !loading && (
          <div className="p-20 text-center">
            <NewspaperIcon className="h-16 w-16 text-slate-100 mx-auto mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Aranılan haber bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Quick Add Modal Overlay */}
      {showQuickAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Yeni Haber Girişi</h3>
              <button
                onClick={() => setShowQuickAdd(false)}
                className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleQuickAdd} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Habere Bir Başlık Verin</label>
                <input
                  autoFocus
                  required
                  placeholder="Örn: Güneyyurt Meydan Projesi Başladı"
                  className="admin-input w-full py-5 text-lg font-bold"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">Başlık girildikten sonra detaylı editör sayfasına yönlendirileceksiniz.</p>
              <button className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                Devam Et & Detayları Doldur
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
