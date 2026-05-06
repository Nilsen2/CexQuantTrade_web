import { companyConfig } from "@/lib/company-config"
import { Link } from "@/i18n/navigation";
import {useTranslations} from 'next-intl';

export default function Footer() {
    const t = useTranslations();
    return (
        <footer className="bg-criticly-navy text-white py-16">
            <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-12">
                <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center font-bold">
                    {companyConfig.shortName}
                    </div>
                    <span className="font-bold text-xl">{companyConfig.name}</span>
                </div>
                <p className="text-gray-400 text-sm">{t('PubDesc.TSTB')}</p>
                <p className="text-gray-500 text-xs mt-4">© {companyConfig.established} {companyConfig.legalName}</p>
                </div>

                <div>
                <h4 className="font-bold mb-4">{t('Navbar.PRODUCT')}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="/#pricing" className="hover:text-white transition">{t('Navbar.Pricing')}</Link></li>
                    <li><Link href="/forecast" className="hover:text-white transition">{t('Navbar.BTC Forecast')}</Link></li>
                    <li><Link href="/strategies" className="hover:text-white transition">{t('Navbar.Top Rank')}</Link></li>
                    <li><Link href="/how-it-works" className="hover:text-white transition">{t('Navbar.How It Works')}</Link></li>
                </ul>
                </div>

                <div>
                <h4 className="font-bold mb-4">{t('Navbar.COMPANY')}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="/terms" className="hover:text-white transition">{t('Navbar.Terms of Service')}</Link></li>
                    <li><Link href="/privacy" className="hover:text-white transition">{t('Navbar.Privacy Policy')}</Link></li>
                    <li> <a href={`mailto:${companyConfig.email}`} className="hover:text-white transition">{t('Navbar.Contact Us')}</a></li>
                </ul>
                </div>

                <div>
                <h4 className="font-bold mb-4">{t('Navbar.RESOURCES')}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                        <a href="https://www.chatgpt.com/" target="_blank"  className="hover:text-white transition">ChatGPT</a>
                    </li>
                    <li>
                        <a href="https://www.deepseek.com/" target="_blank"  className="hover:text-white transition">Deepseek</a>
                    </li>
                    <li><a href="https://www.binance.com/en/support/faq/detail/360002502072" target="_blank" className="hover:text-white transition">{t('PubDesc.HCKB')}</a></li>
                    <li><a href="https://my.okx.com/account/my-api" target="_blank" className="hover:text-white transition">{t('PubDesc.HCKO')}</a></li>
                </ul>
                </div>
            </div>
            </div>
        </footer>
    );
  }
  