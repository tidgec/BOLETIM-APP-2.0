import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

interface UpdateProfileAvatarRequest {
  file: File
}

export async function updateProfileAvatar({
  file,
}: UpdateProfileAvatarRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  const uploadFormData = new FormData()
  uploadFormData.set('avatar', file)

  if (payload.role === 'dev') {
    return await api.patch('/developers/avatar', uploadFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  if (payload.role === 'admin') {
    return await api.patch('/administrators/avatar', uploadFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  if (payload.role === 'manager') {
    return await api.patch('/managers/avatar', uploadFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return await api.patch('/students/avatar', uploadFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
