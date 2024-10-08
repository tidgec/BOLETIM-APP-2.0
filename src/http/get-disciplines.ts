import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetDisciplinesRequest {
  page?: string
}

export interface GetDisciplinesResponse {
  disciplines: {
    id: string
    name: string
  }[]

  totalItems?: number
  pages?: number
}

export async function getDisciplines({ page }: GetDisciplinesRequest) {
  const token = Cookies.get('token')

  const response = await api.get<GetDisciplinesResponse>('/disciplines', {
    headers: {
      Authorization: `Bearer ${token}`,
    },

    params: {
      page,
    },
  })

  return {
    disciplines: response.data.disciplines,
    totalItems: response.data.totalItems,
    pages: response.data.pages,
  }
}
