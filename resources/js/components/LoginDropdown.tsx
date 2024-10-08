import LoginForm from "./LoginForm"
import { RegisterDialog } from "./RegisterDialog"
import { Button } from "./ui/button"
import { post } from "@/scripts/http"

export default function LoginDropdown({ loggedIn, onLogin, onLogout }) {
    async function logout() {
        const { errors } = await post('/logout')
        if (!errors)
            onLogout()
    }

    return loggedIn ? (
        <>
            <Button onClick={logout}>Logout</Button>
        </>
    ) : (
        <>
            <div className="flex flex-col">
                <LoginForm onLogin={onLogin} />
                <div className="flex flex-row">
                    <RegisterDialog />
                    <Button className="!text-zinc-400" variant="link">Forgot password?</Button>
                </div>
            </div>
        </>
    )
}
