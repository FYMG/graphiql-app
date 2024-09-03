'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';

import { onAuthStateChanged, signOut, User } from '@firebase/auth';
import { auth } from '@shared/configs/firebase';

interface AuthContextValue {
  isAuth: boolean;
  logout: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuth: false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setUser(_user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  const value = useMemo(() => {
    return { user, logout, isAuth: !!user };
  }, [user, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
