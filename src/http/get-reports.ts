import { api } from "@/lib/axios";
import Cookies from "js-cookie";

interface GetReportsResponse {
  id: string
  title: string
  content: string
  ip: string
  createdAt: string
  fileLink?: string
  fileName?: string
}

interface GetReportsAxiosResponse {
  reports: {
    id: string
    title: string
    content: string
    ip: string
    createdAt: string
    fileLink?: string
    fileName?: string
  }[]
}

export async function getReports(): Promise<GetReportsResponse[]> {
  const token = Cookies.get('token')

  const response = await api.get<GetReportsAxiosResponse>('/reports', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data.reports
}