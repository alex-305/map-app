import Icon from "@mdi/react"
import { mdiEmoticon, mdiPencilBoxOutline, mdiSend } from "@mdi/js"
import { Button } from "./ui/button"
import { submitPost } from "@/scripts/submitPost"
import { useRef, useState } from "react"
import { Popover, PopoverContent } from "./ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"

function NewPost() {

    const [open, setOpen] = useState(false)

    const postTextAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const submitClicked = () => {
        const postText:string = postTextAreaRef.current?.value as string
        if(postText!=="") {
            submitPost(postText)
        }
    }

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                {<PopoverTrigger asChild className="cursor-pointer">
                    <Icon 
                        path={mdiPencilBoxOutline} 
                        size={2} 
                        className="m-0 p-0 bg-white rounded-md" />
                </PopoverTrigger>}
                <PopoverContent className="w-[500px] h-[200px] p-0 mr-5">
                    <div className="flex flex-row h-full">
                        <textarea
                        ref={postTextAreaRef}
                        className="resize-none 
                        flex-grow h-full
                        rounded text-black p-1 
                        bg-white bg-opacity-80 shadow-lg text-xl"
                        />
                        <div className="flex flex-col space-y-1 mt-auto mx-2 mb-1">
                            <Button
                            variant={"outline"}
                            size={"icon"}
                            className="shadow-md hover:shadow-lg active:shadow-xl"
                            onClick={submitClicked}>
                                <Icon path={mdiEmoticon} size={1}/>
                            </Button>
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                className="shadow-md hover:shadow-lg active:shadow-xl"
                                onClick={submitClicked}>
                                <Icon path={mdiSend} size={1}/>
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default NewPost
