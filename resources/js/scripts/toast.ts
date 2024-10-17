import { toast } from "sonner"

export function ErrorToast(message: string, status: number) {
    toast.error(message, {
        description: `Error: Request failed with status ${status}`,
        duration: 2000
    })
}

export function SuccessToast(message:string) {
    toast.success(message, {
        duration: 2000
    })
}