import { ReactNode, useEffect, useState, useRef } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"

type HoverableProps = {
    title:string
    children:ReactNode
    hoverColor:string
}


function Hoverable(props:HoverableProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isClickedOpen, setIsClickedOpen] = useState<boolean>(false)
    const hoverCardRef = useRef<HTMLDivElement | null>(null)

    const handleHover = (open:boolean) => {
        if(!isClickedOpen) {
            setIsOpen(open)
        }
    }

    const handleClick = () => {
        setIsOpen((prev) => !prev)
        setIsClickedOpen((prev) => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            if (hoverCardRef.current && !hoverCardRef.current.contains(event.target as Node)) {
                setIsClickedOpen(false);
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hoverCardRef])

    return (
        <div 
        ref={hoverCardRef}
        className={"flex justify-center items-center px-2 cursor-pointer" + " hover:bg-"+props.hoverColor}>
            <HoverCard 
            openDelay={0} 
            closeDelay={100}
            open={isOpen}
            onOpenChange={handleHover}>
                <HoverCardTrigger 
                className="flex items-center justify-center w-full h-full p-0 m-0"
                onClick={handleClick}>

                    <div className="h-100 text-black text-lg flex flex-col text-end">{props.title}</div>
                </HoverCardTrigger>
                <HoverCardContent className="w-30 mt-0">
                    <div className="flex flex-col justify-between space-x-4">
                        {props.children}
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

export default Hoverable