import type { Metadata } from "next"
import ClientPage from "./client"

export const metadata: Metadata = {
    title: "Register",
    description: "Create an account for StuyMatch",
}

export default function Page() {
    return <ClientPage />
}