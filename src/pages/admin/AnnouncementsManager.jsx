import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    XMarkIcon,
    PhotoIcon,
    MegaphoneIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const PRIORITY_LEVELS = [
    { value: 'normal', label: 'Normal', color: 'bg-slate-100 text-slate-700' },
    { value: 'important', label: 'Önemli', color: 'bg-orange-100 text-orange-700' },
    { value: 'urgent', label: 'Acil', color: 'bg-red-100 text-red-700' }
];

export default function AnnouncementsManager() {
    const [announcements, setAnnouncements] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        summary: '',
        imageUrl: '',
        category: 'Duyuru',
        priority: 'normal',
        expiryDate: ''
    });

    const fetchAnnouncements = async () => {
        try {
            const res = await axios.get('/api/news');
            // Sadece duyurular
            const duyurular = res.data.filter(item => item.category === 'Duyuru');
            setAnnouncements(duyurular);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            content: item.content,
            summary: item.summary || '',
            imageUrl: item.imageUrl || '',
            category: 'Duyuru',
            priority: item.priority || 'normal',
            expiryDate: item.expiryDate || ''
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
            category: 'Duyuru',
            priority: 'normal',
            expiryDate: ''
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
            category: 'Duyuru',
            priority: 'normal',
            expiryDate: ''
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
            fetchAnnouncements();
            handleCancel();
        } catch (err) {
            alert('İşlem başarısız');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bu duyuruyu silmek istediğinize emin misiniz?')) return;
        try {
            await axios.delete(`/api/news/${id}`);
            fetchAnnouncements();
        } catch (err) {
            console.error(err);
        }
    };

    const getPriorityBadge = (priority) => {
        const level = PRIORITY_LEVELS.find(p => p.value === priority) || PRIORITY_LEVELS[0];
        return level;
    };

    const isExpired = (expiryDate) => {
        if (!expiryDate) return false;
        return new Date(expiryDate) < new Date();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header - Mobile First */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <MegaphoneIcon className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600" />
                                Duyuru Yönetimi
                            </h1>
                            <p className="text-sm text-slate-600 mt-1">Duyuruları ekleyin, düzenleyin veya silin</p>
                        </div>
                        {!showForm && (
                            <button
                                onClick={handleNew}
                                className="w-full sm:w-auto px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
                            >
                                <PlusIcon className="h-5 w-5" />
                                Yeni Duyuru
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
                                {editingItem ? 'Duyuru Düzenle' : 'Yeni Duyuru Ekle'}
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
                                    Duyuru Başlığı *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                                    placeholder="Duyuru başlığını girin..."
                                />
                            </div>

                            {/* Priority & Expiry Date */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Öncelik Seviyesi
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                                    >
                                        {PRIORITY_LEVELS.map(level => (
                                            <option key={level.value} value={level.value}>{level.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        <ClockIcon className="h-4 w-4 inline mr-1" />
                                        Son Geçerlilik Tarihi
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                                    />
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
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
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
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base resize-none"
                                    placeholder="Duyurunun kısa özetini yazın..."
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Duyuru İçeriği *
                                </label>
                                <textarea
                                    required
                                    rows={12}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base resize-none font-mono"
                                    placeholder="Duyuru içeriğini buraya yazın..."
                                />
                                <p className="text-xs text-slate-500 mt-2">HTML etiketleri kullanabilirsiniz (örn: &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;)</p>
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
                                    className="w-full sm:flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/30"
                                >
                                    {editingItem ? 'Güncelle' : 'Yayınla'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* Announcements List - Mobile Optimized */
                    <div className="space-y-4">
                        {announcements.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
                                <MegaphoneIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-600 font-semibold">Henüz duyuru eklenmemiş</p>
                                <p className="text-slate-500 text-sm mt-2">Yeni duyuru eklemek için yukarıdaki butona tıklayın</p>
                            </div>
                        ) : (
                            announcements.map((item) => (
                                <div
                                    key={item.id}
                                    className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden hover:shadow-md transition-shadow ${isExpired(item.expiryDate) ? 'border-slate-200 opacity-60' : 'border-orange-200'
                                        }`}
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
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(item.priority).color}`}>
                                                            {getPriorityBadge(item.priority).label}
                                                        </span>
                                                        {isExpired(item.expiryDate) && (
                                                            <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-xs font-semibold">
                                                                Süresi Dolmuş
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-slate-500">
                                                            {new Date(item.createdDate).toLocaleDateString('tr-TR')}
                                                        </span>
                                                        {item.expiryDate && !isExpired(item.expiryDate) && (
                                                            <span className="text-xs text-orange-600 flex items-center gap-1">
                                                                <ClockIcon className="h-3 w-3" />
                                                                {new Date(item.expiryDate).toLocaleDateString('tr-TR')}
                                                            </span>
                                                        )}
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
                                                    className="flex-1 sm:flex-none px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2 text-sm"
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
