export interface Class {
    class: string,
    teacher?: string
}

export interface ProfileScheduleProps {
    classes: Class[]
}

export default function ProfileSchedule(props: ProfileScheduleProps) {
    function period(e: Class, i: number) {
        return <div className="flex" key={i}>
            <div className="p-3 w-14 border flex items-center justify-center">
                {i + 1}
            </div>

            <div className="p-3 w-52 h-20 border flex flex-col items-center justify-center relative">
                <h1>{e.class}</h1>
                <h1 className="text-[#606060]">{e.teacher == "@" ? "" : e.teacher}</h1>
            </div>
        </div>
    }

    return (
        <div className="grid sm:grid-cols-2 m-5">
            <div>{props.classes.slice(0, 5).map((e: Class, i) => period(e, i))}</div>
            <div>{props.classes.slice(5, 10).map((e: Class, i) => period(e, i + 5))}</div>
        </div>
    )
}