import ScheduleEditor from "@/components/schedule"
import { logout } from "@/utils/supabase/actions"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

export default async function Page() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const email = user?.email
    let username = ""
    let periods = []

    if (email) {
        const { data, error } = await supabase.from("users").select("*").eq("email", email)
        if (error) {
            // TODO: handle error with fetching
        } else {
            const userData = data[0]
            username = userData.username
            periods = userData.periods
        }
    }

    if (periods.length == 0)
        periods = Array(10).fill({ class: "EMPTY" })

    return (
        <div className="flex flex-col items-center my-5">
            {
                user ? <>
                    <h1 className="text-3xl m-2">Hello, {username}.</h1>

                    <ScheduleEditor username={username} periods={periods} />

                    <button onClick={logout} className="border border-[#d1d1d1] bg-[#e6e6e6] hover:bg-[#e1e1e1] rounded-xl px-2 py-1 m-2">Log out</button>


                </>
                    : <>
                        <h1 className="m-5 text-3xl">StuyMatch</h1>
                        <Link href="/login" className="border border-[#d1d1d1] bg-[#e6e6e6] hover:bg-[#e1e1e1] rounded-xl px-2 py-1 m-2">Log in</Link>
                        <Link href="/register" className="border border-[#d1d1d1] bg-[#e6e6e6] hover:bg-[#e1e1e1] rounded-xl px-2 py-1 m-2">Register</Link>
                    </>
            }
        </div>
    )
}