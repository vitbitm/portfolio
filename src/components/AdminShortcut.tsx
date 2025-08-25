import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Settings, X } from 'lucide-react';
import { useAuth } from './AuthContext';

export function AdminShortcut() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated, showLogin } = useAuth();

  useEffect(() => {
    // Показываем подсказку через 3 секунды после загрузки страницы
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  // Скрываем подсказку через 10 секунд
  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  // Не показываем, если пользователь авторизован
  if (isAuthenticated) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-1">Админ-панель</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Попробуйте нажать <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+Shift+A</kbd> для быстрого доступа
                  </p>
                  <Button 
                    size="sm" 
                    onClick={showLogin}
                    className="w-full"
                  >
                    Войти в админку
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}