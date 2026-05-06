import { redirect } from "@/i18n/navigation";
import {getLocale} from 'next-intl/server';

export default async function UserPage() {
    const locale = await getLocale();
    redirect({href: '/user/info', locale});
}