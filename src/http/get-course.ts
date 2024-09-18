import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetCourseRequest {
  courseId: string
}

interface GetCourseResponse {
  course: {
    id: string
    name: string
    imageUrl: string
  }
}

export async function getCourse({ courseId }: GetCourseRequest) {
  const token = Cookies.get('token')

  const response = await api.get<GetCourseResponse>(`/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    course: response.data.course,
  }
}
