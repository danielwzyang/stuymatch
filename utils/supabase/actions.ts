"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

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