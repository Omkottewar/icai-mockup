import { useEffect } from 'react';
import { useRoute } from '../hooks/useRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import EventsPage from '../pages/EventsPage';
import MembersPage from '../pages/MembersPage';
import StudentsPage from '../pages/StudentsPage';
import ResourcesPage from '../pages/ResourcesPage';
import ContactPage from '../pages/ContactPage';
import PrayGyaanPage from '../pages/PrayGyaanPage';
import BenevolentFundPage from '../pages/BenevolentFundPage';
import CA2VisionPage from '../pages/CA2VisionPage';
import InvestorAwarenessPage from '../pages/InvestorAwarenessPage';
import CareerCounsellingPage from '../pages/CareerCounsellingPage';
import SearchPage from '../pages/SearchPage';
import DashboardPage from '../pages/DashboardPage';
import NotFound from '../pages/NotFound';

import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgotPage from '../pages/auth/ForgotPage';
import PhotoGalleryPage from '../pages/PhotoGalleryPage';
import JobVacanciesPage from '../pages/JobVacanciesPage';
import MembersDirectoryPage from '../pages/MembersDirectoryPage';
import RoomBookingPage from '../pages/RoomBookingPage';
import PrayGyaanWidget from '../components/ui/PrayGyaanWidget';

const ROUTES = {
  '/': HomePage,
  '/about': AboutPage,
  '/events': EventsPage,
  '/members': MembersPage,
  '/students': StudentsPage,
  '/resources': ResourcesPage,
  '/contact': ContactPage,
  '/praygyaan': PrayGyaanPage,
  '/benevolent-fund': BenevolentFundPage,
  '/ca2-vision': CA2VisionPage,
  '/investor-awareness': InvestorAwarenessPage,
  '/career-counselling': CareerCounsellingPage,
  '/search': SearchPage,
  '/dashboard': DashboardPage,
  '/login': LoginPage,
  '/signup': SignupPage,
  '/forgot': ForgotPage,
  '/gallery': PhotoGalleryPage,
  '/job-vacancies': JobVacanciesPage,
  '/members-directory': MembersDirectoryPage,
  '/book-room': RoomBookingPage,
};

const FULL_BLEED_ROUTES = new Set(['/login', '/signup', '/forgot']);

function ScrollToTop() {
  const route = useRoute();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.path]);
  return null;
}

export default function AppShell() {
  const route = useRoute();
  const Page = ROUTES[route.path] ?? NotFound;
  const fullBleed = FULL_BLEED_ROUTES.has(route.path);

  if (fullBleed) {
    return (
      <>
        <ScrollToTop />
        <Page />
      </>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1 }}>
        <Page />
      </main>
      <Footer />
      <PrayGyaanWidget />
    </div>
  );
}
