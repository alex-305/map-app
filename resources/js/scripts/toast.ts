import { toast } from "sonner"

export function ErrorToast(message: string, status: number) {
    toast.error(message, {
        description: `Error: Request failed with status ${status}`,
        duration: 1500
    })
}