import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateDisciplineRequest {
  id: string
  name: string
}

export async function updateDiscipline({ id, name }: UpdateDisciplineRequest) {
  const token = Cookies.get('token')

  await api.put(
    `/disciplines/${id}`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
