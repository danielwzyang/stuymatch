"use client"

import { login } from "../../utils/supabase/actions"
import { useEffect, useState } from "react"

export default function ClientPage() {
    const [valid, setValid] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        // RFC 5322 standard for email validation using regex
        const validEmail = email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) != null

        if (email === "" || !validEmail || password.length < 6) setValid(false)
        else setValid(true)
    }, [email, password])

    async function submit() {
        // TODO: set up actual login with supabase
        const error = await login(email, password)

        console.log(error)

        if (error === "email_not_confirmed")
            setError("Confirm your email.")
        else if (error === "invalid_credentials")
            setError("Invalid credentials.")
        else if (error)
            setError("Something went wrong.")
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="border-2 w-fit rounded-3xl mx-auto">
                <div className="w-screen max-w-[300px] mx-auto my-5 flex flex-col items-center space-y-3">
                    <h1 className="text-center text-2xl">Login</h1>

                    <input
                        className="w-[260px] px-3 py-2 border-[#d1d1d1] bg-[#e6e6e6] rounded-xl text-center"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        placeholder="email:"
                    />
                    <input
                        className="w-[260px] px-3 py-2 border-[#d1d1d1] bg-[#e6e6e6] rounded-xl text-center"
                        value={password}
                        type="password"
                        onChange={(event) => { setPassword(event.target.value) }}
                        placeholder="password:"
                    />


                    <button
                        disabled={!valid}
                        onClick={submit}
                        className={"border border-[#d1d1d1] bg-[#e6e6e6] rounded-xl px-2 py-1 " +
                            (valid ? " hover:bg-[#e1e1e1]" : " !text-[#808080]")
                        }>
                        Log in
                    </button>
                    <h1
                        className="px-2 py-1 rounded-xl text-[#808080]"
                        hidden={error == ""}>
                        {error}
                    </h1>
                </div>
            </div>
        </div>
    )
}