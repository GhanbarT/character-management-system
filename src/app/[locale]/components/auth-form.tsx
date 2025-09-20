'use client';

import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({ message: 'auth.emailInvalid' }),
  password: z.string().min(6, { message: 'auth.passwordMin' }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  fullName: z.string().min(2, { message: 'auth.fullNameMin' }),
  regEmail: z.email({ message: 'auth.emailInvalid' }),
  regPassword: z.string().min(6, { message: 'auth.passwordMin' }),
});
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  onLoginSuccess: () => void;
}

export function AuthForm({ onLoginSuccess }: AuthFormProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  });

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    if (tab === 'login') {
      resetLogin();
    } else {
      resetRegister();
    }
  };

  const onLogin = (data: LoginFormValues) => {
    console.log('Logging in with:', data);
    onLoginSuccess();
  };
  const onRegister = (data: RegisterFormValues) => {
    console.log('Registering with:', data);
    onLoginSuccess();
  };

  return (
    <div className="mx-auto max-w-md">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-playfair text-2xl">{t('navigation.welcome')}</CardTitle>
          <CardDescription>{t('auth.loginDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="cursor-pointer">
                {t('navigation.login')}
              </TabsTrigger>
              <TabsTrigger value="register" className="cursor-pointer">
                {t('navigation.register')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 pt-6">
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    {...loginRegister('email')}
                  />
                  <p className="min-h-[20px] text-xs text-red-500">
                    {loginErrors.email ? t(loginErrors.email.message as string) : '\u00A0'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Input id="password" type="password" {...loginRegister('password')} />
                  <p className="min-h-[20px] text-xs text-red-500">
                    {loginErrors.password ? t(loginErrors.password.message as string) : '\u00A0'}
                  </p>
                </div>
                <RippleButton className="w-full" type="submit">
                  {t('navigation.login')}
                </RippleButton>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 pt-6">
              <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('auth.fullName')}</Label>
                  <Input
                    id="name"
                    placeholder={t('auth.fullNamePlaceholder')}
                    {...registerRegister('fullName')}
                  />
                  <p className="min-h-[20px] text-xs text-red-500">
                    {registerErrors.fullName
                      ? t(registerErrors.fullName.message as string)
                      : '\u00A0'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">{t('auth.email')}</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    {...registerRegister('regEmail')}
                  />
                  <p className="min-h-[20px] text-xs text-red-500">
                    {registerErrors.regEmail
                      ? t(registerErrors.regEmail.message as string)
                      : '\u00A0'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">{t('auth.password')}</Label>
                  <Input id="reg-password" type="password" {...registerRegister('regPassword')} />
                  <p className="min-h-[20px] text-xs text-red-500">
                    {registerErrors.regPassword
                      ? t(registerErrors.regPassword.message as string)
                      : '\u00A0'}
                  </p>
                </div>
                <RippleButton className="w-full" type="submit">
                  {t('navigation.register')}
                </RippleButton>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
