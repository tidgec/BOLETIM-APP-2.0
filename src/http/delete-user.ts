import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DeleteUserProps {
  id: string
  role: string
}

export async function deleteUser({ id, role }: DeleteUserProps) {
  const token = Cookies.get('token')

  if (role === 'ADMIN') {
    return await api.delete(`/administrators/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  if (role === 'MANAGER') {
    return await api.delete(`/managers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  await api.delete(`/students/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
