'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { routing } from '@/i18n/routing';
import { apiClient } from "@/lib/fetchApi"
import { Button } from './ui/button';

const localeLabels: Record<string, string> = {
  'en': 'English',
  'es': 'Español',
  'pt': 'Português',
  'tr': 'Türkçe',
  'ja': '日本語',
  'ko': '한국어',
  'vi': 'Tiếng việt',
  'th': 'ไทย',
  'zh': '简体中文',
};

export default function LocaleSwitcherSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  apiClient.setLanguage(locale)

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    apiClient.setLanguage(nextLocale)
    const defaultLocale = routing.defaultLocale;
    const prefix =
      nextLocale === defaultLocale && routing.localePrefix === 'as-needed'
        ? ''
        : `/${nextLocale}`;

    // 移除当前路径中的语言前缀
    const segments = pathname.split('/');
    if (routing.locales.includes(segments[1] as any)) {
      segments.splice(1, 1);
    }
    const newPath = prefix + segments.join('/');

    router.replace(newPath || '/');
  };

  return (
    <div className="ml-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-2 rounded-full hover:bg-zinc-800 bg-zinc-800 transition cursor-pointer">
          <Globe className="w-5 h-5 text-white" />
          {/* {localeLabels[locale]} */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 text-white border border-zinc-700">
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleChange(loc)}
            className={`capitalize hover:bg-zinc-800 cursor-pointer ${
              locale === loc ? 'font-semibold' : ''
            }`}
          >
            {localeLabels[loc] || loc}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}
