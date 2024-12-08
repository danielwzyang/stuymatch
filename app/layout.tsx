import type { Metadata } from "next"
import "./globals.css"
import { Josefin_Sans } from "next/font/google"

const josefin_sans = Josefin_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "StuyMatch",
    description: "Match up schedules with your friends!",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${josefin_sans.className} bg-[#F0F0F0] text-[#333333]`}>
                {children}
            </body>
        </html>
    )
}
