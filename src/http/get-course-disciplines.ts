import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetCourseDisciplinesRequest {
  courseId: string
}

export interface GetCourseDisciplinesResponse {
  disciplines: {
    disciplineId: string
    courseId: string
    module: number
    name: string
  }[]
}

export async function getCourseDisciplines({
  courseId,
}: GetCourseDisciplinesRequest): Promise<GetCourseDisciplinesResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetCourseDisciplinesResponse>(
    `/courses/${courseId}/disciplines`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    disciplines: response.data.disciplines,
  }
}
