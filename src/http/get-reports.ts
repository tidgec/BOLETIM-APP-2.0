import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetReportsRequest {
  page?: string
  action?: string
}

interface GetReportsResponse {
  reports: {
    id: string
    title: string
    content: string
    ip: string
    createdAt: string
    fileLink?: string
    fileName?: string
  }[]

  totalItems: number
  pages: number
}

export async function getReports({
  action,
  page,
}: GetReportsRequest): Promise<GetReportsResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetReportsResponse>('/reports', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      action: action === 'all' ? undefined : action,
      page,
    },
  })

  return {
    reports: response.data.reports,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
