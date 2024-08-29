import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface SearchResponse {
  searchs: {
    id: string
    cpf: string
    civilId: string
    email: string
    username: string
    courses: {
      id: string
      name: string
    }[]
    poles: {
      id: string
      name: string
    }[]
  }[]
  totalItems: number
  pages: number
}

export interface SearchProps {
  query: string
  page: string
}

export async function search({
  query,
  page,
}: SearchProps): Promise<SearchResponse> {
  const token = Cookies.get('token')

  const response = await api.get<SearchResponse>(`/users/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query,
      page,
    },
  })

  return {
    searchs: response.data.searchs,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
