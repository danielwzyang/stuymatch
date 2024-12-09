import type { Metadata } from "next"
import ClientPage from "./client"

export const metadata: Metadata = {
    title: "Login",
    description: "Log in to StuyMatch",
}

export default function Page() {
    return <ClientPage />
}