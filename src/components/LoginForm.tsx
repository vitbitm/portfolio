import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Settings, Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from './AuthContext';

export function LoginForm() {
  const { login, hideLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    
    if (!success) {
      setError('Неверный логин или пароль');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative"
      >
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={hideLogin}
              className="absolute right-2 top-2 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Вход в админ-панель</CardTitle>
            <p className="text-sm text-muted-foreground">
              Введите данные для доступа к управлению сайтом
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите логин"
                  className="bg-input-background border-border/50"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="bg-input-background border-border/50 pr-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3"
                >
                  {error}
                </motion.div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading || !username.trim() || !password.trim()}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Для тестирования:</strong></p>
                <p>Логин: victormurahin</p>
                <p>Пароль: test</p>
                <p className="pt-2">Или нажмите <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+Shift+A</kbd></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}