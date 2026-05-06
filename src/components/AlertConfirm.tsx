import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useTranslations } from "next-intl";


interface AlertConfirmProps {
    visible: boolean
    title: string,
    description: string,
    confirmText?: string,
    cancelText?: string,
    onCancel: () => void,
    onConfirm: () => void
}

export default function AlertConfirm({
  visible,
  title,
  description,
  confirmText,
  cancelText,
  onCancel,
  onConfirm
}: AlertConfirmProps) {
    const t = useTranslations();
    return (
        <Dialog open={visible} onOpenChange={onCancel}>
        <DialogContent className="max-w-md">
            <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="w-5 h-5" />
                {title || ''}
            </DialogTitle>
            </DialogHeader>

            <p className="text-sm tracking-tight text-zinc-700">
             {description || ''}
            </p>
            <DialogFooter className="gap-2">
            <Button
                variant="secondary"
                onClick={onCancel}
            >
                {cancelText || t('PubDesc.Cancel')}
            </Button>

            <Button
                onClick={onConfirm}
                className="bg-purple-600 hover:bg-purple-700"
            >
                {confirmText || t('PubDesc.Confirm')}
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

