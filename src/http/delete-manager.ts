import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DeleteManagerProps {
  id: string
}

export async function deleteManager({ id }: DeleteManagerProps) {
  const token = Cookies.get('token')

  await api.delete(`/managers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
