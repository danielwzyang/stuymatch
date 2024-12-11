import ProfileSchedule from "@/components/profileSchedule"
import getProfile, { getClasses } from "@/utils/supabase/actions"
import { createClient } from "@/utils/supabase/server"
import { notFound, redirect } from "next/navigation"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) redirect("/login")

    const username = (await params).slug

    const data = await getProfile(username)
    if (!data) notFound()
    const { periods, followers, following } = data
    const classes = await getClasses(periods)

    return (
        <div className="flex flex-col items-center my-5">
            <h1 className="text-3xl m-2">{username}</h1>
            <div className="flex space-x-4">
                <h1 className="">{followers.length} followers</h1>
                <h1 className="">{following.length} following</h1>
            </div>
            <ProfileSchedule classes={classes || []} />
        </div>
    )
}