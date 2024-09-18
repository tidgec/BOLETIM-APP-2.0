import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

interface UpdateProfileRequest {
  username?: string
  email?: string
  password?: string
  birthday?: string
  civilId?: string
  militaryId?: string
  fatherName?: string
  motherName?: string
  state?: string
  county?: string
}

export async function updateProfile({
  username,
  email,
  password,
  birthday,
  civilId,
  militaryId,
  fatherName,
  motherName,
  state,
  county,
}: UpdateProfileRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'dev') {
    return await api.patch(
      '/developers',
      {
        username,
        email,
        password,
        birthday,
        civilId,
        militaryId,
        fatherName,
        motherName,
        state,
        county,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }

  if (payload.role === 'admin') {
    return await api.patch(
      '/administrators',
      {
        username,
        email,
        password,
        birthday,
        civilId,
        militaryId,
        fatherName,
        motherName,
        state,
        county,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }

  if (payload.role === 'manager') {
    return await api.patch(
      '/managers',
      {
        username,
        email,
        password,
        birthday,
        civilId,
        militaryId,
        fatherName,
        motherName,
        state,
        county,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }

  await api.patch(
    '/students',
    {
      username,
      email,
      password,
      birthday,
      civilId,
      militaryId,
      fatherName,
      motherName,
      state,
      county,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
