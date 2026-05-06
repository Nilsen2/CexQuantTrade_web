"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useRouter } from "@/i18n/navigation";
import { trackEvent, EVENT_TOKEN } from "@/lib/utils";

interface WalletAddress {
  type: number;      // 2 = TRC20, 1 = ERC20
  address: string;
}

export interface PurchaseResponse {
  list: WalletAddress[];
  amount: number;
  price: number;
}
interface RechargeModalProps<T> {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  info: T;
}

export default function RechargeModal<T extends PurchaseResponse>({ open, onOpenChange, info }: RechargeModalProps<T>) {
  const [timeLeft, setTimeLeft] = useState(300);
  const [network, setNetwork] = useState("2"); 
  const router = useRouter();
  const t = useTranslations();

  // 当前选中网络的地址
  const currentAddress = useMemo(() => {
    const typeNum = Number(network);
    return info?.list?.find((i) => i.type === typeNum)?.address || "";
  }, [network, info]);

  // 倒计时
  useEffect(() => {
    if (!open) return;

    setTimeLeft(300);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const minute = Math.floor(timeLeft / 60);
  const second = timeLeft % 60;

  const copyAddress = () => {
    toast.success(t("User.Subscriptions.Copied"),{
      duration: 2000
    });
    navigator.clipboard.writeText(currentAddress);
  };
  const clickFinish= () => {
    onOpenChange(false)
    trackEvent(EVENT_TOKEN.Subscribe, { price: info.amount });
    setConfirmOpen(true)
  }
  const [openConfirm, setConfirmOpen] = useState(false)
  const clickAlertBtn = () => {
    router.push('/user/bill-history')
    setConfirmOpen(false)
  }
  const AlerTip = () => {
    return (
      <AlertDialog open={openConfirm} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="w-120">
          <AlertDialogTitle className="flex justify-center">{t('PubDesc.Warring')}</AlertDialogTitle>
          <AlertDialogDescription className="py-6">
            {t('PubDesc.ChargeFinishMsg')}
          </AlertDialogDescription>
          <AlertDialogAction className={`w-full bg-purple-500 hover:bg-purple-700`} onClick={clickAlertBtn }>
            {t('PubDesc.Confirmed')}
          </AlertDialogAction>
        </AlertDialogContent>
    </AlertDialog>
    )
  }

  return (
    <>
    <AlerTip />
    <Dialog open={open} onOpenChange={onOpenChange}>
        
      <DialogContent
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="
          max-w-xs rounded-2xl gap-2
          border-zinc-800/50 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950
          text-white
      ">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold pb-2">USDT {t('User.Subscriptions.Payment')}</DialogTitle>
        </DialogHeader>
       <div className="rounded-2xl grid gap-2 p-6 border shadow-sm bg-zinc-700/40 backdrop-blur-md border-r border-zinc-800">
        {currentAddress && (
            <div className="flex justify-center">
              <div className="border rounded-xl p-3 bg-muted">
                <QRCode value={currentAddress} size={160} />
              </div>
            </div>
        )}
        <div className="text-center text-purple-500 text-sm py-2">
          {t('User.Subscriptions.Time Left:')} {minute}:{second.toString().padStart(2, "0")}
        </div>
        <div className="font-medium text-sm flex items-center gap-2">
            <span className="text-zinc-300">
              {t('User.Subscriptions.Network:')}
            </span>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger className="flex-1 bg-zinc-800 text-xs border border-zinc-700 text-white">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 text-white border border-zinc-700">
                <SelectItem value="2">TRON (TRC20)</SelectItem>
                <SelectItem value="1">Ethereum (ERC20)</SelectItem>
              </SelectContent>
            </Select>
        </div>
        {currentAddress && (
          <div className=" flex items-center gap-2">
            <div className="text-sm text-zinc-300 font-medium mb-1">{t('User.Subscriptions.Address:')} </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 py-2 px-3 rounded-md border border-zinc-700 !font-medium !text-xs break-all">{currentAddress}</div>
              <Button onClick={copyAddress} variant="secondary" size="sm">
                <Copy className="w-2 h-2" />
              </Button>
            </div>
          </div>
        )}

          <div className="mt-2 border border-zinc-700 rounded-xl p-3 space-y-1 text-sm bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="flex justify-between font-semibold">
              <span>{t('User.Subscriptions.Amount')}</span>
              <span>${info.price}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>{t('User.Subscriptions.Discount')}</span>
              <span className="text-purple-600">-${Math.floor((info.price*100 - info.amount*100)) / 100}</span>
            </div>

            {info?.amount && (
              <div className="flex justify-between font-bold text-lg pt-1">
                <span>{t('User.Subscriptions.Total')}</span>
                <span>$ {info.amount}</span>
              </div>
            )}
          </div>
        </div>
        <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-700" onClick={clickFinish}>
         {t('User.Subscriptions.recharge1')}
        </Button>
      </DialogContent>
    </Dialog>
    </>
  );
}
