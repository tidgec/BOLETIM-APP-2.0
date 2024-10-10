import { isAxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useDecode } from '@/auth'
import { Footer } from '@/components/footer'
import { Menu } from '@/components/menu'
import { api } from '@/lib/axios'

import { Header } from '../../components/header'

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
            Cookies.remove('token')

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
    <div className="flex min-h-screen flex-col">
      <Header isLogged />
      <div className="relative flex w-full flex-1 bg-slate-100">
        <Menu role={decoded?.user.role} />
        <div className="w-full px-4 print:px-0">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  )
}
