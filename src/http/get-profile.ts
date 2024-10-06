import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'

export interface GetProfileAxiosResponse {
  id: string
  cpf: string
  email: string
  civilId?: string
  username: string
  avatarUrl: string | null
  role: string
  birthday: Date
  profile?: {
    militaryId?: string
    fatherName?: string
    motherName?: string
    state?: string
    county?: string
  }
  courses?: {
    studentCourseId: string
    id: string
    name: string
    startAt: string
    imageUrl: string
  }[]
  poles?: {
    studentPoleId: string
    id: string
    name: string
  }[]
}

export interface GetProfileResponse {
  id: string
  cpf: string
  email: string
  civilId?: string
  militaryId?: string
  fatherName?: string
  motherName?: string
  state?: string
  county?: string
  username: string
  avatarUrl: string | null
  role: string
  birthday: Date
  courses?: {
    studentCourseId: string
    id: string
    name: string
    startAt: string
    imageUrl: string
  }[]
  poles?: {
    studentPoleId: string
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
    const response = await api.get<GetProfileAxiosResponse>(
      '/managers/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return {
      ...response.data,
      militaryId: response.data.profile?.militaryId,
      state: response.data.profile?.state,
      county: response.data.profile?.county,
      fatherName: response.data.profile?.fatherName,
      motherName: response.data.profile?.motherName,
    }
  }

  const response = await api.get('/students/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return {
    ...response.data,
    militaryId: response.data.profile?.militaryId,
    state: response.data.profile?.state,
    county: response.data.profile?.county,
    fatherName: response.data.profile?.fatherName,
    motherName: response.data.profile?.motherName,
  }
}
