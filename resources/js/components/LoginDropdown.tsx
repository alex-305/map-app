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

    async function login(e: HTMLFormElement) {
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
                <div>
                    <form onSubmit={login}>
                        <Input value={data.email} placeholder="Email" onChange={e => setData('email', e.target.value)} />
                        <Input value={data.password} placeholder="Password" onChange={e => setData('password', e.target.value)} />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
                <RegisterDialog className="p-0 my-1" />
            </div>
        </>
    )
}
