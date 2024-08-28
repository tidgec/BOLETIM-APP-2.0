import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

export interface GetAdminsRequest {
  username?: string
  cpf?: string
  page?: string
}

export interface GetAdminsAxiosResponse {
  administrators: {
    id: string
    username: string
    email: string
    cpf: string
    createdAt: string
  }[]
  pages: number
  totalItems: number
}

export interface GetAdminsResponse {
  admins: {
    id: string
    username: string
    email: string
    cpf: string
    createdAt: string
  }[]
  pages: number
  totalItems: number
}

export async function getAdmins({
  cpf,
  username,
  page,
}: GetAdminsRequest): Promise<GetAdminsResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetAdminsAxiosResponse>(`/administrators`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      username,
      cpf,
      page,
    },
  })

  return {
    admins: response.data.administrators,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
