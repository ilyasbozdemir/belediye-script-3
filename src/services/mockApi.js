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
    WEATHER_PRAYER: 'mock_weather_prayer'
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
                title: 'Yeni Park Açılışı Gerçekleştirildi',
                content: 'Belediyemiz tarafından yapılan Millet Parkı törenle hizmete açıldı. Açılışa çok sayıda vatandaş katıldı.',
                imageUrl: 'https://picsum.photos/seed/news1/800/600',
                category: 'Etkinlik',
                createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '2',
                title: 'Asfalt Çalışmaları Devam Ediyor',
                content: 'İlçemizin çeşitli mahallelerinde yürütülen asfalt çalışmaları hızla devam ediyor.',
                imageUrl: 'https://picsum.photos/seed/news2/800/600',
                category: 'Hizmet',
                createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            },
            {
                id: '3',
                title: 'Gençlik Merkezi Yenilendi',
                content: 'Gençlerimizin sosyal ve kültürel aktiviteler yapabileceği Gençlik Merkezi tamamen yenilendi.',
                imageUrl: 'https://picsum.photos/seed/news3/800/600',
                category: 'Sosyal',
                createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                isActive: true
            }
        ];
        saveToStorage(STORAGE_KEYS.NEWS, defaultNews);
    }

    // Projects
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
        const defaultProjects = [
            {
                id: '1',
                title: 'Kent Meydanı Düzenleme Projesi',
                description: 'İlçe merkezindeki meydan tamamen yenilenecek. Modern peyzaj düzenlemesi yapılacak.',
                status: 'Devam Eden',
                budget: '2.500.000',
                startDate: '2024-01-15',
                endDate: '2024-12-31',
                imageUrl: 'https://picsum.photos/seed/proj1/800/600'
            },
            {
                id: '2',
                title: 'Spor Kompleksi İnşaatı',
                description: 'Kapalı spor salonu, yüzme havuzu ve açık spor alanlarından oluşan kompleks.',
                status: 'Planlanan',
                budget: '5.000.000',
                startDate: '2024-06-01',
                endDate: '2025-12-31',
                imageUrl: 'https://picsum.photos/seed/proj2/800/600'
            },
            {
                id: '3',
                title: 'Kanalizasyon Yenileme',
                description: 'Eski kanalizasyon hatları yenilendi ve altyapı güçlendirildi.',
                status: 'Biten',
                budget: '1.800.000',
                startDate: '2023-03-01',
                endDate: '2023-11-30',
                imageUrl: 'https://picsum.photos/seed/proj3/800/600'
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
                title: 'Bahar Şenliği',
                description: 'Geleneksel bahar şenliğimiz tüm vatandaşlarımızı bekliyor.',
                date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                location: 'Kent Meydanı',
                imageUrl: 'https://picsum.photos/seed/event1/800/600'
            },
            {
                id: '2',
                title: 'Kitap Fuarı',
                description: 'Yıllık kitap fuarımız 3 gün sürecek.',
                date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                location: 'Kültür Merkezi',
                imageUrl: 'https://picsum.photos/seed/event2/800/600'
            }
        ];
        saveToStorage(STORAGE_KEYS.EVENTS, defaultEvents);
    }

    // Tenders
    if (!localStorage.getItem(STORAGE_KEYS.TENDERS)) {
        const defaultTenders = [
            {
                id: '1',
                title: 'Belediye Hizmet Binası Tadilat İşi',
                description: 'Belediye ana hizmet binasının tadilat işi ihale edilecektir.',
                deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '850.000',
                status: 'Aktif'
            },
            {
                id: '2',
                title: 'Araç Kiralama Hizmeti',
                description: '2 adet iş makinesi 1 yıllığına kiralanacaktır.',
                deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: '450.000',
                status: 'Aktif'
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
            name: 'Mehmet BAŞKAN',
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
        if (endpoint === '/api/projects') {
            return { data: getFromStorage(STORAGE_KEYS.PROJECTS, []) };
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
