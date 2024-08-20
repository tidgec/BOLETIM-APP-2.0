import { api } from '@/lib/axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface GetProfileResponse {
  cpf: string
  email: string
  civilId: string
  username: string
  avatarUrl: string | null
  role: string
  birthday: Date
  courses?: []
  poles?: []
}

export async function getProfile(): Promise<GetProfileResponse> {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const {
    payload,
  }: {
    payload: {
      sub: string
      role: string
    }
  } = jwtDecode(token)

  if (payload.role === 'dev') {
    const response = await api.get('/developers/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.developer
  }

  if (payload.role === 'admin') {
    const response = await api.get('/administrators/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.administrator
  }

  if (payload.role === 'dev') {
    const response = await api.get('/managers/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.manager
  }

  const response = await api.get('/students/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.student
}
