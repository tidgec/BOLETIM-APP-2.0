import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '../../components/header'
import { Menu } from '@/components/menu'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useDecode } from '@/auth'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token')

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.message

          if (status === 401 && code === 'Unathourized.') {
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      },
    )

    if (!token) {
      navigate('/sign-in', {
        replace: true,
      })
    }

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  const decoded = useDecode()
  return (
    <div className="h-full min-h-screen">
      <Header isLogged />
      <div className="relative flex h-[48.5rem] w-full bg-slate-100 md:h-[55rem]">
        <Menu role={decoded?.user.role} />
        <div className="w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
