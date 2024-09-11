import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DeleteDisciplineRequest {
  id: string
}

export async function deleteDiscipline({ id }: DeleteDisciplineRequest) {
  const token = Cookies.get('token')

  await api.delete(`/disciplines/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
