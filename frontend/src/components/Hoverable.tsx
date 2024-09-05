import { ReactNode } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"

type HoverableProps = {
    title:string
    children:ReactNode
}

function Hoverable(props:HoverableProps) {

    return (
        <div className="flex justify-center items-center px-2 cursor-pointer">
            <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger className="">
                    <div className="h-100 text-black text-lg flex flex-col text-end">{props.title}</div>
                </HoverCardTrigger>
                <HoverCardContent className="w-30">
                    <div className="flex flex-col justify-between space-x-4">
                        {props.children}
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

export default Hoverable