// src/hooks/useUsers.ts

import { useContext } from 'react';
import { UserContext, UserContextType } from '../contexts/UserContext'; // Asumiendo que tienes un UserContext

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};