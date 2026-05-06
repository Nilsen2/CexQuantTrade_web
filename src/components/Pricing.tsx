"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RechargeModal, { PurchaseResponse } from "@/components/RechargeModal";
import { usePagination } from "@/hooks/usePagination";
import { useAuthStore } from "@/store/useAuthStore";
import { redirect } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { apiClient } from "@/lib/fetchApi";
import { toast } from "sonner";
import { trackEvent, EVENT_TOKEN } from "@/lib/utils";

export default function Pricing() {
  const t = useTranslations("Plan");
  const locale = useLocale();
  const { isLogged } = useAuthStore()
  const {
    list,
  } = usePagination({
    url: '/packages',
    pageSize: 20,
  });
  const features =  [
    t("Supports Binance & OKX exchanges"),
    t("Built-in trading strategies ready to use"),
    t("One-click start with auto configuration"),
  ]
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<PurchaseResponse>()
  const purchaseProduct = async (id: number, price: number) => {
    if(isLogged) {
      trackEvent(EVENT_TOKEN.ClickPackaege, { packageId: id });
      try {
        const result = await apiClient.post<PurchaseResponse>('/packages/purchase',{
          id: id
        })
        if (result.code === 0) {
          setInfo({
            ...result.data,
            price: price
          })
          setOpen(true)
        } else {
          toast.error(result.msg,{
            duration: 2000
          })
        }
      } catch (error) {
      }
    } else {
    redirect({href: '/signin', locale});
    }
  }
    return (
      <>
        <div className="grid md:grid-cols-3 gap-8">
        {list.map((plan, index) => {
          const isPromo = plan.originPrice !== plan.price
          return (
            <div
            key={index}
            className={`bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-3xl p-8 relative`}
            >
            <div
                className={`absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full`}
            />
            {isPromo && (
                <div
                className={`absolute -top-3 right-8 bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-medium`}
                >
                {t("New Account")}
                </div>
            )}
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

            <div className="mb-4">
                {isPromo && (
                <span className="text-gray-400 line-through text-2xl mr-2">
                    ${plan.originPrice}
                </span>
                )}
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600"> {plan.duration}/{plan.type}</span>
            </div>

            <p className="text-gray-600 mb-6">{t("For regular traders")}</p>

            <ul className="space-y-3 mb-8 text-left">
                {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                    className={`w-5 h-5 text-purple-600 mt-0.5`}
                    />
                    <span className="text-sm">{f}</span>
                </li>
                ))}
            </ul>

            <Button
                className={`w-full bg-purple-500 hover:bg-purple-700`}
                onClick={() => purchaseProduct(plan.id, plan.price)}
            >
                {t("Start Now")}
            </Button>
            </div>
        )})}
        </div>
        {info && <RechargeModal open={open} onOpenChange={setOpen} info={info} />}
      </>
    );
  }
  