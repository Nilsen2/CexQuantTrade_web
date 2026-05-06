import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale, getMessages } from 'next-intl/server';
import { clsx } from 'clsx';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from "next-auth/react";
import { AuthSyncProvider } from "@/app/providers/AuthSyncProvider";
import ClientBody from './ClientBody';
import { auth } from "@/auth";
import { Toaster } from "sonner";
import GTM from '@/components/GTM';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  // In case of async components
  const t = await getTranslations('Metadata');
  return {
    title: t('title'),
    description: t('description'),
    metadataBase: 'https://AMCC.com',
    icons: {
      icon: '/logo.png',
    },
    openGraph: {
      type: 'website',
      siteName: 'AMCC',
      url: 'https://AMCC.com',
      title: t('stitle'),
      description:
        t('sdescription'),
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'AMCC AI Quant Trading'
        }
      ]
    },

    twitter: {
      card: 'summary_large_image',
      title: t('stitle'),
      description:
        t('sdescription'),
      images: ['/og.png']
    },

  };
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();
  const session = await auth()
  setRequestLocale(locale);
  return (
    <html lang={locale} className="antialiased">
      <head>
        <GTM />
      </head>
      <body className={clsx(inter.className, 'antialiased')} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionProvider>
          <AuthSyncProvider />
          <ClientBody>
            <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
              <Navbar session={session} />
              {children}
              <Footer />
            </div>
            <Toaster position="top-right" richColors />
          </ClientBody>
          </SessionProvider>
        </NextIntlClientProvider>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTK2KPL2"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <noscript><img height="1" width="1" style={{ display: 'none', visibility: 'hidden' }}
        src="https://www.facebook.com/tr?id=1868627303759251&ev=PageView&noscript=1"
        /></noscript>
      </body>
    </html>
  );
}