import { getTranslations, getLocale } from 'next-intl/server';
import { redirect } from "@/i18n/navigation";

export default async function MarketInsightsPage() {
  const t = await getTranslations();
   const locale = await getLocale();
  let info;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forecast/btc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
    redirect({href: '/error', locale});
    }
    info = await res.json();
  } catch (e) {
    redirect({href: '/error', locale});
  }
  const date = new Date(); 
  date.setDate(date.getDate());
  const formattedDate = date.toISOString().slice(0, 10);
  const upsideColor = info.data.upsideProb.replace('%','') >= 50 
    ? "from-green-400 to-green-200" 
    : "from-red-400 to-red-600";

  const volatilityColor = "from-purple-500 to-pink-400";

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="mx-auto container">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
          {t('forecast.f1')}
        </h1>
        <p className="text-zinc-300 text-sm md:text-base">
        {t('forecast.f2')} (UTC): {formattedDate} | {t('forecast.f3')} Binance | {t('forecast.f4')} 1-Hour
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upside Probability */}
        <div className={`bg-gradient-to-tr ${upsideColor} text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform duration-300`}>
          <h2 className="text-lg md:text-xl font-semibold mb-2">{t('forecast.f5')}</h2>
          <p className="text-4xl md:text-6xl font-extrabold mb-2">{info.data.upsideProb}</p>
          <p className="text-sm md:text-base text-white/90">
          {t('forecast.f6')}
          </p>
        </div>

        {/* Volatility Amplification */}
        <div className={`bg-gradient-to-tr ${volatilityColor} text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform duration-300`}>
          <h2 className="text-lg md:text-xl font-semibold mb-2">{t('forecast.f7')}</h2>
          <p className="text-4xl md:text-6xl font-extrabold mb-2">{info.data.volAmpProb}</p>
          <p className="text-sm md:text-base text-white/90">
          {t('forecast.f8')}
          </p>
        </div>
      </div>

      {/* Footer / Notes */}
      <footer className="mt-12 text-center text-gray-500 text-sm md:text-base">
      {t('forecast.f9')}
      </footer>
    </div>
    </div>
  );
}
