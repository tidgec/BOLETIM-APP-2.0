import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isLogged={false} />
      <div className="w-full flex-1 bg-slate-100 px-2">
        <Outlet />
      </div>
    </div>
  )
}
