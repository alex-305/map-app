import Icon from "@mdi/react"
import { mdiCheckBold, mdiPencilBoxOutline } from "@mdi/js"
import { Button } from "./ui/button"
import { submitPost } from "@/scripts/submitPost"
import { useRef } from "react"
import { LatLng } from "leaflet"

type NewPostProps = {
    posting:boolean
    setPosting:React.Dispatch<React.SetStateAction<boolean>>
}

function NewPost(props:NewPostProps) {

    const postTextAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const newNoteClicked = () => {
        props.setPosting(true)
        postTextAreaRef.current?.focus()
    }

    const submitClicked = () => {
        const postText:string = postTextAreaRef.current?.value as string
        if(postText!=="") {
            submitPost(postText)
        }
    }

    return (
            <div className="flex flex-col items-center mb-3 z-10">
        {props.posting ?
            (
            <>
                        <textarea
                        ref={postTextAreaRef}
                        className="resize-none w-5/6 h-full rounded text-black p-1 bg-white bg-opacity-90 shadow-lg"
                        ></textarea>
                        <Button 
                            variant={"outline"} 
                            size={"icon"} 
                            className="mt-5 
                            shadow-md 
                            hover:shadow-lg hover:bg-green-300
                            active:shadow-xl active:bg-green-400" 
                            onClick={submitClicked}>
                            <Icon path={mdiCheckBold} size={1}/>
                        </Button>
            </>
            )

        : 
        (
            <Button 
                className="shadow-md hover:shadow-lg
                active:shadow-xl"
                variant={"outline"} 
                size={"icon"} 
                onClick={newNoteClicked}>
                <Icon path={mdiPencilBoxOutline} size={1} className="m-0 p-0" />
            </Button>
        )}
            </div>
    )
}

export default NewPost

function setPosition(latlng: LatLng) {
    throw new Error("Function not implemented.")
}
