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
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '@shared/configs/firebase';

import { useToast } from '@shared/shadcn/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { routes } from '@shared/configs';

function RegistrationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('auth');
  const FormSchema = z
    .object({
      email: z
        .string({
          message: t('required'),
        })
        .email({
          message: t('invalid-email'),
        }),
      password: z
        .string({
          message: t('required'),
        })
        .min(6, {
          message: t('password-too-short'),
        }),
      repeatPassword: z.string({
        message: t('required'),
      }),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t('passwords-dont-match'),
      path: ['repeatPassword'],
    });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    let title: string | undefined;

    let errorMessage: string | undefined;

    try {
      title = t('register-success');
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push(routes.main);
      toast({
        title,
        variant: 'default',
        duration: 3000,
      });
    } catch (error) {
      title = t('register-failed');

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = t('email-already-in-use');
            break;
          case 'auth/weak-password':
            errorMessage = t('password-too-short');
            break;
          default:
            errorMessage = error.message;
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
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('repeat-password')}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">{t('register')}</Button>
          <Button onClick={() => router.push(routes.login)} type="button">
            {t('login')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default RegistrationForm;
