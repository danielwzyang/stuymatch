"use client"

export interface Class {
    class: string,
    teacher?: string
}

export interface ScheduleProps {
    username: string,
    periods: Class[]
}

export default function ScheduleEditor(props: ScheduleProps) {
    function openDialog() {
        // TODO: add class dialog with search feature
    }

    function period(e: Class, i: number) {
        return <div className="flex" key={i}>
            {
                e.class === "EMPTY" ? <>
                    <div className="p-3 w-14 border flex items-center justify-center">
                        {i + 1}
                    </div>

                    <div className="p-3 w-52 h-20 border flex flex-col items-center justify-center">
                        <button className="w-5" onClick={openDialog}>
                            <img src="/plus.svg" alt="add class" />
                        </button>
                    </div>
                </> : <>
                    <div className="p-3 w-14 border flex items-center justify-center">
                        {i + 1}
                    </div>

                    <div className="p-3 w-52 h-20 border flex flex-col items-center justify-center">
                        <h1>{e.class}</h1>
                        <h1 className="text-[#606060]">{e.teacher}</h1>
                    </div>
                </>
            }
        </div>
    }

    const columnOne = props.periods.slice(0, 5)
    const columnTwo = props.periods.slice(5, 10)

    return (
        <>
            <div className="grid sm:grid-cols-2 m-5">
                <div>{columnOne.map((e: Class, i) => period(e, i))}</div>
                <div>{columnTwo.map((e: Class, i) => period(e, i + 5))}</div>
            </div>


        </>
    )
}