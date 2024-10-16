import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <>
        <main>{children}</main>
        <Toaster position="top-right" richColors/>
    </>
  )
}
