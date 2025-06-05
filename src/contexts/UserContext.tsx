
import React, { createContext, useState, useEffect, ReactNode } from 'react'; 
import { User, users as initialUsersData } from '../utils/data'; 
import { v4 as uuidv4 } from 'uuid'; 

const LOCAL_STORAGE_KEY_USERS = 'nexusflow_users';

export interface UserContextType {
  users: User[];
  addUser: (newUserData: Omit<User, 'id' | 'avatarUrl' | 'status'>) => void;
  getUserById: (id: string) => User | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(undefined); 

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem(LOCAL_STORAGE_KEY_USERS);
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(initialUsersData));
    return initialUsersData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);


  const addUser = (newUserData: Omit<User, 'id' | 'avatarUrl' | 'status'>) => {
    const newUser: User = {
      ...newUserData,
      id: uuidv4(), 
      status: 'active', 
      
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${newUserData.name.split(' ').map(n => n[0]).join('')}&backgroundColor=4F46E5&fontColor=FFFFFF`
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

 
  const getUserById = (id: string) => users.find(user => user.id === id);

  return (
    <UserContext.Provider value={{ users, addUser, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};
