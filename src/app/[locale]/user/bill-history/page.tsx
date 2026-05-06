"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { History, RefreshCcw, BrushCleaning } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePagination } from "@/hooks/usePagination";
import dayjs from "dayjs";
import { companyConfig } from "@/lib/company-config";

export default function UserSubscriptionPage() {
    const t = useTranslations();

    const {
        list,
        loading,
        refresh
    } = usePagination<PackagesHistory>({
        url: '/packages/history',
        pageSize: 50,
    });
    const renderStatus = (status: number) => {
    const map = {
        0: { label: t("PubDesc.Pending"), color: "bg-yellow-500/20 text-yellow-400" },
        1: { label: t("PubDesc.Success"), color: "bg-green-500/20 text-green-400" },
        2: { label: t("PubDesc.Failed"),  color: "bg-red-500/20 text-red-400" },
    } as const;

    const s = map[status as 0 | 1 | 2] ?? { label: "Unknown", color: "bg-gray-500/20 text-gray-400" };

    return (
        <span
        className={`px-2 py-0.5 text-xs rounded-md font-medium ${s.color}`}
        >
        {s.label}
        </span>
    );
    };
    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2 text-white flex items-center">
                <History className="w-6 h-6 mr-2" />
                {t('User.Subscriptions.s2')}
            </h1>
            <h5 className="text-sm tracking-tight mb-4 text-zinc-300">{t.rich('User.Subscriptions.s3', {
                purple: (chunks) => <a href={`mailto:${companyConfig.email}`} className="text-purple-600  hover:!text-purple-600 transition">{chunks}</a>,
            })}</h5>
            <Card className="bg-zinc-900/70 border-zinc-800 mt-2 text-white">
                <CardContent>
                <div className="flex justify-end mb-4" onClick={refresh}>
                    <RefreshCcw className={loading ? "animate-spin w-6 h-6" : "w-6 h-6"} />
                </div>
                <Table>
                    <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="text-white">ID</TableHead>
                        <TableHead className="text-white">{t('User.Subscriptions.colum1')}</TableHead>
                        <TableHead className="text-white">{t('User.Subscriptions.colum2')}</TableHead>
                        <TableHead className="text-white">{t('User.Subscriptions.colum3')}</TableHead>
                        <TableHead className="text-white">{t('User.Subscriptions.colum4')}</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {list.map((item, i) => (
                        <TableRow key={i} className="hover:bg-zinc-800/50 transition-colors">
                        <TableCell className="text-zinc-300">{item.id}</TableCell>
                        <TableCell className="text-zinc-300">
                            {item?.createdAt && dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </TableCell>
                        <TableCell className="text-zinc-300">{item.info.name}</TableCell>
                        <TableCell className="text-zinc-300">{item.info.price} / {item.info.duration}-{item.info.type}</TableCell>
                        <TableCell className="text-zinc-300">
                            {renderStatus(item.status)}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {
                list.length === 0 && loading === false &&
                <div className="text-center text-zinc-500 py-8 flex justify-center">
                    <BrushCleaning />
                </div>
                }
                </CardContent>
            </Card>
        </div>
    )
}