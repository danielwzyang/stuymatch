"use client"

import { useEffect, useState } from "react"

export default function ClientPage() {
    const [step, setStep] = useState(0)

    const [email, setEmail] = useState("")

    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("")

    const [validNext, setValid] = useState(false)

    useEffect(() => {
        // TODO: add checks for moving on like making sure the username is unique and the email is valid and the password is strong

        switch (step) {
            case 0:
                if (email === "") setValid(false)
                else setValid(true)
                break
            case 1:
                if (!username) setValid(false)
                else setValid(true)
                break
            case 2:
                setValid(false)
                break
        }
    }, [step, email, username, password])


    function next() {
        if (step == 2) {
            // TODO: submit
            return
        }

        setStep(step + 1)
    }

    function back() {
        setStep(step - 1)
    }

    function renderStep() {
        switch (step) {
            case 0:
                return (
                    <>
                        <h1 className="text-center text-2xl my-3">Enter your email.</h1>
                        <h1 className="text-[#808080] text-sm text-center mb-5">You will receive a confirmation email.</h1>
                        <div className="flex justify-center">
                            <input
                                className="w-[260px] px-3 py-2 border-[#d1d1d1] bg-[#e6e6e6] rounded-xl"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                                placeholder="email:"
                            />
                        </div>
                    </>
                )
            case 1:
                return (
                    <>
                        <h1 className="text-center text-2xl my-3">Pick a username.</h1>
                        <h1 className="text-[#808080] text-sm text-center mb-5">Can only contain letters and numbers.</h1>
                        <div className="flex justify-center">
                            <input
                                className="w-[260px] px-3 py-2 border-[#d1d1d1] bg-[#e6e6e6] rounded-xl"
                                value={"@" + username}
                                onChange={(event) => { setUsername(event.target.value.substring(1).replace(/[^a-zA-Z0-9]/g, "")) }}
                                placeholder="username:"
                            />
                        </div>
                    </>
                )
            case 2:
                return (
                    <>
                        <h1 className="text-center text-2xl my-3">Choose a password.</h1>
                        <ul className="text-[#808080] text-sm text-center mb-5">
                            <li>Must be at least 6 characters.</li>
                        </ul>
                        <div className="flex justify-center">
                            <input
                                className="w-[260px] px-3 py-2 border-[#d1d1d1] bg-[#e6e6e6] rounded-xl"
                                value={password}
                                type="password"
                                onChange={(event) => { setPassword(event.target.value) }}
                                placeholder="password:"
                            />
                        </div>
                    </>
                )
        }
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="border-2 w-fit rounded-3xl mx-auto">
                <div className="w-screen max-w-[300px] mx-auto my-5">
                    {renderStep()}
                </div>

                <div className="flex relative w-screen max-w-[300px] mx-auto h-14">
                    <button
                        disabled={step == 0}
                        onClick={back}
                        className={"absolute left-5 border border-[#d1d1d1] bg-[#e6e6e6] rounded-xl px-2 py-1 " +
                            (step != 0 ? "" : " !text-[#808080]")
                        }>
                        ←
                    </button>

                    <button
                        disabled={!validNext}
                        onClick={next}
                        className={"absolute right-5 border border-[#d1d1d1] bg-[#e6e6e6] rounded-xl px-2 py-1 " +
                            (validNext ? "" : " !text-[#808080]")
                        }>
                        {step == 2 ? "Register" : "→"}
                    </button>
                </div>
            </div>
        </div>
    )
}