import { Dispatch, SetStateAction, useEffect, useState } from "react"
import '../../css/colorslider.css'
import { HSLToHex } from "@/scripts/colorConversion"
import * as React from "react"

type HexColorPickerProps = {
    setSliderValue:Dispatch<SetStateAction<number>>
}

function HexColorPicker(props:HexColorPickerProps) {
    const [sliderValue, setSliderValue] = useState(180)

    useEffect(() => {
        props.setSliderValue(sliderValue)
    }, [sliderValue, props])

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseInt(e.target.value))
    }

    return (
        <>
            <input onChange={handleSliderChange} className="slider" type="range" value={sliderValue} min="0" max="360" />
        </>
    )
}

export default HexColorPicker