import { useState, useRef, useEffect } from 'react';
import Seo from '../components/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DocumentTextIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon,
    PrinterIcon,
    InformationCircleIcon,
    UserIcon,
    IdentificationIcon,
    ChatBubbleBottomCenterTextIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const templates = [
    {
        id: 'genel',
        name: 'Genel İstek ve Şikayet',
        description: 'Her türlü görüş, öneri ve talebiniz için kullanabileceğiniz standart başvuru formu.',
        title: 'YAZI İŞLERİ MÜDÜRLÜĞÜNE',
        content: 'Beldemiz [ADRES] mevkiinde ikamet etmekteyim. [DETAY] konusu ile ilgili yaşadığım mağduriyetin giderilmesi ve gerekli incelemelerin yapılmasını arz ederim.'
    },
    {
        id: 'imar',
        name: 'İmar Durum Belgesi Talebi',
        description: 'Taşınmazınızın yapılaşma koşullarını öğrenmek için resmi başvuru.',
        title: 'İMAR VE ŞEHİRCİLİK MÜDÜRLÜĞÜNE',
        content: 'Mülkiyeti tarafıma ait olan [ADRES] adresindeki, Tapu Sicil Müdürlüğü kayıtlarında [DETAY] Ada/Parsel numarasında kayıtlı taşınmazımın güncel imar durum belgesinin düzenlenerek tarafıma verilmesini arz ederim.'
    },
    {
        id: 'yol-ariza',
        name: 'Yol ve Parke Onarım Talebi',
        description: 'Bozulan yollar, çöken kaldırımlar veya eksik parke taşları için bildirim.',
        title: 'FEN İŞLERİ MÜDÜRLÜĞÜNE',
        content: 'Beldemiz [ADRES] bölgesinde bulunan [DETAY] üzerinde meydana gelen bozulmalar (çukur, çökme vb.) yaya ve araç trafiğini tehlikeye düşürmektedir. Söz konusu bölgenin ivedilikle onarılmasını arz ederim.'
    },
    {
        id: 'temizlik',
        name: 'Çevre ve Temizlik Hizmeti',
        description: 'Çöp toplama, konteyner talebi veya çevre kirliliği bildirimleri.',
        title: 'TEMİZLİK İŞLERİ MÜDÜRLÜĞÜNE',
        content: '[ADRES] adresinde bulunan [DETAY] hususu ile ilgili çevre temizliğinin yapılması ve gerekli hijyen şartlarının sağlanmasını arz ederim.'
    },
    {
        id: 'sosyal',
        name: 'Sosyal Yardım ve Gıda Talebi',
        description: 'Belediyemizin sosyal yardım projelerinden faydalanma başvurusu.',
        title: 'KÜLTÜR VE SOSYAL İŞLER MÜDÜRLÜĞÜNE',
        content: '[ADRES] adresinde ikamet etmekteyim. Geçimimi sağlamakta güçlük çekmem nedeniyle belediyeniz tarafından ihtiyaç sahiplerine sunulan [DETAY] yardımından faydalanmak istiyorum. Gereğini bilgilerinize arz ederim.'
    },
    {
        id: 'is-basvuru',
        name: 'İş ve Staj Başvurusu',
        description: 'Belediye bünyesinde görev almak veya staj yapmak için genel başvuru.',
        title: 'İNSAN KAYNAKLARI VE EĞİTİM MÜDÜRLÜĞÜNE',
        content: 'Belediyeniz bünyesinde uygun görülecek pozisyonlarda görev almak istiyorum. Ekte sunduğum bilgiler ışığında [DETAY] konusundaki yetkinliklerimin değerlendirilmesini arz ederim.'
    },
    {
        id: 'durak',
        name: 'Ulaşım ve Durak Talebi',
        description: 'Toplu taşıma güzergahı veya yeni durak noktası belirlenmesi talebi.',
        title: 'ZABITA AMİRLİĞİ VE ULAŞIM BİRİMİNE',
        content: 'Beldemiz [ADRES] mevkiinde toplu taşıma araçlarından yararlanmakta güçlük çekmekteyiz. Belirlenen [DETAY] noktasına yeni bir durak kabini konulmasını veya güzergah değişikliğini arz ederim.'
    },
    {
        id: 'park-bakim',
        name: 'Park ve Oyun Alanı Bakımı',
        description: 'Çocuk parklarındaki oyuncakların onarımı veya park bakımı talebi.',
        title: 'PARK VE BAHÇELER MÜDÜRLÜĞÜNE',
        content: '[ADRES] mevkiinde bulunan çocuk oyun parkındaki [DETAY] araçlarının arızalı/tehlikeli olması sebebiyle bakım ve onarımının yapılmasını arz ederim.'
    }
];

export default function PetitionService() {
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
    const [formData, setFormData] = useState({
        fullName: '',
        tcNo: '',
        phone: '',
        address: '',
        details: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(true); // Default to true for better feedback
    const petitionRef = useRef();

    const getFormattedContent = () => {
        let content = selectedTemplate.content;
        content = content.replace(/\[ADRES\]/g, formData.address ? formData.address.toUpperCase() : '........................................');
        content = content.replace(/\[DETAY\]/g, formData.details ? formData.details.toUpperCase() : '........................................');
        return content;
    };

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        try {
            // Save to DB via feedback API
            await axios.post('/api/feedback', {
                fullName: formData.fullName,
                email: 'dilekce@guneyyurt.bel.tr',
                phone: formData.phone,
                subject: selectedTemplate.name,
                category: 'Online Dilekçe',
                message: `T.C. No: ${formData.tcNo}\nAdres: ${formData.address}\nKonu: ${formData.details}\n\n${getFormattedContent()}`,
                status: 'Beklemede'
            });

            const element = petitionRef.current;
            const canvas = await html2canvas(element, {
                scale: 3, // Higher scale for text clarity
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${selectedTemplate.id}_dilekce_${formData.fullName.replace(/\s+/g, '_')}.pdf`);

            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            alert('İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Online Dilekçe Masası | Güneyyurt Belediyesi" description="Belediyemizin dijital hizmetleri kapsamında hazır taslaklarla dilekçenizi anında oluşturun." />

            {/* Header Hero */}
            <div className="bg-indigo-900 pt-52 lg:pt-64 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                    <div className="h-20 w-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 border border-white/20">
                        <DocumentTextIcon className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Dilekçe Masası</h1>
                    <div className="h-1.5 w-24 bg-indigo-500 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-indigo-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80 leading-relaxed">
                        Vakit Kaybetmeden, Hazır Taslaklarla Başvurunuzu Oluşturun.
                    </p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 -mt-24 relative z-20">
                <div className="flex flex-col xl:flex-row gap-12">

                    {/* Sidebar: Templates */}
                    <div className="xl:w-1/3 space-y-6">
                        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 sticky top-32">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                                <InformationCircleIcon className="h-5 w-5 text-indigo-600" /> Başvuru Konusu Seçiniz
                            </h3>
                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                                {templates.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => { setSelectedTemplate(t); setIsSubmitted(false); }}
                                        className={`w-full text-left p-6 rounded-2xl transition-all border-2 flex flex-col gap-2 ${selectedTemplate.id === t.id
                                            ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-600/5'
                                            : 'border-transparent bg-slate-50 hover:bg-slate-100'
                                            }`}
                                    >
                                        <p className={`text-sm font-black uppercase tracking-tight ${selectedTemplate.id === t.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                                            {t.name}
                                        </p>
                                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase opacity-70">{t.description}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 italic text-[10px] font-bold text-amber-800">
                                    <InformationCircleIcon className="h-5 w-5 shrink-0" />
                                    Lütfen tüm alanları eksiksiz ve doğru beyanlarla doldurunuz.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Form & Preview */}
                    <div className="xl:w-2/3 space-y-8">
                        <div className="bg-white rounded-[4rem] p-10 lg:p-16 shadow-2xl border border-slate-100 relative overflow-hidden">
                            {!isSubmitted ? (
                                <div className="space-y-12">
                                    <div className="pb-8 border-b border-slate-50 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Dilekçe Formu</h2>
                                            <p className="text-sm text-slate-500 font-bold italic uppercase tracking-widest opacity-60 mt-2">Kimlik ve başvuru bilgilerinizi giriniz.</p>
                                        </div>
                                        <div className="flex items-center gap-3 px-6 py-2 bg-indigo-50 rounded-full text-indigo-600 font-black text-[10px] uppercase tracking-widest border border-indigo-100">
                                            <DocumentTextIcon className="h-4 w-4" /> {selectedTemplate.name}
                                        </div>
                                    </div>

                                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); handleDownloadPDF(); }}>
                                        <div className="space-y-8">
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block flex items-center gap-2">
                                                    <UserIcon className="h-4 w-4 text-indigo-600" /> Adınız Soyadınız
                                                </label>
                                                <input required type="text" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/20 font-bold placeholder:opacity-30" placeholder="Örn: Ahmet YILMAZ"
                                                    value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value.toUpperCase() })} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block flex items-center gap-2">
                                                    <IdentificationIcon className="h-4 w-4 text-indigo-600" /> T.C. Kimlik No
                                                </label>
                                                <input required type="text" maxLength="11" pattern="\d{11}" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/20 font-bold placeholder:opacity-30" placeholder="11 Haneli T.C. No"
                                                    value={formData.tcNo} onChange={e => setFormData({ ...formData, tcNo: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block flex items-center gap-2">
                                                    <PhoneIcon className="h-4 w-4 text-indigo-600" /> İletişim Telefonu
                                                </label>
                                                <input required type="tel" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/20 font-bold placeholder:opacity-30" placeholder="05XX XXX XX XX"
                                                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block flex items-center gap-2">
                                                    <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-indigo-600" /> Konu / Detay
                                                </label>
                                                <input required type="text" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/20 font-bold placeholder:opacity-30" placeholder="Mahalle Adı / Arıza Türü / Talep"
                                                    value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value.toUpperCase() })} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Adres Bilgisi (İlgili Mevki)</label>
                                                <textarea required rows="4" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/20 font-bold placeholder:opacity-30 resize-none" placeholder="Mahalle, Sokak ve Bina No..."
                                                    value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value.toUpperCase() })}></textarea>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 pt-8">
                                            <button type="submit" disabled={isGenerating} className="w-full py-6 bg-indigo-900 hover:bg-black text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-900/40 transition-all flex items-center justify-center gap-4 group">
                                                {isGenerating ? (
                                                    <div className="h-6 w-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <>BAŞVURUYU TAMAMLA VE PDF İNDİR <ArrowDownTrayIcon className="h-6 w-6 group-hover:translate-y-1 transition-transform" /></>
                                                )}
                                            </button>
                                        </div>
                                    </form>

                                    {/* Premium Paper Preview Section */}
                                    <div className="pt-20 border-t border-slate-50">
                                        <div className="flex items-center justify-between mb-12">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-xl shadow-amber-600/10">
                                                    <EyeIcon className="h-6 w-6" />
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-900 uppercase italic">Canlı Önizleme</h3>
                                            </div>
                                            <div className="px-5 py-2 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">Resmi Belge Taslağı</div>
                                        </div>

                                        <div className="bg-slate-50 p-6 sm:p-16 rounded-[4rem] border-2 border-dashed border-slate-200 flex justify-center">
                                            <div className="overflow-x-auto w-full no-scrollbar flex justify-center">
                                                {/* Actual PDF Container */}
                                                <div ref={petitionRef} style={{
                                                    width: '210mm',
                                                    height: '297mm', // Fixed A4 Aspect
                                                    padding: '30mm 25mm 25mm 30mm',
                                                    fontFamily: 'Times New Roman, serif',
                                                    color: '#000',
                                                    backgroundColor: '#fff',
                                                    boxShadow: '0 40px 100px -20px rgba(0,0,0,0.15)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    fontSize: '12pt',
                                                    lineHeight: '1.5'
                                                }}>
                                                    {/* Header */}
                                                    <div style={{ textAlign: 'center', marginBottom: '15mm' }}>
                                                        <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '0', letterSpacing: '2px' }}>T.C.</h1>
                                                        <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '0', letterSpacing: '1px' }}>KARAMAN VİLAYETİ</h1>
                                                        <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '0' }}>GÜNEYYURT BELEDİYE BAŞKANLIĞINA</h1>
                                                        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', marginTop: '8mm', textDecoration: 'underline' }}>({selectedTemplate.title})</h2>
                                                    </div>

                                                    {/* Date */}
                                                    <div style={{ textAlign: 'right', marginBottom: '10mm', fontWeight: 'bold' }}>
                                                        {new Date().toLocaleDateString('tr-TR')}
                                                    </div>

                                                    {/* Content Body */}
                                                    <div style={{ textAlign: 'justify', flexGrow: '1', whiteSpace: 'pre-wrap' }}>
                                                        {getFormattedContent()}
                                                        <br /><br />
                                                        Gereğinin yapılmasını saygılarımla arz ederim.
                                                    </div>

                                                    {/* Signature Area */}
                                                    <div style={{ width: '60mm', marginLeft: 'auto', textAlign: 'center', marginTop: '20mm' }}>
                                                        <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '2mm' }}>Ad Soyad / İmza</div>
                                                        <div style={{ fontWeight: 'bold', fontSize: '13pt' }}>{formData.fullName || '........................................'}</div>
                                                    </div>

                                                    {/* Contact Info Footer */}
                                                    <div style={{ marginTop: '20mm', borderTop: '0.5mm solid #000', paddingTop: '5mm', fontSize: '10pt' }}>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '40mm 1fr', gap: '5mm' }}>
                                                            <strong>T.C. KİMLİK NO</strong><span>: {formData.tcNo || '........................................'}</span>
                                                            <strong>İLETİŞİM TEL</strong><span>: {formData.phone || '........................................'}</span>
                                                            <strong>TEBLİGAT ADRESİ</strong><span>: {formData.address || '........................................'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <button type="submit" disabled={isGenerating} className="w-full py-6 bg-indigo-900 hover:bg-black text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-900/40 transition-all flex items-center justify-center gap-4 group">
                                            {isGenerating ? (
                                                <div className="h-6 w-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>DİLEKÇEYİ OLUŞTUR VE İNDİR <ArrowDownTrayIcon className="h-6 w-6 group-hover:translate-y-1 transition-transform" /></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                    <div className="h-28 w-28 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                        <CheckCircleIcon className="h-16 w-16" />
                                    </div>
                                    <h2 className="text-4xl font-black text-slate-900 uppercase italic mb-6">Başvurunuz Alınmıştır!</h2>
                                    <p className="text-xl font-bold text-slate-500 max-w-lg mx-auto leading-relaxed mb-12 italic">
                                        “Dilekçeniz başarıyla oluşturulup sistemimize kaydedilmiştir. Belediyemiz en kısa sürede sizinle iletişime geçecektir.”
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <button onClick={() => window.print()} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all">
                                            <PrinterIcon className="h-5 w-5" /> ŞİMDİ YAZDIR
                                        </button>
                                        <button onClick={() => setIsSubmitted(false)} className="px-10 py-5 border-2 border-slate-200 text-slate-600 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                                            YENİ DİLEKÇE OLUŞTUR
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

