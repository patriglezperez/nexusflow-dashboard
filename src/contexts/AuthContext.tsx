import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { User, users as initialUsersData } from '../utils/data'; 
import { getDashboardStats } from '../utils/data'; 


export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean; 
  error: string | null; 
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false); 
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    setIsLoading(true);
    setError(null);


    const foundUser = initialUsersData.find(u => u.email === email);

    if (foundUser && password === 'MAD_25_pat') { 
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    } else {
      setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser'); 
  }, []);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};