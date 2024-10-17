import { useUserInfo } from "@/components/UserInfoContext"
import { toast } from "sonner"
import { post } from "./http"
import { ErrorToast, SuccessToast } from "./toast"
import { useContext } from "react"
import { LoginCreds, RegistrationCreds } from "@/types/Creds"

const useAuth = () => {
    const { setLoggedIn } = useUserInfo()

    const LoginUser = async(creds:LoginCreds, toastToast:boolean = true):Promise<boolean> => {
        const { error } = await post('/login', creds)
        if (!error) {
            setLoggedIn(true)
            if(toastToast) SuccessToast("Successfully logged in.")
            return true
        }
        else {
            ErrorToast(error.message ?? "Error unknown", error.status)
            return false
        }
    }

    const RegisterUser = async(info:RegistrationCreds, toastToast:boolean = true):Promise<boolean> => {
        const { data, error } = await post("/register", info)

        if (!error) {
            setLoggedIn(true)
            if (toastToast) SuccessToast("Successfully created account.")
            return true
        } else {
            ErrorToast(error.message ?? "Error unknown", error.status)
            return false
        }

    }

    const LogoutUser = async(toastToast:boolean = true) => {
        const { error } = await post('/logout')

        if (!error) {
            setLoggedIn(false)
            if (toastToast) SuccessToast("Successfully logged out.")
            return true
        }
        else {
            ErrorToast(error.message, error.status)
            return false
        }
    }

    return { LoginUser, RegisterUser, LogoutUser }
}

export default useAuth