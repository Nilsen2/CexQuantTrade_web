import {useTranslations} from 'next-intl';

export default function EarlyAccessBanner() {
    const t = useTranslations("Home.earlybird");
    return (
        <section className="bg-purple-600 text-white py-4">
            <div className="container mx-auto px-4 text-center">
            <p className="text-sm md:text-base">
                <span className="mr-2">⚡</span>
                <strong> 
                    {t.rich('Early Access', {
                        count: 100,
                    })}
                </strong>
                {t('Join our early')}
                {/* <strong>{t('new')} 12/1:</strong> 7{t('subscription')} $29!
                <span className="line-through mx-2">$39</span>
                <span className="bg-purple-700 px-2 py-1 rounded ml-2">{t('save')} 25%+</span> */}
            </p>
            </div>
        </section>
    );
  }
  