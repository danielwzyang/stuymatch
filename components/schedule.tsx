"use client"

import { removePeriod, removeStudent, searchPeriod } from "@/utils/supabase/actions"
import { useState } from "react"

export interface Class {
    id: string,
    class: string,
    teacher?: string
}

export interface ScheduleProps {
    username: string,
    periods: Class[]
}

export default function ScheduleEditor(props: ScheduleProps) {
    const [periods, setPeriods] = useState(props.periods)
    const [dialogOpen, setOpen] = useState(false)
    const [currentPeriod, setPeriod] = useState(0)

    async function updatePeriod(period: number, value: Class) {
        periods[period] = value
        setPeriods(periods)
    }

    function period(e: Class, i: number) {
        return <div className="flex" key={i}>
            {
                e.class === "EMPTY" ? <>
                    <div className="p-3 w-14 border flex items-center justify-center">
                        {i + 1}
                    </div>

                    <div className="p-3 w-52 h-20 border flex flex-col items-center justify-center">
                        <button className="w-5" onClick={() => {
                            setOpen(true)
                            setPeriod(i)
                        }}>
                            <img src="/plus.svg" alt="add class" />
                        </button>
                    </div>
                </> : <>
                    <div className="p-3 w-14 border flex items-center justify-center">
                        {i + 1}
                    </div>

                    <div className="p-3 w-52 h-20 border flex flex-col items-center justify-center relative">
                        <h1>{e.class}</h1>
                        <h1 className="text-[#606060]">{e.teacher}</h1>
                        <button className="w-4 absolute right-2" onClick={async () => {
                            await removePeriod(props.username, i)
                            await removeStudent(e.id, props.username)
                            updatePeriod(i, { id: "EMPTY", teacher: "", class: "EMPTY" })
                        }}>
                            <img src="/x.svg" alt="remove class" />
                        </button>
                    </div>
                </>
            }
        </div>
    }

    return (
        <>
            <div className="grid sm:grid-cols-2 m-5">
                <div>{periods.slice(0, 5).map((e: Class, i) => period(e, i))}</div>
                <div>{periods.slice(5, 10).map((e: Class, i) => period(e, i + 5))}</div>
            </div>
            <div className={"fixed bg-[#4747471a] top-0 h-screen w-screen" + (dialogOpen ? " flex" : " hidden")} onClick={() => setOpen(false)}></div>
            <div className={"z-10 absolute w-72 h-72 bg-[#e6e6e6] border top-[30%] justify-center rounded-xl" + (dialogOpen ? " flex" : " hidden")}>
                <h1 className="m-5 text-xl">Period {currentPeriod + 1}</h1>
            </div>
        </>
    )
}