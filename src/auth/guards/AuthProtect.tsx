'use client';

import { useAuth } from '@auth/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { routes } from '@shared/configs';

function AuthProtect({
  children,
  needAuth = true,
}: {
  children: ReactNode;
  needAuth?: boolean;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && needAuth) {
      router.push(routes.login);
    }

    if (user && !needAuth) {
      router.push(routes.main);
    }
  }, [user, router, needAuth]);

  return children;
}

export default AuthProtect;
