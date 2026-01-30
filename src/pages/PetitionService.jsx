import { useState, useRef } from 'react';
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
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const templates = [
    {
        id: 'genel',
        name: 'Genel Dilekçe',
        description: 'Her türlü istek ve şikayetiniz için kullanabileceğiniz standart dilekçe örneği.',
        title: 'GÜNEYYURT BELEDİYE BAŞKANLIĞINA',
        content: 'Beldemiz [MAHALLE] mahallesinde ikamet etmekteyim. [KONU] hakkında gereğinin yapılmasını arz ederim.'
    },
    {
        id: 'imar',
        name: 'İmar Durum Belgesi Talebi',
        description: 'Taşınmazınızın imar durumunu öğrenmek için başvuruda bulunabilirsiniz.',
        title: 'İMAR VE ŞEHİRCİLİK MÜDÜRLÜĞÜNE',
        content: '[ADA] Ada, [PARSEL] Parselde bulunan taşınmazımın güncel imar durum belgesinin tarafıma verilmesini arz ederim.'
    },
    {
        id: 'sosyal',
        name: 'Sosyal Yardım Başvurusu',
        description: 'Belediyemizin sunduğu sosyal yardımlardan faydalanmak için başvuru dilekçesi.',
        title: 'KÜLTÜR VE SOSYAL İŞLER MÜDÜRLÜĞÜNE',
        content: 'Geçimimi sağlamakta zorluk çekmekteyim. Belediyeniz tarafından sağlanan sosyal yardımlardan faydalanmak istiyorum. Durumumun incelenerek gereğinin yapılmasını arz ederim.'
    },
    {
        id: 'altyapi',
        name: 'Altyapı Arıza Bildirimi',
        description: 'Yol, su, kanalizasyon gibi altyapı sorunlarının giderilmesi için talep dilekçesi.',
        title: 'FEN İŞLERİ MÜDÜRLÜĞÜNE',
        content: 'Beldemiz [ADRES] bölgesinde meydana gelen [ARIZA_TURU] sorununun ivedilikle giderilmesini arz ederim.'
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
    const petitionRef = useRef();

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        const element = petitionRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`dilekce_${new Date().getTime()}.pdf`);
        setIsGenerating(false);
        setIsSubmitted(true);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-32">
            <Seo title="Online Dilekçe İşlemleri | Güneyyurt Belediyesi" description="Hazır dilekçe taslakları ile başvurunuzu anında oluşturun ve PDF olarak indirin." />

            {/* Header Hero */}
            <div className="bg-indigo-900 pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                    <div className="h-20 w-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 border border-white/20">
                        <DocumentTextIcon className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">Online Dilekçe Masası</h1>
                    <div className="h-1.5 w-24 bg-indigo-500 mx-auto mt-8 rounded-full"></div>
                    <p className="mt-8 text-indigo-100 font-bold max-w-2xl mx-auto text-lg uppercase tracking-widest opacity-80 leading-relaxed">
                        Vakit Kaybetmeden, Hazır Taslaklarla Başvurunuzu Oluşturun.
                    </p>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 -mt-24 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar: Templates */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                                <InformationCircleIcon className="h-5 w-5 text-indigo-600" /> Dilekçe Türünü Seçin
                            </h3>
                            <div className="space-y-4">
                                {templates.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => { setSelectedTemplate(t); setIsSubmitted(false); }}
                                        className={`w-full text-left p-6 rounded-2xl transition-all border-2 ${selectedTemplate.id === t.id
                                                ? 'border-indigo-600 bg-indigo-50/50 shadow-md'
                                                : 'border-transparent bg-slate-50 hover:bg-slate-100'
                                            }`}
                                    >
                                        <p className={`text-sm font-black uppercase tracking-tight mb-2 ${selectedTemplate.id === t.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                                            {t.name}
                                        </p>
                                        <p className="text-xs text-slate-500 font-bold leading-relaxed">{t.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/10 blur-3xl" />
                            <h4 className="text-xl font-black mb-6 uppercase italic tracking-tight">Nasıl Çalışır?</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-400">
                                <li className="flex items-start gap-3 italic">
                                    <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</div>
                                    Size uygun şablonu soldan seçin.
                                </li>
                                <li className="flex items-start gap-3 italic">
                                    <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</div>
                                    Bilgilerinizi eksiksiz doldurun.
                                </li>
                                <li className="flex items-start gap-3 italic">
                                    <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</div>
                                    "Dilekçe Oluştur" butonuyla PDF indirin.
                                </li>
                                <li className="flex items-start gap-3 italic">
                                    <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</div>
                                    Başvurunuz otomatik olarak kaydedilir.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content: Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-[4rem] p-10 lg:p-16 shadow-2xl border border-slate-100">
                            {!isSubmitted ? (
                                <div className="space-y-12">
                                    <div className="pb-8 border-b border-slate-50">
                                        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">Dilekçe Bilgileri</h2>
                                        <p className="text-sm text-slate-500 font-bold italic uppercase tracking-widest opacity-60">Lütfen aşağıdaki alanları dilekçenizde yer alacak şekilde doldurunuz.</p>
                                    </div>

                                    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleDownloadPDF(); }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block flex items-center gap-2">
                                                    <UserIcon className="h-4 w-4 text-indigo-600" /> Adınız Soyadınız
                                                </label>
                                                <input required type="text" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/10 font-bold" placeholder="Ahmet Yılmaz"
                                                    value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block flex items-center gap-2">
                                                    <IdentificationIcon className="h-4 w-4 text-indigo-600" /> T.C. Kimlik No
                                                </label>
                                                <input required type="text" maxLength="11" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/10 font-bold" placeholder="11 haneli"
                                                    value={formData.tcNo} onChange={e => setFormData({ ...formData, tcNo: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Telefon No</label>
                                                <input required type="tel" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/10 font-bold" placeholder="05XX XXX XX XX"
                                                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block flex items-center gap-2">
                                                    <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-indigo-600" /> Talep Detayı
                                                </label>
                                                <input required type="text" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/10 font-bold" placeholder="Konuyu kısaca özetleyin"
                                                    value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">İşlem Yapılacak Adres / Mevki</label>
                                            <textarea required rows="3" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/10 font-bold resize-none" placeholder="Mahalle, cadde, sokak ve kapı no belirtiniz..."
                                                value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                                        </div>

                                        {/* Hidden Preview for PDF Generation */}
                                        <div className="hidden">
                                            <div ref={petitionRef} style={{ width: '210mm', padding: '25mm', fontFamily: 'serif', color: '#000', backgroundColor: '#fff' }}>
                                                <div style={{ textAlign: 'center', marginBottom: '20mm' }}>
                                                    <h1 style={{ fontSize: '16pt', fontWeight: 'bold', margin: '0' }}>T.C.</h1>
                                                    <h1 style={{ fontSize: '16pt', fontWeight: 'bold', margin: '0' }}>KARAMAN / ERMENEK</h1>
                                                    <h1 style={{ fontSize: '16pt', fontWeight: 'bold', margin: '0' }}>GÜNEYYURT BELEDİYE BAŞKANLIĞI</h1>
                                                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginTop: '5mm' }}>{selectedTemplate.title}</h2>
                                                </div>

                                                <div style={{ fontSize: '12pt', lineHeight: '1.8', textAlign: 'justify' }}>
                                                    {selectedTemplate.content.replace('[CONU]', formData.details).replace('[ADRES]', formData.address).replace('[ARIZA_TURU]', formData.details)}
                                                    <br /><br />
                                                    Gereğinin yapılmasını saygılarımla arz ederim.
                                                </div>

                                                <div style={{ marginTop: '20mm', float: 'right', textAlign: 'center' }}>
                                                    <p style={{ fontWeight: 'bold', marginBottom: '2mm' }}>{new Date().toLocaleDateString('tr-TR')}</p>
                                                    <p style={{ fontWeight: 'bold' }}>{formData.fullName}</p>
                                                    <p>(İmza)</p>
                                                </div>

                                                <div style={{ marginTop: '50mm', borderTop: '1px solid #000', paddingTop: '5mm', fontSize: '10pt' }}>
                                                    <p><strong>Adres:</strong> {formData.address}</p>
                                                    <p><strong>T.C. No:</strong> {formData.tcNo}</p>
                                                    <p><strong>Telefon:</strong> {formData.phone}</p>
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
                                    </form>
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
