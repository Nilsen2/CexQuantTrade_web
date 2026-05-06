
import {routing} from '@/i18n/routing';
import messages from '../messages/en.json';
import NextAuth from "next-auth"

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}

declare module "next-auth" {
  interface User {
    token?: string
  }

  interface Session {
    token?: string
    user?: {
      id?: string
      name?: string
      email?: string
      token?: string
      [key: string]: any
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string
    user?: {
      id?: string
      name?: string
      email?: string
      token?: string
      [key: string]: any
    }
  }
}

