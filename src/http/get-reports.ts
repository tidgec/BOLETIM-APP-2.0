import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetReportsRequest {
  page?: string
  username?: string
  action?: string
}

interface GetReportsResponse {
  reports: {
    id: string
    title: string
    content: string
    ip: string
    createdAt: string
    filelink?: string
    filename?: string
  }[]

  totalItems: number
  pages: number
}

export async function getReports({
  action,
  username,
  page,
}: GetReportsRequest): Promise<GetReportsResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetReportsResponse>('/reports', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      action: action === 'all' ? undefined : action,
      username: username ?? '',
      page,
    },
  })

  return {
    reports: response.data.reports,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
