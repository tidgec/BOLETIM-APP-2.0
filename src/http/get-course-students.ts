import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

export interface GetCourseStudentsRequest {
  courseId: string
  poleId?: string
}

export interface GetCourseStudentsResponse {
  students: {
    id: string
    username: string
    course: {
      id: string
      name: string
    }
    pole: {
      id: string
      name: string
    }
  }[]
  pages: number
  totalItems: number
}

export async function getCourseStudents({
  courseId,
  poleId,
}: GetCourseStudentsRequest): Promise<GetCourseStudentsResponse> {
  const token = Cookies.get('token')

  if (poleId) {
    const response = await api.get<GetCourseStudentsResponse>(
      `/courses/${courseId}/poles/${poleId}/students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return {
      students: response.data.students,
      pages: response.data.pages,
      totalItems: response.data.totalItems,
    }
  }

  const response = await api.get<GetCourseStudentsResponse>(
    `/courses/${courseId}/students`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    students: response.data.students,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
