import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdminMode: boolean;
  showLoginForm: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  toggleAdminMode: () => void;
  showLogin: () => void;
  hideLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem('isAdminMode') === 'true' && isAuthenticated;
  });

  const [showLoginForm, setShowLoginForm] = useState(false);

  // Автосохранение состояния аутентификации
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('isAdminMode', isAdminMode.toString());
  }, [isAdminMode]);

  // Глобальный слушатель для комбинации клавиш Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        if (isAuthenticated) {
          setIsAdminMode(true);
        } else {
          setShowLoginForm(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  const login = (username: string, password: string) => {
    // Простая проверка (в реальном приложении это должно быть на сервере)
    if (username === 'victormurahin' && password === 'test') {
      setIsAuthenticated(true);
      setIsAdminMode(true);
      setShowLoginForm(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
    setShowLoginForm(false);
  };

  const toggleAdminMode = () => {
    if (isAuthenticated) {
      setIsAdminMode(!isAdminMode);
    }
  };

  const showLogin = () => {
    setShowLoginForm(true);
  };

  const hideLogin = () => {
    setShowLoginForm(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdminMode,
      showLoginForm,
      login,
      logout,
      toggleAdminMode,
      showLogin,
      hideLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}