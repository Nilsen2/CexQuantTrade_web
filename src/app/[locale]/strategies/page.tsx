'use client';

import KlineChart from '@/components/kline/KlineChart';
import { meanStrategy, breakoutStrategy, trendStrategy, boxStrategy } from '@/data/kline.mock';
import { useTranslations } from "next-intl";

const strategies = {
  MA: meanStrategy,
  Breakout: breakoutStrategy,
  Reversal: trendStrategy,
  Box: boxStrategy
};

export default function Page() {
    const t = useTranslations();
    return (
        <main className="container mx-auto px-4 py-16 text-white">
        <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">{t('Product.Hot Strategies')}</h2>
            <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4 hover:shadow-lg transition">
                     <div className="mb-4">
                        <h5 className='mb-2'>{t('Product.Box Consolidation')}</h5>
                        <KlineChart data={strategies['Box']} height={320} />
                    </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4 hover:shadow-lg transition">
                    <div className="mb-4">
                        <h5 className='mb-2'>{t('Product.Mean Reversion')}</h5>
                        <KlineChart data={strategies['MA']} height={320} />
                    </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4 hover:shadow-lg transition">
                     <div className="mb-4">
                        <h5 className='mb-2'>{t('Product.Breakout')}</h5>
                        <KlineChart data={strategies['Breakout']} height={320} />
                    </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4 hover:shadow-lg transition">
                     <div className="mb-4">
                        <h5 className='mb-2'>{t('Product.Reversal')}</h5>
                        <KlineChart data={strategies['Reversal']} height={320} />
                    </div>
                </div>
            </div>
        </section>
        </main>
    );
}
