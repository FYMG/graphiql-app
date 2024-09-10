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
import { useToast } from '@shared/shadcn/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { createSession, removeSession } from '../../actions/auth-actions';

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
  const t = useTranslations('auth');
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        await createSession(_user.uid);
      } else {
        await removeSession();
      }

      setUser(_user);
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    toast({
      title: t('logout-success'),
      variant: 'default',
      duration: 3000,
    });
  }, [t, toast]);

  const value = useMemo(() => {
    return { user, logout, isAuth: !!user };
  }, [user, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
