import { ReactNode, useEffect, useState, useRef } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"

type HoverableProps = {
    title:string
    children:ReactNode
    hoverColor:string
}


function Hoverable(props:HoverableProps) {

    const [isHoverOpen, setIsHoverOpen] = useState<boolean>(false)
    const [isClickedOpen, setIsClickedOpen] = useState<boolean>(false)
    const hoverCardRef = useRef<HTMLDivElement | null>(null)
    const isClickedOpenRef = useRef(isClickedOpen)

    const handleHover = (open:boolean) => {
        if(!isClickedOpen) {
            setIsHoverOpen(open)
        }
    }

    const handleClick = () => {
        setIsClickedOpen((prev) => !prev)
    }

    const handleClickOutside = (event:MouseEvent) => {
        if (hoverCardRef.current && 
            !hoverCardRef.current.contains(event.target as Node) && 
            isClickedOpenRef.current
        ) {
            setIsClickedOpen(false);
            setIsHoverOpen(false);
        }
    }

    useEffect(() => {
        isClickedOpenRef.current = isClickedOpen
    }, [isClickedOpen])

    useEffect(() => {
        if(isClickedOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isClickedOpen])

    return (
        <div
        className={"flex justify-center items-center px-2 cursor-pointer" + " hover:bg-"+props.hoverColor}>
            <HoverCard 
            openDelay={0} 
            closeDelay={100}
            open={isHoverOpen || isClickedOpen}
            onOpenChange={handleHover}>
                <HoverCardTrigger 
                className="flex items-center justify-center w-full h-full p-0 m-0"
                onClick={handleClick}>

                    <div className="h-100 text-black text-lg flex flex-col text-end">{props.title}</div>
                </HoverCardTrigger>
                <div>
                    <HoverCardContent ref={hoverCardRef} className="w-30 mt-0">
                        <div className="flex flex-col justify-between space-x-4">
                            {props.children}
                        </div>
                    </HoverCardContent>
                </div>
            </HoverCard>
        </div>
    )
}

export default Hoverable