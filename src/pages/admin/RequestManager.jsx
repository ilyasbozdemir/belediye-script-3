import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CheckCircleIcon,
    ClockIcon,
    EnvelopeIcon,
    PhoneIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    FunnelIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    EyeIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    InboxIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function RequestManager() {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tümü');
    const [categoryFilter, setCategoryFilter] = useState('Tümü');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        filterRequests();
    }, [requests, searchTerm, statusFilter, categoryFilter]);

    const fetchRequests = async () => {
        try {
            const res = await axios.get('/api/feedback/all');
            setRequests(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch requests');
            setLoading(false);
        }
    };

    const filterRequests = () => {
        let filtered = [...requests];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(req =>
                req.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.trackingCode?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'Tümü') {
            filtered = filtered.filter(req => req.status === statusFilter);
        }

        // Category filter
        if (categoryFilter !== 'Tümü') {
            filtered = filtered.filter(req => req.category === categoryFilter);
        }

        setFilteredRequests(filtered);
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/feedback/update-status/${id}`, `"${status}"`, {
                headers: { 'Content-Type': 'application/json' }
            });
            fetchRequests();
        } catch (err) {
            alert('Güncelleme başarısız');
        }
    };

    const bulkUpdateStatus = async (status) => {
        if (selectedIds.length === 0) {
            alert('Lütfen en az bir başvuru seçin');
            return;
        }

        try {
            await Promise.all(
                selectedIds.map(id =>
                    axios.put(`/api/feedback/update-status/${id}`, `"${status}"`, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                )
            );
            setSelectedIds([]);
            fetchRequests();
        } catch (err) {
            alert('Toplu güncelleme başarısız');
        }
    };

    const toggleSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredRequests.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredRequests.map(r => r.id));
        }
    };

    const openDetailModal = (request) => {
        setSelectedRequest(request);
        setShowDetailModal(true);
        setResponseText('');
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
        setSelectedRequest(null);
        setResponseText('');
    };

    // Statistics
    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === 'Beklemede').length,
        inProgress: requests.filter(r => r.status === 'İnceleniyor').length,
        completed: requests.filter(r => r.status === 'Tamamlandı').length
    };

    const categories = ['Tümü', ...new Set(requests.map(r => r.category).filter(Boolean))];

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] shadow-lg border border-blue-500/20">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase italic tracking-tight">
                            İstek & Şikayet Yönetimi
                        </h1>
                        <p className="text-blue-100 font-medium mt-2">
                            Vatandaşlardan gelen tüm taleplerin merkezi yönetimi
                        </p>
                    </div>
                    <button
                        onClick={fetchRequests}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all backdrop-blur-sm border border-white/20"
                    >
                        <ArrowPathIcon className="h-5 w-5" />
                        Yenile
                    </button>
                </div>
            </header>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-3xl border border-slate-200 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Toplam</p>
                            <p className="text-4xl font-black text-slate-900 mt-2">{stats.total}</p>
                        </div>
                        <InboxIcon className="h-12 w-12 text-slate-400" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-3xl border border-amber-200 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-amber-700 uppercase tracking-widest">Beklemede</p>
                            <p className="text-4xl font-black text-amber-900 mt-2">{stats.pending}</p>
                        </div>
                        <ClockIcon className="h-12 w-12 text-amber-400" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-3xl border border-blue-200 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-blue-700 uppercase tracking-widest">İnceleniyor</p>
                            <p className="text-4xl font-black text-blue-900 mt-2">{stats.inProgress}</p>
                        </div>
                        <ExclamationTriangleIcon className="h-12 w-12 text-blue-400" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-3xl border border-emerald-200 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">Tamamlandı</p>
                            <p className="text-4xl font-black text-emerald-900 mt-2">{stats.completed}</p>
                        </div>
                        <CheckCircleIcon className="h-12 w-12 text-emerald-400" />
                    </div>
                </motion.div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2 relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Ad, email, konu, mesaj veya takip kodu ile ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <FunnelIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        >
                            <option value="Tümü">Tüm Durumlar</option>
                            <option value="Beklemede">Beklemede</option>
                            <option value="İnceleniyor">İnceleniyor</option>
                            <option value="Tamamlandı">Tamamlandı</option>
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <ChartBarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat === 'Tümü' ? 'Tüm Kategoriler' : cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3"
                    >
                        <span className="text-sm font-black text-slate-900">
                            {selectedIds.length} başvuru seçildi
                        </span>
                        <button
                            onClick={() => bulkUpdateStatus('İnceleniyor')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            İncelemeye Al
                        </button>
                        <button
                            onClick={() => bulkUpdateStatus('Tamamlandı')}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            Tamamlandı İşaretle
                        </button>
                        <button
                            onClick={() => setSelectedIds([])}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            Seçimi Temizle
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Requests List */}
            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Select All */}
                    {filteredRequests.length > 0 && (
                        <div className="flex items-center gap-3 px-4">
                            <input
                                type="checkbox"
                                checked={selectedIds.length === filteredRequests.length && filteredRequests.length > 0}
                                onChange={toggleSelectAll}
                                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm font-bold text-slate-600">Tümünü Seç</span>
                        </div>
                    )}

                    {filteredRequests.map((req) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`bg-white p-6 rounded-3xl border shadow-sm hover:shadow-xl transition-all group ${selectedIds.includes(req.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-100 hover:border-blue-100'
                                }`}
                        >
                            <div className="flex gap-4">
                                {/* Checkbox */}
                                <div className="flex items-start pt-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(req.id)}
                                        onChange={() => toggleSelection(req.id)}
                                        className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Left: User Info & Status */}
                                        <div className="lg:w-1/4 space-y-3">
                                            <span className={`inline-block px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${req.status === 'Beklemede' ? 'bg-amber-50 text-amber-600' :
                                                    req.status === 'İnceleniyor' ? 'bg-blue-50 text-blue-600' :
                                                        'bg-emerald-50 text-emerald-600'
                                                }`}>
                                                {req.status}
                                            </span>
                                            <div className="space-y-2">
                                                <p className="text-sm font-black text-slate-900 truncate">{req.fullName}</p>
                                                <p className="text-xs font-medium text-slate-500 flex items-center gap-2 truncate">
                                                    <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
                                                    <span className="truncate">{req.email}</span>
                                                </p>
                                                <p className="text-xs font-medium text-slate-500 flex items-center gap-2">
                                                    <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                                                    {req.phone}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Middle: Request Details */}
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                    {req.category}
                                                </span>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {new Date(req.createdDate).toLocaleString('tr-TR')}
                                                </p>
                                                <span className="ml-auto text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic">
                                                    #{req.trackingCode}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-black text-slate-900 italic tracking-tight leading-tight line-clamp-1">
                                                {req.subject}
                                            </h3>
                                            <p className="text-slate-600 font-medium leading-relaxed line-clamp-2">
                                                {req.message}
                                            </p>
                                        </div>

                                        {/* Right: Actions */}
                                        <div className="lg:w-auto flex lg:flex-col gap-2">
                                            <button
                                                onClick={() => openDetailModal(req)}
                                                className="flex-1 lg:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                                <span className="hidden lg:inline">Detay</span>
                                            </button>
                                            <button
                                                onClick={() => updateStatus(req.id, 'İnceleniyor')}
                                                disabled={req.status === 'İnceleniyor'}
                                                className="flex-1 lg:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                                            >
                                                İncele
                                            </button>
                                            <button
                                                onClick={() => updateStatus(req.id, 'Tamamlandı')}
                                                disabled={req.status === 'Tamamlandı'}
                                                className="flex-1 lg:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckIcon className="h-4 w-4" />
                                                <span className="hidden lg:inline">Çözüldü</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredRequests.length === 0 && (
                        <div className="bg-white p-20 rounded-[3rem] text-center border border-slate-100 border-dashed">
                            <InboxIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                                {searchTerm || statusFilter !== 'Tümü' || categoryFilter !== 'Tümü'
                                    ? 'Filtrelere uygun başvuru bulunamadı'
                                    : 'Henüz bir başvuru bulunmuyor'}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Detail Modal */}
            <AnimatePresence>
                {showDetailModal && selectedRequest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeDetailModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[3rem] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 relative">
                                <button
                                    onClick={closeDetailModal}
                                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all backdrop-blur-sm"
                                >
                                    <XMarkIcon className="h-6 w-6 text-white" />
                                </button>
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <span className={`inline-block px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest mb-3 ${selectedRequest.status === 'Beklemede' ? 'bg-amber-400 text-amber-900' :
                                                selectedRequest.status === 'İnceleniyor' ? 'bg-blue-400 text-blue-900' :
                                                    'bg-emerald-400 text-emerald-900'
                                            }`}>
                                            {selectedRequest.status}
                                        </span>
                                        <h2 className="text-2xl font-black text-white italic tracking-tight leading-tight">
                                            {selectedRequest.subject}
                                        </h2>
                                        <p className="text-blue-100 font-medium mt-2">
                                            Takip Kodu: #{selectedRequest.trackingCode}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                                {/* User Info */}
                                <div className="bg-slate-50 rounded-3xl p-6 mb-6">
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Başvuru Sahibi</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ad Soyad</p>
                                            <p className="text-base font-black text-slate-900">{selectedRequest.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Kategori</p>
                                            <p className="text-base font-black text-slate-900">{selectedRequest.category}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">E-posta</p>
                                            <p className="text-base font-medium text-slate-700">{selectedRequest.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Telefon</p>
                                            <p className="text-base font-medium text-slate-700">{selectedRequest.phone}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Başvuru Tarihi</p>
                                            <p className="text-base font-medium text-slate-700">
                                                {new Date(selectedRequest.createdDate).toLocaleString('tr-TR', {
                                                    dateStyle: 'full',
                                                    timeStyle: 'short'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="mb-6">
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Mesaj</h3>
                                    <div className="bg-slate-50 rounded-3xl p-6">
                                        <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                                            {selectedRequest.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Response Section */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                                        Yanıt Notu (Opsiyonel)
                                    </h3>
                                    <textarea
                                        value={responseText}
                                        onChange={(e) => setResponseText(e.target.value)}
                                        placeholder="Bu başvuru için bir not ekleyebilirsiniz..."
                                        rows={4}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-8 pt-0 flex flex-wrap gap-3">
                                <button
                                    onClick={() => {
                                        updateStatus(selectedRequest.id, 'İnceleniyor');
                                        closeDetailModal();
                                    }}
                                    disabled={selectedRequest.status === 'İnceleniyor'}
                                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-2xl font-black uppercase tracking-widest transition-all"
                                >
                                    İncelemeye Al
                                </button>
                                <button
                                    onClick={() => {
                                        updateStatus(selectedRequest.id, 'Tamamlandı');
                                        closeDetailModal();
                                    }}
                                    disabled={selectedRequest.status === 'Tamamlandı'}
                                    className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-2xl font-black uppercase tracking-widest transition-all"
                                >
                                    Tamamlandı İşaretle
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
