'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/shadcn/ui/form';
import { Button } from '@shared/shadcn/ui/button';
import { Input } from '@shared/shadcn/ui/input';
import { useTranslations } from 'next-intl';
import { FirebaseError } from '@firebase/app';
import { auth } from '@shared/configs/firebase';

import { useToast } from '@shared/shadcn/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { routes } from '@shared/configs';
import { signInWithEmailAndPassword } from '@firebase/auth';

function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('auth');
  const FormSchema = z.object({
    email: z
      .string({
        message: t('required'),
      })
      .email({
        message: t('invalid-email'),
      }),
    password: z.string({
      message: t('required'),
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    let title: string | undefined;
    let errorMessage: string | undefined;

    try {
      title = t('login-success');
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push(routes.main);
      toast({
        title,
        variant: 'default',
        duration: 3000,
      });
    } catch (error) {
      title = t('login-failed');

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            errorMessage = t('invalid-credentials');
            break;
          case 'auth/too-many-requests':
            errorMessage = t('too-many-requests');
            break;
          case 'auth/missing-password':
            errorMessage = t('password-required');
            break;
          case 'auth/user-disabled':
            errorMessage = t('user-disabled');
            break;
          default:
            errorMessage = error.message;
            break;
        }
      } else {
        throw error;
      }
    }

    if (errorMessage) {
      toast({
        title,
        description: errorMessage,
        variant: 'destructive',
        duration: 3000,
        color: 'red',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <h1 className="text-2xl font-bold">{t('login-title')}</h1>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="mail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">{t('login')}</Button>
          <Button onClick={() => router.push(routes.register)} type="button">
            {t('register')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
