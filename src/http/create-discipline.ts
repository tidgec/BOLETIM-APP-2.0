import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateDisciplineRequest {
  name: string
}

export async function createDiscipline({ name }: CreateDisciplineRequest) {
  const token = Cookies.get('token')

  await api.post(
    `/disciplines`,
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
