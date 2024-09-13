import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetPolesResponse {
  poles: {
    id: string
    name: string
  }[]
}

export async function getPoles() {
  const token = Cookies.get('token')

  const response = await api.get<GetPolesResponse>('/poles', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    poles: response.data.poles,
  }
}
