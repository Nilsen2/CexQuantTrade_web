export const metadata = {
  alternates: {
    languages: {
      'zh-Hans': 'https://AMCC.com/zh/',
      'en-US': 'https://AMCC.com/',
      'vi-VN': 'https://AMCC.com/vi/',
      'pt-BR': 'https://AMCC.com/pt/',
      'es-ES': 'https://AMCC.com/es/',
      'tr-TR': 'https://AMCC.com/tr/',
      'ja-JP': 'https://AMCC.com/ja/',
      'ko-KR': 'https://AMCC.com/ko/',
      'th-TH': 'https://AMCC.com/th/',
      'x-default': 'https://AMCC.com/',
    },
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}