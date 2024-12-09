import Link from "next/link"

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="m-5 text-3xl">StuyMatch</h1>
            <Link href="/login" className="border border-[#333333] px-3 py-1 rounded-xl m-2">Log in</Link>
            <Link href="/register" className="border border-[#333333] px-3 py-1 rounded-xl m-2">Register</Link>
        </div>
    )
}