import { RegisterDialog } from "./RegisterDialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { post } from "@/scripts/http"
import { useForm } from "@inertiajs/react"

export default function LoginDropdown({ loggedIn, onLogin, onLogout }) {
    const { data, setData } = useForm({
        email: "",
        password: ""
    })

    async function login(e) {
        e.preventDefault()
        const { errors } = await post('/login', data)
        if (!errors)
            onLogin()
    }

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
                <form className="flex flex-col gap-4" onSubmit={login}>
                    <div className="flex flex-col gap-1">
                        <Input value={data.email} type="text" placeholder="Email" onChange={e => setData('email', e.target.value)} />
                        <Input value={data.password} type="password" placeholder="Password" onChange={e => setData('password', e.target.value)} />
                    </div>
                    <Button type="submit">Log in</Button>
                </form>
                <div className="flex flex-row">
                    <RegisterDialog />
                    <Button className="!text-zinc-400" variant="link">Forgot password?</Button>
                </div>
            </div>
        </>
    )
}
