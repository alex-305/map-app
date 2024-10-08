import { useState } from "react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

type feedOptions = "Trending" | "Following" | "Latest"    

export default function FeedDropdown() {
  const [feed, setFeed] = useState<feedOptions>("Trending")

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="link">Feeds</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-4 w-56">
            <DropdownMenuRadioGroup value={feed} onValueChange={e => setFeed(e as feedOptions)} >
                <DropdownMenuRadioItem value="Trending">Trending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Following">Following</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Latest">Latest</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )  
}
