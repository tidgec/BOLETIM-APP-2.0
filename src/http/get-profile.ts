import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'

export interface GetProfileResponse {
  id: string
  cpf: string
  email: string
  civilId: string
  username: string
  avatarUrl: string | null
  role: string
  birthday: Date
  courses?: {
    id: string
    name: string
    startAt: string
    imageUrl: string
  }[]
  poles?: {
    id: string
    name: string
  }[]
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

  if (payload.role === 'manager') {
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
