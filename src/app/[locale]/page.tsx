import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Command, Shield, Lock, Lightbulb } from "lucide-react";
import EarlyAccessBanner from "@/components/EarlyAccessBanner";
import HowToUse from "@/components/HowToUse";
import Pricing from "@/components/Pricing";
import { companyConfig } from "@/lib/company-config";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Home() {
  const t = useTranslations("Home");
  

  const features = [
    { class: 'bg-teal-50', title: t("feature.title1"), desc: t("feature.desc1") },
    { class: 'bg-blue-50', title: t("feature.title2"), desc: t("feature.desc2") },
    { class: 'bg-purple-50', title: t("feature.title3"), desc: t("feature.desc3") },
  ];

  return (
    <>
      <section className="container mx-auto px-4 py-15 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="bg-teal-50 text-teal-700 border-teal-200">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2" />
              {t("AI-OPTIMIZED MODELS")}
            </Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              {t("RISK-AWARE EXECUTION")}
            </Badge>
            <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
              {t("LIVE ANALYTICS DASHBOARD")}
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
           {t.rich('hero_title', {
              purple: (chunks) => <span className="text-purple-600">{chunks}</span>,
              teal: (chunks) => <span className="text-teal-500">{chunks}</span>,
            })}
          </h1>

          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            {t('hero_desc')}
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6 relative">
              <Link className="flex justify-center items-center" href="/user/dashboard" >
              <Sparkles className="w-10 h-10" />
              {t('Start Trading Now')}
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">{t('HOT')}</div>
              <div className="text-xs opacity-80 block"></div>
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-orange-500 text-orange-600 hover:bg-orange-50">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button> */}
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 flex-wrap pt-8">
            <div className="flex items-center gap-2 text-sm">
              <Command className="w-5 h-5 text-teal-600" />
              <span className="text-zinc-300">{t('Real-Time Execution')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-zinc-300">
                {t('AI-Verified & Secure')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-5 h-5 text-purple-600" />
              <span className="text-zinc-300">
                {t('SeamlessConfiguration')}
              </span>
            </div>
          </div>
        </div>
      </section>
      <EarlyAccessBanner />
      <section id="faq" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t.rich('Struggling', {
              purple: (chunks) => <span className="underline decoration-wavy decoration-orange-400">{chunks}</span>,
            })}
          </h2>
          <p className="text-xl text-zinc-300">
            {t.rich('ThatsWhy', {
              name: companyConfig.name
            })}
          </p>

          <div className="grid md:grid-cols-2 gap-16 relative pt-12">
            <div className="absolute inset-0 hidden md:block pointer-events-none mt-[40px]">
              <svg className="absolute left-[25%] top-[25%] w-[25%] h-[25%]" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
              <svg className="absolute left-[50%] top-[25%] w-[25%] h-[25%]" viewBox="0 0 100 100">
                <line x1="100" y1="0" x2="0" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
              <svg className="absolute left-[25%] top-[50%] w-[25%] h-[25%]" viewBox="0 0 100 100">
                <line x1="0" y1="100" x2="100" y2="0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
              <svg className="absolute left-[50%] top-[50%] w-[25%] h-[25%]" viewBox="0 0 100 100">
                <line x1="100" y1="100" x2="0" y2="0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-3 h-3 bg-yellow-400 rounded-full opacity-60" />
                <div className="absolute -top-8 -right-14 w-2 h-2 bg-pink-400 rounded-full opacity-60" />
                <div className="absolute -bottom-10 -left-10 w-2.5 h-2.5 bg-teal-400 rounded-full opacity-60" />
                <div className="absolute -bottom-8 -right-12 w-2 h-2 bg-purple-400 rounded-full opacity-60" />

                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Lightbulb className="w-10 h-10 text-white fill-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-3xl p-8 shadow-sm relative hover:shadow-md transition-shadow">
              <div className="absolute top-4 right-4 w-3 h-3 bg-pink-400 rounded-full" />
              <div className="flex items-start gap-3">
                <div className="text-3xl">📊</div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-xl mb-2">{t('pt1')}</h3>
                  <p className="text-gray-700">{t('pt1desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-3xl p-8 shadow-sm relative hover:shadow-md transition-shadow">
              <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="flex items-start gap-3">
                <div className="text-3xl">❓</div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-xl mb-2">{t('pt2')}</h3>
                  <p className="text-gray-700">{t('pt2desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-3xl p-8 shadow-sm relative hover:shadow-md transition-shadow">
              <div className="absolute top-4 right-4 w-3 h-3 bg-teal-400 rounded-full" />
              <div className="flex items-start gap-3">
                <div className="text-3xl">📝</div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-xl mb-2">{t('pt3')}</h3>
                  <p className="text-gray-700">{t('pt3desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-3xl p-8 shadow-sm relative hover:shadow-md transition-shadow">
              <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full" />
              <div className="flex items-start gap-3">
                <div className="text-3xl">👁</div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-xl mb-2">{t('pt4')}</h3>
                  <p className="text-gray-700">{t('pt4desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-4xl font-bold mb-10">{t('Core Features')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className={`${f.class} p-6 border rounded-xl shadow-sm hover:shadow-md transition`}>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HowToUse />
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t.rich('Simple', {
              purple: (chunks) => <span className="underline decoration-wavy decoration-purple-400">{chunks}</span>,
            })}
          </h2>
          <p className="text-xl text-zinc-300">
              {t('Get started instantly')}
          </p>
          <Pricing />
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
          {t('Start trading smarter today')}<br />
            <span className="text-teal-600">{t('Join early access')}</span>
          </h2>
          <p className="text-xl text-zinc-300">
          {t('Limited early access')}
          </p>
          {/* <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-12 py-6">
            
          </Button> */}
        </div>
      </section>
    </>
  );
}
