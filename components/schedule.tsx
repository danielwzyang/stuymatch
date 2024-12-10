"use client"

import { addClass, addStudent, removePeriod, removeStudent, searchPeriod } from "@/utils/supabase/actions"
import { useEffect, useState } from "react"

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
    const [currentSearch, setSearch] = useState<Class[]>([])
    const [filter, setFilter] = useState("")

    async function updatePeriod(period: number, value: Class) {
        const copy = [...periods]
        copy[period] = value
        setPeriods(copy)
    }

    useEffect(() => {
        if (!dialogOpen) {
            setSearch([])
            setFilter("")
        }
    }, [dialogOpen])

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
                            searchPeriod(i).then((classes) => setSearch(classes || []))
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
                        <h1 className="text-[#606060]">{e.teacher == "@" ? "" : e.teacher}</h1>
                        <button className="w-4 absolute right-2" onClick={async () => {
                            updatePeriod(i, { id: "EMPTY", teacher: "", class: "EMPTY" })
                            await removePeriod(props.username, i)
                            await removeStudent(e.id, props.username)
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
            <div className={"fixed top-0 h-screen w-screen" + (dialogOpen ? " flex" : " hidden")} onClick={() => setOpen(false)}></div>
            <div className={"z-10 fixed w-72 h-80 bg-[#e6e6e6] border top-[20%] flex flex-col items-center rounded-xl" + (dialogOpen ? " flex" : " hidden")}>
                <h1 className="m-5 text-xl">Period {currentPeriod + 1}</h1>
                <input
                        className="w-56 px-3 py-2 bg-[#F0F0F0] rounded-xl text-center"
                        value={filter}
                        onChange={(event) => { setFilter(event.target.value) }}
                        placeholder="search:"
                    />
                <div className="space-y-3 my-5 overflow-y-auto">
                    {
                        currentSearch.length == 0 ?
                            <h1>Loading...</h1> :
                            <>
                                {
                                    currentSearch.filter(e => {
                                        return e.class.toLowerCase().startsWith(filter.toLowerCase()) || e.teacher?.toLowerCase().startsWith(filter.toLowerCase())
                                    }).map((e, i) => {
                                        return (
                                            <div className="relative border w-56 h-16 rounded-xl bg-[#F0F0F0] flex flex-col px-3 justify-center" key={i}>
                                                <h1 className="text-sm">{e.class}</h1>
                                                <h1 className="text-sm text-[#606060]">{e.teacher == "@" ? "" : e.teacher}</h1>
                                                <button className="w-4 absolute right-3" onClick={async () => {
                                                    setOpen(false)
                                                    updatePeriod(currentPeriod, e)
                                                    await addClass(props.username, currentPeriod, e.id)
                                                    await addStudent(e.id, props.username)
                                                }}>
                                                    <img src="/plus.svg" alt="add class" />
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )
}