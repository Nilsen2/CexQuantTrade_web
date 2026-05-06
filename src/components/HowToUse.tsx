import { companyConfig } from "@/lib/company-config";
import {useTranslations} from 'next-intl';

export default function HowToUse() {
    const t = useTranslations("Home.how2use");
    return (
        <section id="usecases" className="container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto text-center space-y-12">
            <div className="text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t.rich('title', {
                purple: (chunks) => <span className="underline decoration-wavy decoration-purple-400">{chunks}</span>,
                })}
                </h2>
                <p className="text-xl text-zinc-300">
                {t.rich('unlock', {
                    name: companyConfig.name,
                })}
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                {[
                {
                    num: "1",
                    title: t('stepT1'),
                    desc: t('stepD1'),
                    icon: "💳",
                    color: "bg-emerald-500"
                },
                {
                    num: "2",
                    title: t('stepT2'),
                    desc: t('stepD2'),
                    icon: "🔗",
                    color: "bg-blue-500"
                },
                {
                    num: "3",
                    title: t('stepT3'),
                    desc: t('stepD3'),
                    icon: "⚙️",
                    color: "bg-indigo-500"
                },
                {
                    num: "4",
                    title: t('stepT4'),
                    desc: t('stepD4'),
                    icon: "🚀",
                    color: "bg-orange-500"
                }
                ].map((step, i) => (
                <div key={i} className="text-center space-y-4">
                    <div className="relative w-20 h-20 inline-block">
                    <div className={`w-20 h-20 ${step.color} rounded-2xl mx-auto flex items-center justify-center text-3xl`}>
                        {step.icon}
                    </div>
                    <div className="absolute top-0 left-4 -translate-x-1/2 w-8 h-8 bg-white opacity-50 rounded-full flex items-center justify-center font-bold">
                        {step.num}
                    </div>
                    </div>
                    <h3 className="text-white font-bold text-lg">{step.title}</h3>
                    <p className="text-zinc-300 text-sm">{step.desc}</p>
                </div>
                ))}
            </div>
            </div>
        </section>
    );
  }
  