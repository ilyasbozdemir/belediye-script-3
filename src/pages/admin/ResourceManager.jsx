import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  ArrowDownTrayIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResourceManager({
  resourceName,
  displayName,
  fields,
  endpoint,
  icon: Icon
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [notification, setNotification] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(endpoint);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('API Error:', err);
      showNotification('Sistem verileri alınırken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      fields.forEach(f => {
        let val = item[f.name];
        if (f.type === 'date' && val) {
          val = new Date(val).toISOString().split('T')[0];
        }
        setValue(f.name, val);
      });
    } else {
      reset();
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editingItem) {
        await axios.put(`${endpoint}/${editingItem.id}`, { ...editingItem, ...data });
        showNotification(`${displayName} başarıyla güncellendi`);
      } else {
        await axios.post(endpoint, data);
        showNotification(`Yeni ${displayName} başarıyla eklendi`);
      }
      fetchItems();
      setIsModalOpen(false);
    } catch (err) {
      showNotification('İşlem sırasında sunucu hatası oluştu', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu kaydı tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
    try {
      await axios.delete(`${endpoint}/${id}`);
      showNotification('Kayıt sistemden kalıcı olarak silindi');
      fetchItems();
    } catch (err) {
      showNotification('Silme işlemi başarısız oldu', 'error');
    }
  };

  const filteredItems = items.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-8 pb-32">
      {/* Dynamic Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
              {Icon ? <Icon className="h-8 w-8 text-blue-600" /> : <PlusIcon className="h-8 w-8 text-slate-300" />}
            </div>
            <div>
              <nav className="flex gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                <span>Panel</span>
                <span>/</span>
                <span className="text-blue-600 font-black">{displayName} Yönetimi</span>
              </nav>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{displayName} Arşivi</h1>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all">
            <ArrowDownTrayIcon className="h-4 w-4" /> Dışa Aktar
          </button>
          <button
            onClick={() => openModal()}
            className="btn-premium py-3.5 px-8 flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" /> Yeni {displayName}
          </button>
        </div>
      </div>

      {/* Modern Tool Bar */}
      <div className="admin-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder={`Arama yapın... (${items.length} kayıt arasında)`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-[1.25rem] focus:ring-2 focus:ring-blue-500/10 text-sm font-bold placeholder:text-slate-400 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors">
            <FunnelIcon className="h-5 w-5" />
          </button>
          <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors">
            <ArrowsUpDownIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Aesthetic Table Section */}
      <div className="admin-card p-0 overflow-hidden">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center text-slate-400 gap-4">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            <span className="text-[11px] font-black uppercase tracking-widest">Veritabanına bağlanılıyor...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center px-6">
            <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6">
              <Icon className="h-10 w-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Kayıt Bulunamadı</h3>
            <p className="text-slate-400 font-medium max-w-xs mt-2 text-sm">Aradığınız kriterlere uygun sonuç yok veya henüz veri girişi yapılmadı.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {fields.map(f => (
                    <th key={f.name} className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.label}</th>
                  ))}
                  <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Yönetim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredItems.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {fields.map(f => (
                        <td key={f.name} className="px-8 py-6">
                          {f.type === 'date' ? (
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800">{new Date(item[f.name]).toLocaleDateString('tr-TR')}</span>
                              <span className="text-[11px] font-medium text-slate-400 mt-0.5">{new Date(item[f.name]).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          ) : f.type === 'textarea' ? (
                            <span className="text-sm font-semibold text-slate-500 line-clamp-1 max-w-xs">{item[f.name] || '-'}</span>
                          ) : (
                            <span className="text-sm font-bold text-slate-800">{item[f.name] || '-'}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openModal(item)}
                            className="p-3 bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-3 bg-white border border-slate-200 rounded-xl text-red-600 shadow-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Premium Side Drawer / Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl h-full bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="px-10 py-12 border-b border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                  {editingItem ? 'Kaydı Güncelle' : `Yeni ${displayName}`}
                </h2>
                <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Lütfen gerekli tüm alanları eksiksiz doldurun</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto px-10 py-12 space-y-10">
                <div className="grid grid-cols-2 gap-8">
                  {fields.map(f => (
                    <div key={f.name} className={f.fullWidth ? "col-span-2" : "col-span-2 md:col-span-1"}>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">{f.label}</label>
                      {f.type === 'textarea' ? (
                        <textarea
                          {...register(f.name, { required: f.required })}
                          rows={6}
                          placeholder={`${f.label} hakkında detayları buraya yazın...`}
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500/10 font-bold placeholder:text-slate-400 transition-all resize-none"
                        />
                      ) : (
                        <input
                          type={f.type || 'text'}
                          {...register(f.name, { required: f.required })}
                          placeholder={`${f.label} giriniz...`}
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500/10 font-bold placeholder:text-slate-400 transition-all"
                        />
                      )}
                      {f.required && (
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2 ml-1">* Bu alanın doldurulması zorunludur</p>
                      )}
                    </div>
                  ))}
                </div>
              </form>

              <div className="p-10 bg-slate-50/50 border-t border-slate-100 flex gap-4">
                <button type="submit" onClick={handleSubmit(onSubmit)} className="flex-1 btn-premium py-5">
                  {editingItem ? 'Değişiklikleri Kaydet' : `Sisteme ${displayName} Ekle`}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-5 text-sm font-extrabold text-slate-600 hover:text-slate-900 transition-colors">İptal</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Specialized Notification System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-10 right-10 z-[100] flex items-center gap-4 px-8 py-5 rounded-[2rem] shadow-2xl ${notification.type === 'error' ? 'bg-red-600' : 'bg-slate-900'} text-white border border-white/10`}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${notification.type === 'error' ? 'bg-white/20' : 'bg-blue-600'}`}>
              {notification.type === 'error' ? <XCircleIcon className="h-6 w-6" /> : <CheckCircleIcon className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Sistem Bildirimi</p>
              <p className="font-bold text-sm tracking-tight">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
