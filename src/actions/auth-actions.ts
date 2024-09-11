'use server';

import { cookies } from 'next/headers';
import { app } from '@shared/configs';

export async function createSession(uid: string) {
  cookies().set(app.SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One day
    path: '/',
  });
}

export async function removeSession() {
  cookies().delete(app.SESSION_COOKIE_NAME);
}
