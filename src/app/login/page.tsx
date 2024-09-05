'use client';

import { LoginView } from '@auth/views/LoginView';
import AuthProtect from '@auth/guards/AuthProtect';

export default function Login() {
  return (
    <AuthProtect needAuth={false}>
      <main>
        <LoginView />
      </main>
    </AuthProtect>
  );
}
