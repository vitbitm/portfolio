import { AuthProvider, useAuth } from "./components/AuthContext";
import { ContentProvider } from "./components/ContentContext";
import { LoginForm } from "./components/LoginForm";
import { AdminPanel } from "./components/AdminPanel";
import { AdminShortcut } from "./components/AdminShortcut";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { StatsSection } from "./components/StatsSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { SkillsSection } from "./components/SkillsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <PortfolioSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
      <AdminShortcut />
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, isAdminMode, showLoginForm } = useAuth();

  // Показать форму входа
  if (showLoginForm) {
    return <LoginForm />;
  }

  // Показать админ-панель (только для авторизованных)
  if (isAuthenticated && isAdminMode) {
    return <AdminPanel />;
  }

  // Показать сайт (всегда доступен)
  return <Portfolio />;
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </AuthProvider>
  );
}