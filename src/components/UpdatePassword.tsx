'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { apiClient } from "@/lib/fetchApi";
import { signOut } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";

interface UpdatePasswordProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpdatePassword({
  open,
  onOpenChange
}: UpdatePasswordProps) {
    const t = useTranslations();
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        setError(null)

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError(t("sign.up.t2"));
            return
        }

        if (newPassword !== confirmPassword) {
            setError(t("sign.up.t3"));
            return
        }

        try {
        setLoading(true)

         const result = await apiClient.post('/change/password', {
            password: oldPassword,
            newPassword: newPassword,
        });
        if (result.code === 0) {
            toast.success(t("sign.up.t4"),{
                duration: 2000,
            });
            setLoading(false);
            onOpenChange(false)
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                signOut({redirect: false}).then(() => {
                    router.push("/signin");
                })
            }, 1000)
        } else {
            setError(result.msg || t('sign.up.t5'));
        }
        } catch (err) {
            setError(t("sign.up.t5"))
        } finally {
            setLoading(false)
        }
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>{t("sign.up.t6")}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="oldPassword">{t("sign.up.t7")}</Label>
                <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="newPassword">{t("sign.up.t8")}</Label>
                <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="confirmPassword">{t("sign.up.t9")}</Label>
                <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
            </div>
            <DialogFooter>
                <Button 
                    variant="outline" 
                    className="border-purple-600 text-purple-600 hover:text-purple-500 bg-transparent hover:border-purple-500 hover:bg-transparent"
                    onClick={() => onOpenChange(false)}>
                    {t("sign.up.t10")}
                </Button>
                <Button className='bg-purple-600 hover:bg-purple-700' onClick={handleSubmit}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t("sign.up.t11")}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
