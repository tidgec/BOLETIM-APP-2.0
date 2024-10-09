import { isAxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import LogoBoletim from '@/assets/dgec.png'
import { useDecode } from '@/auth'
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

      <footer className="gap-2 bg-pmpa-blue-700 py-8 text-white">
        <div className="flex gap-4 px-6">
          <img src={LogoBoletim} alt="" className="flex h-28 w-auto" />
          <div>
            <span className="text-lg font-bold">Endereço:</span>
            <p className="w-full max-w-80">
              Rod. Augusto Montenegro, Km 9, n° 8401, Bairro Parque
              Guajará/Dist. de Icoaraci – Belém/PA. CEP: 66821-000.
            </p>
          </div>

          <div>
            <span className="text-lg font-bold">Contato:</span>
            <p>ti.dgecpmpa@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-bold">
            Desenvolvido Pela Subseção de Tecnologia Educacional.
          </p>
          <p className="text-xl font-bold">
            Polícia Militar do Pará © 2022 | Todos os Direitos Reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
