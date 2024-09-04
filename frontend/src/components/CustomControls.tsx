import L from "leaflet"
import { ReactNode, useEffect, useRef } from "react"

type CustomControlProps = {
    children:ReactNode
    xPosition:string
    yPosition:string
    className:string
}

function CustomControls(props:CustomControlProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(ref.current) {
            L.DomEvent.disableClickPropagation(ref.current)
        }
    })

    return (
        <div className={'leaflet-' +props.yPosition + ' leaflet-'+props.xPosition}>
            <div className={props.className}>
                <div ref={ref} 
                className="leaflet-control  ">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default CustomControls