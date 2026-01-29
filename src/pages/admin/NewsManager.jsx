import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  PhotoIcon,
  EyeIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';

const CATEGORIES = ['Haber', 'Etkinlik', 'Proje', 'Sosyal', 'Çevre'];

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    imageUrl: '',
    category: 'Haber',
    isHeadline: false
  });

  const fetchNews = async () => {
    try {
      const res = await axios.get('/api/news');
      // Sadece haberler (Duyuru olmayanlar)
      const haberler = res.data.filter(item => item.category !== 'Duyuru');
      setNews(haberler);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      summary: item.summary || '',
      imageUrl: item.imageUrl || '',
      category: item.category,
      isHeadline: item.isHeadline || false
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      content: '',
      summary: '',
      imageUrl: '',
      category: 'Haber',
      isHeadline: false
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      title: '',
      content: '',
      summary: '',
      imageUrl: '',
      category: 'Haber',
      isHeadline: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`/api/news/${editingItem.id}`, {
          ...formData,
          id: editingItem.id,
          createdDate: editingItem.createdDate
        });
      } else {
        await axios.post('/api/news', {
          ...formData,
          createdDate: new Date().toISOString()
        });
      }
      fetchNews();
      handleCancel();
    } catch (err) {
      alert('İşlem başarısız');
      console.error(err);
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

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Mobile First */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <NewspaperIcon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
                Haber Yönetimi
              </h1>
              <p className="text-sm text-slate-600 mt-1">Haberleri ekleyin, düzenleyin veya silin</p>
            </div>
            {!showForm && (
              <button
                onClick={handleNew}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <PlusIcon className="h-5 w-5" />
                Yeni Haber
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Form Section - Full Page */}
        {showForm ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {editingItem ? 'Haber Düzenle' : 'Yeni Haber Ekle'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Haber Başlığı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="Haber başlığını girin..."
                />
              </div>

              {/* Category & Headline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl w-full hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isHeadline}
                      onChange={(e) => setFormData({ ...formData, isHeadline: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-slate-700">Manşet Haber</span>
                  </label>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <PhotoIcon className="h-4 w-4 inline mr-1" />
                  Görsel URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.imageUrl && (
                  <div className="mt-3">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full sm:w-64 h-40 object-cover rounded-xl border-2 border-slate-200"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Özet (Kısa Açıklama)
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
                  placeholder="Haberin kısa özetini yazın..."
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Haber İçeriği *
                </label>
                <div className="border border-slate-300 rounded-xl overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    modules={modules}
                    className="bg-white"
                    style={{ minHeight: '300px' }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="w-full sm:flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                  {editingItem ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* News List - Mobile Optimized */
          <div className="space-y-4">
            {news.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
                <NewspaperIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 font-semibold">Henüz haber eklenmemiş</p>
                <p className="text-slate-500 text-sm mt-2">Yeni haber eklemek için yukarıdaki butona tıklayın</p>
              </div>
            ) : (
              news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-4">
                    {/* Image */}
                    {item.imageUrl && (
                      <div className="w-full sm:w-48 h-40 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.parentElement.style.display = 'none'}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                              {item.category}
                            </span>
                            {item.isHeadline && (
                              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                Manşet
                              </span>
                            )}
                            <span className="text-xs text-slate-500">
                              {new Date(item.createdDate).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 mb-2">
                            {item.title}
                          </h3>
                          {item.summary && (
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {item.summary}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <PencilIcon className="h-4 w-4" />
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
