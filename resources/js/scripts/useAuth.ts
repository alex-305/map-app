import { useUserInfo } from "@/components/UserInfoContext"
import { toast } from "sonner"
import { post } from "./http"
import { ErrorToast, SuccessToast } from "./toast"
import { useContext } from "react"
import { LoginCreds, RegistrationCreds } from "@/types/Creds"
import { verify } from "crypto"

const useAuth = () => {
    const { setLoggedIn, user } = useUserInfo()

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

    const ForgotPassword = async(email: string, toastToast: boolean = true): Promise<boolean> => {
        const {error} = await post("/forgot-password", { email })
        
        if(!error) {
            if(toastToast) SuccessToast("Password reset link has been sent to your email!")
            return true
        }else{
            ErrorToast(error.message ?? "Error", error.status)
            return false
        }
    }

    const VerifyPassword = async(password: string, toastToast: boolean = true): Promise<boolean> => {
        const { error } = await post("/verify-password", { password })

        if (!error) {
            if (toastToast) SuccessToast("Password verified successfully.")
            return true
        } else {
            ErrorToast(error.message ?? "Error", error.status)
            return false
        }
    }

    const UpdateUsername = async(username: string, toastToast: boolean = true): Promise<boolean> => {
        const { error } = await post(`/users/${user}/update-username`, { username })
        console.log(error)

        if (!error) {
            if (toastToast) SuccessToast("Username updated successfully.")
            return true
        } else {
            ErrorToast(error.message ?? "Error", error.status)
            return false
        }
    }

    const UpdateEmail = async(email: string, toastToast: boolean = true): Promise<boolean> => {
        const { error } = await post(`/users/${user}/update-email`, { email })

        if (!error) {
            if (toastToast) SuccessToast("Email updated successfully.")
            return true
        } else {
            ErrorToast(error.message ?? "Error", error.status)
            return false
        }
    }

    const UpdatePassword = async(password: string, password_confirmation: string, toastToast: boolean = true): Promise<boolean> => {
        const { error } = await post(`/users/${user}/update-password`, { password, password_confirmation })

        if (!error) {
            if (toastToast) SuccessToast("Password updated successfully.")
            return true
        } else {
            ErrorToast(error.message ?? "Error", error.status)
            return false
        }
    }

    return { LoginUser, RegisterUser, LogoutUser, ForgotPassword, VerifyPassword, UpdateUsername, UpdateEmail, UpdatePassword }
}

export default useAuth