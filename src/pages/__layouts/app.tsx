import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '../../components/header'
import { Menu } from '@/components/menu'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useDecode } from '@/auth'

export function AppLayout() {
  // const navigate = useNavigate()

  // useEffect(() => {
  //   const token = Cookies.get('token')

  //   if (!token) {
  //     navigate('/sign-in', {
  //       replace: true,
  //     })
  //   }
  // }, [navigate])

  // const decoded = useDecode()
  return (
    <div className="h-full min-h-screen">
      <Header isLogged />
      <div className="relative flex h-[48.5rem] w-full bg-slate-100 md:h-[55rem]">
        <Menu role={'dev'} />
        <div className="w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
