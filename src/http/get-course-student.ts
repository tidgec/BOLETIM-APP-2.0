import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetCourseStudentRequest {
  courseId: string
  studentId: string
}

export interface GetCourseStudentResponse {
  student: {
    id: string
    username: string
    email: string
    cpf: string
    createdAt: string
    course: {
      id: string
      name: string
      formula: string
    }
    pole: {
      id: string
      name: string
    }
  }
}

export async function getCourseStudent({
  courseId,
  studentId,
}: GetCourseStudentRequest): Promise<GetCourseStudentResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetCourseStudentResponse>(
    `/courses/${courseId}/students/${studentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    student: response.data.student,
  }
}
