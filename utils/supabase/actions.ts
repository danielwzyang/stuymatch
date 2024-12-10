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

export async function getClasses(ids: string[]) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("classes").select("teacher, class").in("id", ids).order("period", { ascending: true })

    if (error) {
        console.error(error)
        // TODO: handle error
    }

    ids.forEach((e, i) => {
        if (e === "EMPTY") data?.splice(i, 0, { teacher: "", class: "EMPTY" })
    })

    return data
}

export async function searchPeriod(period: number) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("classes").select("id, teacher, class").eq("period", period).order("teacher")

    if (error) {
        console.error(error)
        // TODO: handle error
    }

    return data
}

export async function removePeriod(username: string, period: number) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("users").select("*").eq("username", username)

    if (error || data.length == 0) {
        console.error(error)
        // TODO: handle error
    }

    const studentData: { username: string, periods: string[] } = data![0]

    studentData.periods[period] = "EMPTY"

    const { error: error2 } = await supabase.from("users").upsert(studentData)

    if (error2) {
        console.error(error2)
        // TODO: handle error
    }
}

export async function removeStudent(id: string, student: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("classes").select("*").eq("id", id)

    if (error || data.length == 0) {
        console.error(error)
        // TODO: handle error
    }

    // could probably come up with a faster way to remove a student but this is the rudimentary way for now
    const classData: { id: string, students: string[] } = data![0]
    classData.students.splice(classData.students.indexOf(student), 1)

    const { error: error2 } = await supabase.from("classes").upsert(classData)

    if (error2) {
        console.error(error2)
        // TODO: handle error
    }
}

export async function addClass(username: string, period: number, id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("users").select("*").eq("username", username)

    if (error || data.length == 0) {
        console.error(error)
        // TODO: handle error
    }

    const studentData: { username: string, periods: string[] } = data![0]

    if (studentData.periods[period] != "EMPTY")
        return

    studentData.periods[period] = id

    const { error: error2 } = await supabase.from("users").upsert(studentData)

    if (error2) {
        console.error(error2)
        // TODO: handle error
    }
}

export async function addStudent(id: string, student: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("classes").select("*").eq("id", id)

    if (error || data.length == 0) {
        console.error(error)
        // TODO: handle error
    }

    const classData: { id: string, students: string[] } = data![0]

    if (student in classData.students)
        return

    classData.students.push(student)

    const { error: error2 } = await supabase.from("classes").upsert(classData)

    if (error2) {
        console.error(error2)
        // TODO: handle error
    }
}