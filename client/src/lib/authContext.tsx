import { createContext, useContext, useState, ReactNode } from 'react';

// TODO: Remove mock functionality - this is for prototype only
interface User {
  id: string;
  username: string;
  role: 'citizen' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    // Mock authentication
    if (username === 'user@demo' && password === 'password') {
      setUser({ id: 'user1', username: 'user@demo', role: 'citizen' });
      return true;
    } else if (username === 'admin@demo' && password === 'admin123') {
      setUser({ id: 'admin1', username: 'admin@demo', role: 'admin' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
