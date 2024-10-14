import { useState } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

const feedOptions = ["Trending", "Following", "Latest"]

export default function FeedDropdown() {
  const [feed, setFeed] = useState("Trending")

  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button className='rounded-none' variant="ghost">Feeds</Button>
        </PopoverTrigger>
        <PopoverContent className="ml-4 w-32">
            <RadioGroup
                onValueChange={v => setFeed(v)}
                defaultValue={feedOptions[0]}
            >
                {feedOptions.map((f, i) => {
                    return (
                        <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem value={f} id={f} />
                            <Label htmlFor={f}>{f}</Label>
                        </div>
                    )
                })}
            </RadioGroup>
        </PopoverContent>
    </Popover>
  )  
}
