"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { Class } from "@/components/schedule"

export async function login(email: string, password: string) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        console.error(error)
        return error.code
    } else {
        revalidatePath("/", "layout")
        redirect("/")
    }
}

export async function register(email: string, password: string, username: string) {
    const supabase = await createClient()

    const { error } = await supabase.from("users").insert({ username, email })

    if (error)
        console.error(error)

    const { error: error2 } = await supabase.auth.signUp({ email, password })

    if (error2) {
        console.error(error2)
        return error2.code
    }

    return "success"
}

export async function logout() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error(error)
        // TODO: handle error
    }
}

export async function updatePeriods(username: string, periods: Class[]) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("users").select("*").eq("username", username)

    if (error) {
        console.error(error)
        // TODO: handle error
    } else {
        const userData = data[0]
        userData.periods = periods
        const { error } = await supabase.from("users").upsert(userData)

        if (error) {
            console.error(error)
            // TODO: handle error
        }
    }

    // TODO: update classes database by looking at the previous class before change and removing the person from that list and adding person to new class list
}