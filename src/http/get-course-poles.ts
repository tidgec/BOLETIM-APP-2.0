import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetCoursePolesRequest {
  courseId: string
}

export interface GetCoursePolesResponse {
  poles: {
    id: string
    name: string
  }[]
}

export async function getCoursePoles({
  courseId,
}: GetCoursePolesRequest): Promise<GetCoursePolesResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetCoursePolesResponse>(
    `/courses/${courseId}/poles`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    poles: response.data.poles,
  }
}
