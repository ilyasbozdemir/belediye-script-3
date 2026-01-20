import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import NewsList from './pages/NewsList';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import NewsManager from './pages/admin/NewsManager';
import BusinessDirectory from './pages/BusinessDirectory';
import BusinessManager from './pages/admin/BusinessManager';
import BusinessCenterManager from './pages/admin/BusinessCenterManager';
import GovernanceManager from './pages/admin/GovernanceManager';
import ProjectManager from './pages/admin/ProjectManager';
import ProjectList from './pages/ProjectList';
import PresidentBio from './pages/PresidentBio';
import CouncilMembers from './pages/CouncilMembers';
import Marriages from './pages/Marriages';
import DeceasedList from './pages/DeceasedList';
import Muhtarliklar from './pages/Muhtarliklar';
import Units from './pages/Units';
import PresidentMessage from './pages/PresidentMessage';
import FormerPresidents from './pages/FormerPresidents';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Tenders from './pages/Tenders';
import ServiceStandards from './pages/ServiceStandards';
import Press from './pages/Press';
import Articles from './pages/Articles';
import Zoning from './pages/Zoning';
import Pharmacies from './pages/Pharmacies';
import Announcements from './pages/Announcements';
import DiscoverCity from './pages/DiscoverCity';
import Legislation from './pages/Legislation';
import SocialFacilities from './pages/SocialFacilities';
import CommitteeMembers from './pages/CommitteeMembers';
import AnnouncementDetail from './pages/AnnouncementDetail';
import ProjectDetail from './pages/ProjectDetail';
import NewsDetail from './pages/NewsDetail';
import AdminRssImport from './pages/admin/AdminRssImport';
import RssHub from './pages/RssHub';
import ActivityReports from './pages/ActivityReports';
import CommitteeDecisions from './pages/CommitteeDecisions';
import ServicesGuide from './pages/ServicesGuide';
import RequestForm from './pages/RequestForm';
import ScrollToTop from './components/ScrollToTop';
import StrategicPlan from './pages/StrategicPlan';
import TownHistory from './pages/TownHistory';
import Events from './pages/Events';
import RequestManager from './pages/admin/RequestManager';
import LifeEventManager from './pages/admin/LifeEventManager';
import ReportsManager from './pages/admin/ReportsManager';
import SettingsManager from './pages/admin/SettingsManager';
import EventManager from './pages/admin/EventManager';
import SpecialDaysManager from './pages/admin/SpecialDaysManager';
import TendersManager from './pages/admin/TendersManager';
import BusinessCenter from './pages/BusinessCenter';
import MunicipalBusinesses from './pages/MunicipalBusinesses';
import WeatherPrayer from './pages/WeatherPrayer';

import {
  UsersIcon,
  DocumentChartBarIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
  PhotoIcon,
  ShieldCheckIcon,
  NewspaperIcon,
  FolderIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import ResourceManager from './pages/admin/ResourceManager';
import WeatherPrayerManager from './pages/admin/WeatherPrayerManager';

function App() {
  console.log('App Rendering...');
  return (
    <Routes>
      <Route path="/" element={<><ScrollToTop /><RootLayout /></>}>
        <Route index element={<Home />} />
        <Route path="haberler" element={<NewsList />} />
        <Route path="haber/:id" element={<NewsDetail />} />
        <Route path="kurumsal/baskan-ozgecmis" element={<PresidentBio />} />
        <Route path="kurumsal/eski-baskanlar" element={<FormerPresidents />} />
        <Route path="kurumsal/meclis" element={<CouncilMembers />} />
        <Route path="kurumsal/encumen" element={<CommitteeMembers />} />
        <Route path="kurumsal/baskan-mesaj" element={<PresidentMessage />} />
        <Route path="kurumsal/birimler" element={<Units />} />
        <Route path="kurumsal/muhtarliklar" element={<Muhtarliklar />} />
        <Route path="projeler/biten" element={<ProjectList statusFilter="Biten" />} />
        <Route path="projeler/devam-eden" element={<ProjectList statusFilter="Devam Eden" />} />
        <Route path="projeler/planlanan" element={<ProjectList statusFilter="Planlanan" />} />
        <Route path="proje/:id" element={<ProjectDetail />} />
        <Route path="hizmetler/evlendirme" element={<Marriages />} />
        <Route path="hizmetler/vefatlar" element={<DeceasedList />} />
        <Route path="hizmetler/imar" element={<Zoning />} />
        <Route path="hizmetler/eczaneler" element={<Pharmacies />} />
        <Route path="duyurular" element={<Announcements />} />
        <Route path="duyuru/:id" element={<AnnouncementDetail />} />
        <Route path="kurumsal/hizmet-standartlari" element={<ServiceStandards />} />
        <Route path="kurumsal/ihale-duyurulari" element={<Tenders />} />
        <Route path="kurumsal/bilgilendirici-makaleler" element={<Articles />} />
        <Route path="kurumsal/basinda-biz" element={<Press />} />
        <Route path="kurumsal/mevzuat" element={<Legislation />} />
        <Route path="kesfet" element={<DiscoverCity />} />
        <Route path="kesfet/tesisler" element={<SocialFacilities />} />
        <Route path="galeri" element={<Gallery />} />
        <Route path="iletisim" element={<Contact />} />
        <Route path="servisler/rss" element={<RssHub />} />
        <Route path="kurumsal/faaliyet-raporlari" element={<Navigate to="/kurumsal/mevzuat?cat=Faaliyet Raporları" replace />} />
        <Route path="kurumsal/encumen-kararlari" element={<CommitteeDecisions />} />
        <Route path="hizmetler/rehber" element={<ServicesGuide />} />
        <Route path="hizmetler/basvuru" element={<RequestForm />} />
        <Route path="kent-rehberi/isletmeler" element={<BusinessDirectory />} />
        <Route path="kurumsal/stratejik-plan" element={<Navigate to="/kurumsal/mevzuat?cat=Stratejik Planlar" replace />} />
        <Route path="kurumsal/is-hani" element={<BusinessCenter />} />
        <Route path="kurumsal/tarihce" element={<TownHistory />} />
        <Route path="kurumsal/isletmeler" element={<MunicipalBusinesses />} />
        <Route path="etkinlikler" element={<Events />} />
        <Route path="hava-durumu" element={<WeatherPrayer />} />
        <Route path="*" element={<div className="p-20 text-center font-bold text-gray-400">Bu sayfa yapım aşamasındadır.</div>} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="news" element={<NewsManager />} />
        <Route path="projects" element={<ProjectManager />} />
        <Route path="businesses" element={<BusinessManager />} />
        <Route path="president" element={<GovernanceManager />} />
        <Route path="staff" element={<ResourceManager />} />
        <Route path="rss-import" element={<AdminRssImport />} />
        <Route path="requests" element={<RequestManager />} />
        <Route path="life-events" element={<LifeEventManager />} />
        <Route path="settings" element={<SettingsManager />} />
        <Route path="is-hani" element={<BusinessCenterManager />} />
        <Route path="events" element={<EventManager />} />
        <Route path="special-days" element={<SpecialDaysManager />} />
        <Route path="reports" element={<ReportsManager />} />
        <Route path="tenders" element={<TendersManager />} />
        <Route path="weather-prayer" element={<WeatherPrayerManager />} />
        <Route path="*" element={<div className="p-8 text-slate-400">Bu modül yakında eklenecek.</div>} />
      </Route>
    </Routes>
  );
}

export default App;
