import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DeleteAdminProps {
  id: string
}

export async function deleteAdmin({ id }: DeleteAdminProps) {
  const token = Cookies.get('token')

  await api.delete(`/administrators/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
