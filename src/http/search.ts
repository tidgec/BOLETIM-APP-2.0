import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

interface SearchResponse {
  searchs: {
    id: string
    cpf: string
    civilId: string
    email: string
    username: string
    courses: {
      userOnCourseId: string
      id: string
      name: string
    }[]
    poles: {
      userCourseOnPoleId: string
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
  if (!token) throw new Error('Não autorizado!')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.get<SearchResponse>(`manager/students/search`, {
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
