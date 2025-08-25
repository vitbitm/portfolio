import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from './AuthContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdminMode, showLogin, toggleAdminMode, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Главная', id: 'hero' },
    { name: 'О себе', id: 'about' },
    { name: 'Проекты', id: 'portfolio' },
    { name: 'Навыки', id: 'skills' },
    { name: 'Контакты', id: 'contact' },
  ];

  const handleAdminAction = () => {
    if (isAuthenticated) {
      if (isAdminMode) {
        toggleAdminMode(); // Выйти из админки
      } else {
        toggleAdminMode(); // Войти в админку
      }
    } else {
      showLogin(); // Показать форму входа
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">VM</span>
            </div>
            <span className="font-medium hidden sm:block">Виктор Мурахин</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </motion.nav>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <ThemeToggle />
            
            {/* Admin Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdminMode ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAdminAction}
                    className="gap-2 hidden sm:flex"
                  >
                    <User className="w-4 h-4" />
                    К сайту
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAdminAction}
                    className="gap-2 hidden sm:flex"
                  >
                    <Settings className="w-4 h-4" />
                    Админка
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="gap-2 hidden sm:flex"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdminAction}
                className="gap-2 hidden sm:flex"
              >
                <Settings className="w-4 h-4" />
                Админка
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-border"
          >
            <div className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-2 py-1 hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}
              
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAdminAction}
                      className="gap-2 justify-start"
                    >
                      {isAdminMode ? (
                        <>
                          <User className="w-4 h-4" />
                          К сайту
                        </>
                      ) : (
                        <>
                          <Settings className="w-4 h-4" />
                          Админка
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={logout}
                      className="gap-2 justify-start"
                    >
                      <LogOut className="w-4 h-4" />
                      Выйти
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAdminAction}
                    className="gap-2 justify-start"
                  >
                    <Settings className="w-4 h-4" />
                    Админка
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}