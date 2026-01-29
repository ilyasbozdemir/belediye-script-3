// Mock API Service - Tüm backend API'lerini simüle eder
// LocalStorage kullanarak veri kalıcılığı sağlar

const STORAGE_KEYS = {
    NEWS: 'mock_news',
    PROJECTS: 'mock_projects',
    BUSINESSES: 'mock_businesses',
    FEEDBACK: 'mock_feedback',
    EVENTS: 'mock_events',
    TENDERS: 'mock_tenders',
    SPECIAL_DAYS: 'mock_special_days',
    SETTINGS: 'mock_settings',
    PRESIDENT: 'mock_president',
    STAFF: 'mock_staff',
    MARRIAGES: 'mock_marriages',
    DECEASED: 'mock_deceased',
    REPORTS: 'mock_reports',
    STRATEGIC_PLAN: 'mock_strategic_plan',
    WEATHER_PRAYER: 'mock_weather_prayer',
    COUNCIL: 'mock_council',
    COMMITTEE: 'mock_committee'
};

// Yardımcı fonksiyonlar
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const getFromStorage = (key, defaultValue) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch {
        return defaultValue;
    }
};

const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Storage error:', e);
    }
};

const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9);

// İlk yükleme için varsayılan veriler
const initializeDefaultData = () => {
    // News
    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
        const defaultNews = [
            {
                id: '1',
                title: 'Kültür Merkezi Törenle Hizmete Açıldı',
                content: 'Güneyyurt Belediyesi tarafından inşa edilen Kültür Merkezi, Belediye Başkanı Ahmet Arı ve çok sayıda vatandaşın katılımıyla düzenlenen törenle hizmete açıldı. 500 kişi kapasiteli nikah salonu, 200 kişilik konferans salonu ve 5000 kitap kapasiteli kütüphane içeren modern tesis, beldemizin kültürel hayatına önemli katkı sağlayacak.',
                imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
                category: 'Etkinlik',
                createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '2',
                title: 'Asfalt ve Kaldırım Çalışmaları Sürüyor',
                content: 'Belediyemiz tarafından başlatılan asfalt ve kaldırım yenileme çalışmaları hız kesmeden devam ediyor. Merkez mahalle ve bağlı mahallelerimizde toplam 12 km asfalt ve 8 km kaldırım yenileme çalışması yapılıyor. Çalışmalar sonunda vatandaşlarımız daha konforlu yollara kavuşacak.',
                imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
                category: 'Hizmet',
                createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '3',
                title: 'Yüzme Havuzu İnşaatında Sona Yaklaşıldı',
                content: 'Güneyyurt Belediyesi tarafından yapımı süren Kapalı Yüzme Havuzu ve Spor Kompleksi inşaatında sona yaklaşıldı. Kaba inşaatı tamamlanan tesiste iç mekan çalışmaları devam ediyor. Tesis, yüzme havuzu, fitness salonu, sauna ve spor alanlarından oluşacak.',
                imageUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800',
                category: 'Proje',
                createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '4',
                title: 'Millet Bahçesi Vatandaşların Gözdesi Oldu',
                content: '12.000 m² alan üzerine kurulan Millet Bahçesi, açılışından bu yana vatandaşların en çok tercih ettiği sosyal alan haline geldi. Yürüyüş parkurları, çocuk oyun alanları ve spor alanlarıyla her yaştan vatandaşımıza hizmet veren tesis, özellikle hafta sonları yoğun ilgi görüyor.',
                imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
                category: 'Sosyal',
                createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '5',
                title: 'Belediye Başkanı Mahalle Ziyaretlerini Sürdürüyor',
                content: 'Belediye Başkanı Ahmet Arı, mahalle ziyaretlerini sürdürüyor. Vatandaşlarla bir araya gelen Başkan Arı, talep ve önerileri dinleyerek not alıyor. "Halkımızın sesi bizim için çok önemli" diyen Başkan Arı, tüm taleplerin değerlendirileceğini belirtti.',
                imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
                category: 'Duyuru',
                createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '6',
                title: 'Kanalizasyon Altyapısı Yenileniyor',
                content: 'Belediyemiz tarafından başlatılan kanalizasyon altyapı modernizasyon projesi kapsamında eski hatlar yenileniyor. 8 km yeni hat döşeme işlemi devam eden çalışmalar, çevre sağlığı ve yaşam kalitesi açısından büyük önem taşıyor.',
                imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
                category: 'Hizmet',
                createdDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '7',
                title: 'Ramazan Ayı Hazırlıkları Tamamlandı',
                content: 'Güneyyurt Belediyesi, Ramazan ayı hazırlıklarını tamamladı. Ramazan boyunca vatandaşlarımıza sıcak yemek dağıtımı yapılacak. Ayrıca mahalle iftarları ve sosyal yardım programları düzenlenecek. Başkan Arı, "Ramazan ayının bereketini tüm hemşehrilerimizle paylaşacağız" dedi.',
                imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=800',
                category: 'Sosyal',
                createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '8',
                title: 'LED Aydınlatma Projesi Tamamlandı',
                content: 'Belediyemiz tarafından hayata geçirilen LED aydınlatma projesi tamamlandı. Tüm cadde ve sokaklarda 850 adet LED armatür ile enerji tasarrufu %65 artırıldı. Modern aydınlatma sistemi hem enerji verimliliği sağlıyor hem de güvenliği artırıyor.',
                imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800',
                category: 'Proje',
                createdDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '9',
                isActive: true
            },
            {
                id: '10',
                title: 'Çevre Temizliği Kampanyası Başladı',
                content: 'Güneyyurt Belediyesi "Temiz Çevre, Sağlıklı Gelecek" sloganıyla çevre temizliği kampanyası başlattı. Vatandaşlarımızın da katılımıyla gerçekleştirilen kampanya kapsamında park ve yeşil alanlar, piknik alanları ve mesire yerleri temizleniyor.',
                imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
                category: 'Etkinlik',
                createdDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            }
        ];
        saveToStorage(STORAGE_KEYS.NEWS, defaultNews);
    }

    // Projects
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
        const defaultProjects = [
            // Biten Projeler
            {
                id: '1',
                title: 'Kültür Merkezi İnşaatı',
                description: 'Modern nikah salonu, konferans salonu ve kütüphane içeren kültür merkezi projemiz tamamlanmıştır. 500 kişi kapasiteli nikah salonu, 200 kişilik konferans salonu ve 5000 kitap kapasiteli kütüphane hizmete açılmıştır.',
                status: 'Biten',
                budget: '8.500.000',
                startDate: '2022-03-15',
                endDate: '2024-06-30',
                imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
                completionRate: 100
            },
            {
                id: '2',
                title: 'İçme Suyu Şebeke Yenileme',
                description: 'Beldemizin tüm mahallelerinde içme suyu şebekesi tamamen yenilenmiştir. 15 km ana hat ve 25 km dağıtım hattı döşenmiş, su kayıpları %40 azaltılmıştır.',
                status: 'Biten',
                budget: '3.200.000',
                startDate: '2023-01-10',
                endDate: '2023-12-20',
                imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
                completionRate: 100
            },
            {
                id: '3',
                title: 'Millet Bahçesi Projesi',
                description: '12.000 m² alan üzerine kurulan Millet Bahçesi projemiz tamamlanmıştır. Yürüyüş parkurları, çocuk oyun alanları, spor alanları ve sosyal tesisler vatandaşlarımızın hizmetindedir.',
                status: 'Biten',
                budget: '4.750.000',
                startDate: '2022-06-01',
                endDate: '2023-09-15',
                imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
                completionRate: 100
            },
            {
                id: '4',
                title: 'LED Aydınlatma Projesi',
                description: 'Tüm cadde ve sokaklarda LED aydınlatmaya geçilmiştir. 850 adet LED armatür ile enerji tasarrufu %65 artırılmış, aydınlatma kalitesi iyileştirilmiştir.',
                status: 'Biten',
                budget: '1.850.000',
                startDate: '2023-04-01',
                endDate: '2023-11-30',
                imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800',
                completionRate: 100
            },
            
            // Devam Eden Projeler
            {
                id: '5',
                title: 'Yüzme Havuzu ve Spor Kompleksi',
                description: 'Kapalı yüzme havuzu, fitness salonu, sauna ve spor alanlarından oluşan kompleks inşaatı devam etmektedir. Kaba inşaat %80 tamamlanmıştır.',
                status: 'Devam Eden',
                budget: '12.500.000',
                startDate: '2023-09-01',
                endDate: '2025-06-30',
                imageUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800',
                completionRate: 75
            },
            {
                id: '6',
                title: 'Kanalizasyon Altyapı Modernizasyonu',
                description: 'Eski kanalizasyon hatlarının yenilenmesi ve yeni mahallelere kanalizasyon götürülmesi çalışmaları sürüyor. 8 km hat döşeme işlemi devam etmektedir.',
                status: 'Devam Eden',
                budget: '5.600.000',
                startDate: '2024-02-15',
                endDate: '2024-12-31',
                imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
                completionRate: 45
            },
            {
                id: '7',
                title: 'Asfalt ve Kaldırım Yenileme',
                description: 'Merkez mahalle ve bağlı mahallelerimizde toplam 12 km asfalt ve 8 km kaldırım yenileme çalışmaları devam etmektedir.',
                status: 'Devam Eden',
                budget: '6.800.000',
                startDate: '2024-03-01',
                endDate: '2024-10-31',
                imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
                completionRate: 60
            },
            {
                id: '8',
                title: 'Sosyal Tesis ve Kreş Binası',
                description: '120 çocuk kapasiteli kreş ve sosyal tesis binası inşaatı devam etmektedir. İç mekan çalışmaları başlamıştır.',
                status: 'Devam Eden',
                budget: '4.200.000',
                startDate: '2024-01-10',
                endDate: '2024-12-15',
                imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800',
                completionRate: 55
            },
            
            // Planlanan Projeler
            {
                id: '9',
                title: 'Kent Meydanı Düzenleme Projesi',
                description: 'Belde merkezinde 8.000 m² alan üzerine modern kent meydanı projesi planlanmaktadır. Çeşme, oturma alanları, yeşil alanlar ve otopark düzenlemesi yapılacaktır.',
                status: 'Planlanan',
                budget: '7.500.000',
                startDate: '2025-03-01',
                endDate: '2025-12-31',
                imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800',
                completionRate: 0
            },
            {
                id: '10',
                title: 'Gençlik Merkezi ve Kütüphane',
                description: 'Gençlerimiz için modern bir gençlik merkezi ve dijital kütüphane projesi planlanmaktadır. Bilgisayar laboratuvarı, çalışma salonları ve etkinlik alanları içerecektir.',
                status: 'Planlanan',
                budget: '5.800.000',
                startDate: '2025-06-01',
                endDate: '2026-06-30',
                imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
                completionRate: 0
            },
            {
                id: '11',
                title: 'Atık Su Arıtma Tesisi',
                description: 'Çevre dostu atık su arıtma tesisi projesi planlanmaktadır. Günlük 2.000 m³ kapasiteli modern tesis ile çevre kirliliği önlenecektir.',
                status: 'Planlanan',
                budget: '18.500.000',
                startDate: '2025-09-01',
                endDate: '2027-03-31',
                imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
                completionRate: 0
            },
            {
                id: '12',
                title: 'Bisiklet Yolu ve Yeşil Koridor',
                description: '15 km bisiklet yolu ve yeşil koridor projesi planlanmaktadır. Sürdürülebilir ulaşım ve sağlıklı yaşam için önemli bir adım olacaktır.',
                status: 'Planlanan',
                budget: '3.400.000',
                startDate: '2025-04-15',
                endDate: '2025-11-30',
                imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
                completionRate: 0
            }
        ];
        saveToStorage(STORAGE_KEYS.PROJECTS, defaultProjects);
    }

    // Feedback/Requests
    if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
        const defaultFeedback = [
            {
                id: '1',
                fullName: 'Ahmet Yılmaz',
                email: 'ahmet.yilmaz@email.com',
                phone: '0532 123 4567',
                category: 'Altyapı',
                subject: 'Cadde Aydınlatması Sorunu',
                message: 'Mahallemizdeki cadde aydınlatması yetersiz. Akşam saatlerinde güvenlik sorunu yaşanıyor.',
                status: 'Beklemede',
                trackingCode: 'REQ-2024-001',
                createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: '2',
                fullName: 'Ayşe Demir',
                email: 'ayse.demir@email.com',
                phone: '0533 987 6543',
                category: 'Çevre',
                subject: 'Çöp Toplama Saatleri',
                message: 'Çöp toplama saatleri çok erken. Sabah 05:00\'da gürültü oluyor.',
                status: 'İnceleniyor',
                trackingCode: 'REQ-2024-002',
                createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: '3',
                fullName: 'Mehmet Kaya',
                email: 'mehmet.kaya@email.com',
                phone: '0534 555 1234',
                category: 'Park ve Bahçe',
                subject: 'Park Bakımı Talebi',
                message: 'Mahalle parkımızın bakımı yapılmıyor. Çocuk oyun alanları eskimiş durumda.',
                status: 'Tamamlandı',
                trackingCode: 'REQ-2024-003',
                createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        saveToStorage(STORAGE_KEYS.FEEDBACK, defaultFeedback);
    }

    // Events
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
        const defaultEvents = [
            {
                id: '1',
                title: 'Bahar Şenliği 2024',
                description: 'Geleneksel Güneyyurt Bahar Şenliği tüm vatandaşlarımızı bekliyor. Konser, yöresel yemekler, çocuk etkinlikleri ve çeşitli yarışmalar programda yer alıyor.',
                startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
                location: 'Millet Bahçesi',
                imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: '2',
                title: 'Kitap Fuarı ve Söyleşi',
                description: 'Güneyyurt Belediyesi Kültür Merkezi\'nde düzenlenecek kitap fuarında yazarlarla söyleşi, imza günü ve çocuk atölyeleri yapılacak.',
                startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000).toISOString(),
                location: 'Kültür Merkezi',
                imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: '3',
                title: 'Geleneksel Güreş Müsabakaları',
                description: 'Yıllık geleneksel güreş müsabakalarımız bu yıl da düzenlenecek. Bölgeden ve çevre illerden pehlivanlar yarışacak.',
                startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date(Date.now() + 46 * 24 * 60 * 60 * 1000).toISOString(),
                location: 'Spor Kompleksi',
                imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: '4',
                title: 'Çocuk Tiyatrosu Gösterisi',
                description: 'Çocuklarımız için özel olarak hazırlanan tiyatro gösterisi ücretsiz olarak sahnelenecek. Ailelerin katılımı bekleniyor.',
                startDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
                location: 'Kültür Merkezi Konferans Salonu',
                imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: '5',
                title: 'Kadınlar Günü Etkinliği',
                description: '8 Mart Dünya Kadınlar Günü münasebetiyle kadınlarımız için özel program düzenlenecek. Konser, söyleşi ve ikramlar programda.',
                startDate: new Date(Date.now() + 38 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date(Date.now() + 38 * 24 * 60 * 60 * 1000).toISOString(),
                location: 'Kültür Merkezi',
                imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800'
            }
        ];
        saveToStorage(STORAGE_KEYS.EVENTS, defaultEvents);
    }

    // Tenders (EKAP Tarzı)
    if (!localStorage.getItem(STORAGE_KEYS.TENDERS)) {
        const defaultTenders = [
            {
                id: '1',
                title: 'Belediye Hizmet Binası Tadilat İşi',
                description: 'Güneyyurt Belediyesi Hizmet Binası tadilat işi 4734 sayılı Kamu İhale Kanunu\'nun 19. maddesi kapsamında Açık İhale Usulü ile ihale edilecektir.',
                type: 'Yapım İşi',
                method: 'Açık İhale',
                deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '850.000',
                status: 'Aktif',
                announcementDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                ekapNo: 'EKAP-2024-001234'
            },
            {
                id: '2',
                title: 'İş Makinesi Kiralama Hizmeti Alımı',
                description: '2 adet iş makinesi (greyder ve loder) 1 yıllığına kiralanacaktır. 4734 sayılı Kamu İhale Kanunu\'nun 19. maddesi kapsamında Açık İhale Usulü ile ihale edilecektir.',
                type: 'Hizmet Alımı',
                method: 'Açık İhale',
                deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '450.000',
                status: 'Aktif',
                announcementDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                ekapNo: 'EKAP-2024-001235'
            },
            {
                id: '3',
                title: 'Çöp Konteyneri Alımı',
                description: '100 adet 1100 lt hacimli çöp konteyneri alınacaktır. 4734 sayılı Kamu İhale Kanunu\'nun 19. maddesi kapsamında Açık İhale Usulü ile ihale edilecektir.',
                type: 'Mal Alımı',
                method: 'Açık İhale',
                deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '320.000',
                status: 'Aktif',
                announcementDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                ekapNo: 'EKAP-2024-001236'
            },
            {
                id: '4',
                title: 'Park ve Bahçe Bakım Hizmeti',
                description: 'Belediyemize ait park ve yeşil alanların bakım ve onarım hizmeti alınacaktır. İhale 4734 sayılı Kamu İhale Kanunu\'nun 19. maddesi kapsamında Açık İhale Usulü ile yapılacaktır.',
                type: 'Hizmet Alımı',
                method: 'Açık İhale',
                deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '580.000',
                status: 'Aktif',
                announcementDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                ekapNo: 'EKAP-2024-001237'
            },
            {
                id: '5',
                title: 'Asfalt ve Kaldırım Yapım İşi',
                description: 'Merkez mahalle ve bağlı mahallelerimizde toplam 5 km asfalt ve 3 km kaldırım yapım işi ihale edilecektir. 4734 sayılı Kamu İhale Kanunu\'nun 19. maddesi kapsamında Açık İhale Usulü ile ihale edilecektir.',
                type: 'Yapım İşi',
                method: 'Açık İhale',
                deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '2.500.000',
                status: 'Aktif',
                announcementDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                ekapNo: 'EKAP-2024-001238'
            },
            {
                id: '6',
                title: 'Belediye Araç Filosu Yakıt Alımı',
                description: 'Belediye araç filosu için 1 yıllık yakıt (motorin ve benzin) alımı yapılacaktır. 4734 sayılı Kamu İhale Kanunu\'nun 19. maddesi kapsamında Açık İhale Usulü ile ihale edilecektir.',
                type: 'Mal Alımı',
                method: 'Açık İhale',
                deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '750.000',
                status: 'Aktif',
                announcementDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                ekapNo: 'EKAP-2024-001239'
            },
            {
                id: '7',
                title: 'Kültür Merkezi Mobilya Alımı',
                description: 'Yeni hizmete açılan Kültür Merkezi için masa, sandalye ve diğer mobilya alımı yapılacaktır. 4734 sayılı Kamu İhale Kanunu\'nun 19. maddesi kapsamında Açık İhale Usulü ile ihale edilecektir.',
                type: 'Mal Alımı',
                method: 'Açık İhale',
                deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '420.000',
                status: 'Tamamlandı',
                announcementDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                ekapNo: 'EKAP-2024-001200'
            }
        ];
        saveToStorage(STORAGE_KEYS.TENDERS, defaultTenders);
    }

    // Special Days
    if (!localStorage.getItem(STORAGE_KEYS.SPECIAL_DAYS)) {
        const defaultSpecialDays = [
            {
                id: '1',
                occasion: 'Ramazan Bayramı',
                message: 'Ramazan Bayramınızı en içten dileklerimizle kutlar, sağlık ve mutluluklar dileriz.',
                imageUrl: 'https://picsum.photos/seed/holiday1/800/600',
                isActive: true
            },
            {
                id: '2',
                occasion: 'Kurban Bayramı',
                message: 'Kurban Bayramınız mübarek olsun. Bayramınızı kutlar, nice bayramlara ulaşmanızı dileriz.',
                imageUrl: 'https://picsum.photos/seed/holiday2/800/600',
                isActive: true
            }
        ];
        saveToStorage(STORAGE_KEYS.SPECIAL_DAYS, defaultSpecialDays);
    }

    // Settings
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        const defaultSettings = {
            links: [
                { id: '1', title: 'E-Belediye', url: 'https://ebelediye.example.com', icon: 'globe' },
                { id: '2', title: 'Borç Sorgulama', url: '#', icon: 'document' }
            ],
            social: [
                { id: '1', platform: 'Facebook', url: 'https://facebook.com/belediye', icon: 'facebook' },
                { id: '2', platform: 'Twitter', url: 'https://twitter.com/belediye', icon: 'twitter' },
                { id: '3', platform: 'Instagram', url: 'https://instagram.com/belediye', icon: 'instagram' }
            ],
            slides: [
                { id: '1', title: 'Hoş Geldiniz', imageUrl: 'https://picsum.photos/seed/slide1/1920/600', order: 1 },
                { id: '2', title: 'Hizmetinizdeyiz', imageUrl: 'https://picsum.photos/seed/slide2/1920/600', order: 2 }
            ],
            services: [
                { id: '1', name: 'İmar ve Şehircilik', icon: 'building', description: 'İmar işlemleri' },
                { id: '2', name: 'Çevre Koruma', icon: 'leaf', description: 'Çevre hizmetleri' }
            ]
        };
        saveToStorage(STORAGE_KEYS.SETTINGS, defaultSettings);
    }

    // President
    if (!localStorage.getItem(STORAGE_KEYS.PRESIDENT)) {
        const defaultPresident = {
            name: 'Ahmet ARI',
            bio: 'Belediye Başkanımız 2019 yılından bu yana görevdedir.',
            message: 'Değerli hemşehrilerim, sizlere hizmet etmek bizim için bir onurdur.',
            imageUrl: 'https://picsum.photos/seed/president/400/500'
        };
        saveToStorage(STORAGE_KEYS.PRESIDENT, defaultPresident);
    }

    // Staff
    if (!localStorage.getItem(STORAGE_KEYS.STAFF)) {
        const defaultStaff = [
            {
                id: '1',
                name: 'Ali Veli',
                position: 'İmar Müdürü',
                department: 'İmar ve Şehircilik',
                phone: '0312 123 4567',
                email: 'imar@belediye.gov.tr',
                imageUrl: 'https://picsum.photos/seed/staff1/300/400'
            },
            {
                id: '2',
                name: 'Fatma Yılmaz',
                position: 'Mali Hizmetler Müdürü',
                department: 'Mali Hizmetler',
                phone: '0312 123 4568',
                email: 'mali@belediye.gov.tr',
                imageUrl: 'https://picsum.photos/seed/staff2/300/400'
            }
        ];
        saveToStorage(STORAGE_KEYS.STAFF, defaultStaff);
    }

    // Marriages
    if (!localStorage.getItem(STORAGE_KEYS.MARRIAGES)) {
        const defaultMarriages = [
            {
                id: '1',
                groomName: 'Ahmet Yılmaz',
                brideName: 'Ayşe Demir',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                location: 'Nikah Salonu'
            }
        ];
        saveToStorage(STORAGE_KEYS.MARRIAGES, defaultMarriages);
    }

    // Deceased
    if (!localStorage.getItem(STORAGE_KEYS.DECEASED)) {
        const defaultDeceased = [
            {
                id: '1',
                name: 'Mehmet Kaya',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                age: 75,
                location: 'Merkez Mahallesi'
            }
        ];
        saveToStorage(STORAGE_KEYS.DECEASED, defaultDeceased);
    }

    // Businesses
    if (!localStorage.getItem(STORAGE_KEYS.BUSINESSES)) {
        const defaultBusinesses = [
            {
                id: '1',
                name: 'Güneş Pastanesi',
                category: 'Gıda',
                address: 'Cumhuriyet Cad. No:45',
                phone: '0312 555 1234',
                owner: 'Hasan Güneş',
                imageUrl: 'https://picsum.photos/seed/biz1/400/300'
            },
            {
                id: '2',
                name: 'Yıldız Market',
                category: 'Market',
                address: 'Atatürk Bulvarı No:12',
                phone: '0312 555 5678',
                owner: 'Zeynep Yıldız',
                imageUrl: 'https://picsum.photos/seed/biz2/400/300'
            }
        ];
        saveToStorage(STORAGE_KEYS.BUSINESSES, defaultBusinesses);
    }

    // Weather & Prayer
    if (!localStorage.getItem(STORAGE_KEYS.WEATHER_PRAYER)) {
        const defaultWeatherPrayer = {
            weatherApiKey: '',
            cityName: 'Ankara',
            prayerApiEnabled: true
        };
        saveToStorage(STORAGE_KEYS.WEATHER_PRAYER, defaultWeatherPrayer);
    }

    // Reports
    if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
        const defaultReports = [
            {
                id: '1',
                title: '2023 Faaliyet Raporu',
                year: '2023',
                fileUrl: '#',
                uploadDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        saveToStorage(STORAGE_KEYS.REPORTS, defaultReports);
    }

    // Strategic Plan
    if (!localStorage.getItem(STORAGE_KEYS.STRATEGIC_PLAN)) {
        const defaultStrategicPlan = [
            {
                id: '1',
                title: '2024-2028 Stratejik Plan',
                period: '2024-2028',
                fileUrl: '#',
                uploadDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        saveToStorage(STORAGE_KEYS.STRATEGIC_PLAN, defaultStrategicPlan);
    }

    // Council Members (Meclis Üyeleri)
    if (!localStorage.getItem(STORAGE_KEYS.COUNCIL)) {
        const defaultCouncil = [
            {
                id: '1',
                name: 'John Smith',
                title: 'Meclis Başkanı',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=12',
                phone: '0312 555 0101',
                email: 'j.smith@guneyyurt.bel.tr'
            },
            {
                id: '2',
                name: 'Michael Johnson',
                title: 'Meclis Başkan Vekili',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=13',
                phone: '0312 555 0102',
                email: 'm.johnson@guneyyurt.bel.tr'
            },
            {
                id: '3',
                name: 'Sarah Williams',
                title: 'Meclis Üyesi',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=47',
                phone: '0312 555 0103',
                email: 's.williams@guneyyurt.bel.tr'
            },
            {
                id: '4',
                name: 'David Brown',
                title: 'Meclis Üyesi',
                party: 'CHP',
                imageUrl: 'https://i.pravatar.cc/400?img=14',
                phone: '0312 555 0104',
                email: 'd.brown@guneyyurt.bel.tr'
            },
            {
                id: '5',
                name: 'Emma Davis',
                title: 'Meclis Üyesi',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=48',
                phone: '0312 555 0105',
                email: 'e.davis@guneyyurt.bel.tr'
            },
            {
                id: '6',
                name: 'James Miller',
                title: 'Meclis Üyesi',
                party: 'CHP',
                imageUrl: 'https://i.pravatar.cc/400?img=15',
                phone: '0312 555 0106',
                email: 'j.miller@guneyyurt.bel.tr'
            },
            {
                id: '7',
                name: 'Olivia Wilson',
                title: 'Meclis Üyesi',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=49',
                phone: '0312 555 0107',
                email: 'o.wilson@guneyyurt.bel.tr'
            },
            {
                id: '8',
                name: 'Robert Moore',
                title: 'Meclis Üyesi',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=16',
                phone: '0312 555 0108',
                email: 'r.moore@guneyyurt.bel.tr'
            },
            {
                id: '9',
                name: 'Sophia Taylor',
                title: 'Meclis Üyesi',
                party: 'CHP',
                imageUrl: 'https://i.pravatar.cc/400?img=50',
                phone: '0312 555 0109',
                email: 's.taylor@guneyyurt.bel.tr'
            },
            {
                id: '10',
                name: 'William Anderson',
                title: 'Meclis Üyesi',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=17',
                phone: '0312 555 0110',
                email: 'w.anderson@guneyyurt.bel.tr'
            },
            {
                id: '11',
                name: 'Isabella Thomas',
                title: 'Meclis Üyesi',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=51',
                phone: '0312 555 0111',
                email: 'i.thomas@guneyyurt.bel.tr'
            },
            {
                id: '12',
                name: 'Daniel Jackson',
                title: 'Meclis Üyesi',
                party: 'CHP',
                imageUrl: 'https://i.pravatar.cc/400?img=18',
                phone: '0312 555 0112',
                email: 'd.jackson@guneyyurt.bel.tr'
            },
            {
                id: '13',
                name: 'Mia White',
                title: 'Meclis Üyesi',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=52',
                phone: '0312 555 0113',
                email: 'm.white@guneyyurt.bel.tr'
            },
            {
                id: '14',
                name: 'Christopher Harris',
                title: 'Meclis Üyesi',
                party: 'AK Parti',
                imageUrl: 'https://i.pravatar.cc/400?img=19',
                phone: '0312 555 0114',
                email: 'c.harris@guneyyurt.bel.tr'
            },
            {
                id: '15',
                name: 'Ava Martin',
                title: 'Meclis Üyesi',
                party: 'CHP',
                imageUrl: 'https://i.pravatar.cc/400?img=53',
                phone: '0312 555 0115',
                email: 'a.martin@guneyyurt.bel.tr'
            }
        ];
        saveToStorage(STORAGE_KEYS.COUNCIL, defaultCouncil);
    }

    // Committee Members (Encümen Üyeleri)
    if (!localStorage.getItem(STORAGE_KEYS.COMMITTEE)) {
        const defaultCommittee = [
            {
                id: '1',
                name: 'Ahmet ARI',
                title: 'Belediye Başkanı (Başkan)',
                department: 'Başkanlık',
                imageUrl: 'https://i.pravatar.cc/400?img=33',
                phone: '0312 555 0201',
                email: 'baskan@guneyyurt.bel.tr'
            },
            {
                id: '2',
                name: 'John Smith',
                title: 'Meclis Başkanı (Üye)',
                department: 'Meclis',
                imageUrl: 'https://i.pravatar.cc/400?img=12',
                phone: '0312 555 0101',
                email: 'j.smith@guneyyurt.bel.tr'
            },
            {
                id: '3',
                name: 'Michael Johnson',
                title: 'Meclis Üyesi',
                department: 'Meclis',
                imageUrl: 'https://i.pravatar.cc/400?img=13',
                phone: '0312 555 0102',
                email: 'm.johnson@guneyyurt.bel.tr'
            },
            {
                id: '4',
                name: 'David Brown',
                title: 'Meclis Üyesi',
                department: 'Meclis',
                imageUrl: 'https://i.pravatar.cc/400?img=14',
                phone: '0312 555 0104',
                email: 'd.brown@guneyyurt.bel.tr'
            },
            {
                id: '5',
                name: 'James Miller',
                title: 'Meclis Üyesi',
                department: 'Meclis',
                imageUrl: 'https://i.pravatar.cc/400?img=15',
                phone: '0312 555 0106',
                email: 'j.miller@guneyyurt.bel.tr'
            }
        ];
        saveToStorage(STORAGE_KEYS.COMMITTEE, defaultCommittee);
    }
};

// Mock API sınıfı
class MockAPI {
    constructor() {
        initializeDefaultData();
    }

    // Generic CRUD operations
    async get(endpoint) {
        await delay();
        
        // News
        if (endpoint === '/api/news') {
            return { data: getFromStorage(STORAGE_KEYS.NEWS, []) };
        }
        
        // Projects
        if (endpoint.startsWith('/api/projects')) {
            const allProjects = getFromStorage(STORAGE_KEYS.PROJECTS, []);
            
            // Check for status filter in query params
            const url = new URL(endpoint, 'http://localhost');
            const statusFilter = url.searchParams.get('status');
            
            if (statusFilter) {
                const filtered = allProjects.filter(p => p.status === statusFilter);
                return { data: filtered };
            }
            
            return { data: allProjects };
        }
        
        // Feedback
        if (endpoint === '/api/feedback/all') {
            return { data: getFromStorage(STORAGE_KEYS.FEEDBACK, []) };
        }
        
        // Events
        if (endpoint === '/api/events') {
            return { data: getFromStorage(STORAGE_KEYS.EVENTS, []) };
        }
        
        // Tenders
        if (endpoint === '/api/tenders') {
            return { data: getFromStorage(STORAGE_KEYS.TENDERS, []) };
        }
        
        // Special Days
        if (endpoint === '/api/holidaygreetings') {
            return { data: getFromStorage(STORAGE_KEYS.SPECIAL_DAYS, []) };
        }
        
        // Settings
        if (endpoint === '/api/sitesettings/links') {
            const settings = getFromStorage(STORAGE_KEYS.SETTINGS, {});
            return { data: settings.links || [] };
        }
        if (endpoint === '/api/sitesettings/social') {
            const settings = getFromStorage(STORAGE_KEYS.SETTINGS, {});
            return { data: settings.social || [] };
        }
        if (endpoint === '/api/sitesettings/slides') {
            const settings = getFromStorage(STORAGE_KEYS.SETTINGS, {});
            return { data: settings.slides || [] };
        }
        if (endpoint === '/api/sitesettings/services') {
            const settings = getFromStorage(STORAGE_KEYS.SETTINGS, {});
            return { data: settings.services || [] };
        }
        if (endpoint === '/api/sitesettings/weather-prayer') {
            return { data: getFromStorage(STORAGE_KEYS.WEATHER_PRAYER, {}) };
        }
        
        // President
        if (endpoint === '/api/president') {
            return { data: getFromStorage(STORAGE_KEYS.PRESIDENT, {}) };
        }
        
        // Staff
        if (endpoint === '/api/governance/staff') {
            return { data: getFromStorage(STORAGE_KEYS.STAFF, []) };
        }
        
        // Services (Marriages, Deceased)
        if (endpoint === '/api/services/marriages') {
            return { data: getFromStorage(STORAGE_KEYS.MARRIAGES, []) };
        }
        if (endpoint === '/api/services/deceased') {
            return { data: getFromStorage(STORAGE_KEYS.DECEASED, []) };
        }
        
        // Businesses
        if (endpoint === '/api/business') {
            return { data: getFromStorage(STORAGE_KEYS.BUSINESSES, []) };
        }
        
        // Reports
        if (endpoint === '/api/governance/reports') {
            return { data: getFromStorage(STORAGE_KEYS.REPORTS, []) };
        }
        
        // Strategic Plan
        if (endpoint === '/api/strategicplan') {
            return { data: getFromStorage(STORAGE_KEYS.STRATEGIC_PLAN, []) };
        }
        
        // Council Members
        if (endpoint === '/api/Council' || endpoint === '/api/council') {
            return { data: getFromStorage(STORAGE_KEYS.COUNCIL, []) };
        }
        
        // Committee Members
        if (endpoint === '/api/Committee' || endpoint === '/api/committee') {
            return { data: getFromStorage(STORAGE_KEYS.COMMITTEE, []) };
        }
        
        return { data: [] };
    }

    async post(endpoint, data) {
        await delay();
        
        const newItem = { ...data, id: generateId() };
        
        // News
        if (endpoint === '/api/news') {
            const items = getFromStorage(STORAGE_KEYS.NEWS, []);
            items.unshift(newItem);
            saveToStorage(STORAGE_KEYS.NEWS, items);
            return { data: newItem };
        }
        
        // Projects
        if (endpoint === '/api/projects') {
            const items = getFromStorage(STORAGE_KEYS.PROJECTS, []);
            items.unshift(newItem);
            saveToStorage(STORAGE_KEYS.PROJECTS, items);
            return { data: newItem };
        }
        
        // Events
        if (endpoint === '/api/events') {
            const items = getFromStorage(STORAGE_KEYS.EVENTS, []);
            items.unshift(newItem);
            saveToStorage(STORAGE_KEYS.EVENTS, items);
            return { data: newItem };
        }
        
        // Tenders
        if (endpoint === '/api/tenders') {
            const items = getFromStorage(STORAGE_KEYS.TENDERS, []);
            items.unshift(newItem);
            saveToStorage(STORAGE_KEYS.TENDERS, items);
            return { data: newItem };
        }
        
        // Special Days
        if (endpoint === '/api/holidaygreetings') {
            const items = getFromStorage(STORAGE_KEYS.SPECIAL_DAYS, []);
            items.unshift(newItem);
            saveToStorage(STORAGE_KEYS.SPECIAL_DAYS, items);
            return { data: newItem };
        }
        
        // Settings
        if (endpoint.startsWith('/api/sitesettings/')) {
            const type = endpoint.split('/').pop();
            const settings = getFromStorage(STORAGE_KEYS.SETTINGS, {});
            if (!settings[type]) settings[type] = [];
            settings[type].unshift(newItem);
            saveToStorage(STORAGE_KEYS.SETTINGS, settings);
            return { data: newItem };
        }
        
        // President
        if (endpoint === '/api/president') {
            saveToStorage(STORAGE_KEYS.PRESIDENT, data);
            return { data };
        }
        
        // Services
        if (endpoint === '/api/services/marriages') {
            const items = getFromStorage(STORAGE_KEYS.MARRIAGES, []);
            items.unshift(newItem);
            saveToStorage(STORAGE_KEYS.MARRIAGES, items);
            return { data: newItem };
        }
        if (endpoint === '/api/services/deceased') {
            const items = getFromStorage(STORAGE_KEYS.DECEASED, []);
            items.unshift(newItem);
            saveToStorage(STORAGE_KEYS.DECEASED, items);
            return { data: newItem };
        }
        
        // Businesses
        if (endpoint === '/api/business') {
            const items = getFromStorage(STORAGE_KEYS.BUSINESSES, []);
            items.unshift(newItem);
            saveToStorage(STORAGE_KEYS.BUSINESSES, items);
            return { data: newItem };
        }
        
        return { data: newItem };
    }

    async put(endpoint, data) {
        await delay();
        
        // News
        if (endpoint.startsWith('/api/news/')) {
            const id = endpoint.split('/').pop();
            const items = getFromStorage(STORAGE_KEYS.NEWS, []);
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items[index] = { ...items[index], ...data };
                saveToStorage(STORAGE_KEYS.NEWS, items);
            }
            return { data: items[index] };
        }
        
        // Feedback status update
        if (endpoint.startsWith('/api/feedback/update-status/')) {
            const id = endpoint.split('/').pop();
            const items = getFromStorage(STORAGE_KEYS.FEEDBACK, []);
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items[index].status = data.replace(/"/g, ''); // Remove quotes
                saveToStorage(STORAGE_KEYS.FEEDBACK, items);
            }
            return { data: items[index] };
        }
        
        // Special Days
        if (endpoint.startsWith('/api/holidaygreetings/')) {
            const id = endpoint.split('/').pop();
            const items = getFromStorage(STORAGE_KEYS.SPECIAL_DAYS, []);
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items[index] = { ...items[index], ...data };
                saveToStorage(STORAGE_KEYS.SPECIAL_DAYS, items);
            }
            return { data: items[index] };
        }
        
        return { data };
    }

    async delete(endpoint) {
        await delay();
        
        const id = endpoint.split('/').pop();
        
        // News
        if (endpoint.startsWith('/api/news/')) {
            const items = getFromStorage(STORAGE_KEYS.NEWS, []);
            const filtered = items.filter(item => item.id !== id);
            saveToStorage(STORAGE_KEYS.NEWS, filtered);
            return { data: { success: true } };
        }
        
        // Projects
        if (endpoint.startsWith('/api/projects/')) {
            const items = getFromStorage(STORAGE_KEYS.PROJECTS, []);
            const filtered = items.filter(item => item.id !== id);
            saveToStorage(STORAGE_KEYS.PROJECTS, filtered);
            return { data: { success: true } };
        }
        
        // Events
        if (endpoint.startsWith('/api/events/')) {
            const items = getFromStorage(STORAGE_KEYS.EVENTS, []);
            const filtered = items.filter(item => item.id !== id);
            saveToStorage(STORAGE_KEYS.EVENTS, filtered);
            return { data: { success: true } };
        }
        
        // Tenders
        if (endpoint.startsWith('/api/tenders/')) {
            const items = getFromStorage(STORAGE_KEYS.TENDERS, []);
            const filtered = items.filter(item => item.id !== id);
            saveToStorage(STORAGE_KEYS.TENDERS, filtered);
            return { data: { success: true } };
        }
        
        // Special Days
        if (endpoint.startsWith('/api/holidaygreetings/')) {
            const items = getFromStorage(STORAGE_KEYS.SPECIAL_DAYS, []);
            const filtered = items.filter(item => item.id !== id);
            saveToStorage(STORAGE_KEYS.SPECIAL_DAYS, filtered);
            return { data: { success: true } };
        }
        
        // Settings
        if (endpoint.startsWith('/api/sitesettings/')) {
            const parts = endpoint.split('/');
            const type = parts[parts.length - 2];
            const settings = getFromStorage(STORAGE_KEYS.SETTINGS, {});
            if (settings[type]) {
                settings[type] = settings[type].filter(item => item.id !== id);
                saveToStorage(STORAGE_KEYS.SETTINGS, settings);
            }
            return { data: { success: true } };
        }
        
        // Businesses
        if (endpoint.startsWith('/api/business/')) {
            const items = getFromStorage(STORAGE_KEYS.BUSINESSES, []);
            const filtered = items.filter(item => item.id !== id);
            saveToStorage(STORAGE_KEYS.BUSINESSES, filtered);
            return { data: { success: true } };
        }
        
        return { data: { success: true } };
    }
}

// Singleton instance
const mockAPI = new MockAPI();

export default mockAPI;
