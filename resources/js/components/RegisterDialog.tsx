import { useForm } from '@inertiajs/react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Input } from './ui/input'
import { post } from '@/scripts/http'

export function RegisterDialog() {
  const { data, setData } = useForm({
    name: "",
    email: "",
    password: ""
  })

  async function submit(e) {
    e.preventDefault()
    const { data: res, errors } = await post("/register", data)

    if (!errors) {
      console.log("Success")
    }
  }

  return (
    <>
      <div>
         <Dialog>
          <DialogTrigger asChild>
            <Button variant='link'>Register</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div>
                <DialogTitle>Register</DialogTitle>
                <DialogDescription>Make a new account today!</DialogDescription>
              </div>
            </DialogHeader>
            <form className='flex flex-col' onSubmit={submit}>
              <Input type="text" placeholder="Username" value={data.name} onChange={e => setData('name', e.target.value)}/>
              <Input type="email" placeholder="Email" value={data.email} onChange={e => setData('email', e.target.value)}/>
              <Input type="password" placeholder="Password" value={data.password} onChange={e => setData('password', e.target.value)}/>
              <Button type="submit" variant='outline'>Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
