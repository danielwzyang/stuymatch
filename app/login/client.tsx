"use client"

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

    function login() {
        // TODO: set up actual login with supabase
        setError("Invalid credentials")
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="border-2 w-fit rounded-3xl mx-auto">
                <div className="w-screen max-w-[300px] mx-auto my-5 flex flex-col items-center space-y-3">
                    <input
                        className="w-[260px] px-3 py-2 border-[#d1d1d1] bg-[#e6e6e6] rounded-xl"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        placeholder="email:"
                    />
                    <input
                        className="w-[260px] px-3 py-2 border-[#d1d1d1] bg-[#e6e6e6] rounded-xl"
                        value={password}
                        type="password"
                        onChange={(event) => { setPassword(event.target.value) }}
                        placeholder="password:"
                    />
                </div>

                <div className="flex relative w-screen max-w-[300px] mx-auto h-14">
                    <h1
                        className="absolute left-5 px-2 py-1 rounded-xl text-[#808080]"
                        hidden={error == ""}>
                        {error}
                    </h1>
                    <button
                        disabled={!valid}
                        onClick={login}
                        className={"absolute right-5 border border-[#d1d1d1] bg-[#e6e6e6] rounded-xl px-2 py-1 " +
                            (valid ? "" : " !text-[#808080]")
                        }>
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
}