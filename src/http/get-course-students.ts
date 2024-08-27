import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

export interface GetCourseStudentsRequest {
  courseId: string
  poleId?: string
  username?: string
  cpf?: string
  page?: string
  isEnabled?: boolean
}

export interface GetCourseStudentsResponse {
  students: {
    id: string
    username: string
    email: string
    cpf: string
    createdAt: string
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

export interface GetCourseStudentsAxiosResponseByPole {
  students: {
    id: string
    username: string
    email: string
    cpf: string
    createdAt: string
    pole: {
      id: string
      name: string
    }
  }[]
  course: string
  courseId: string
  pages: number
  totalItems: number
}

export async function getCourseStudents({
  courseId,
  poleId,
  cpf,
  username,
  page,
  isEnabled,
}: GetCourseStudentsRequest): Promise<GetCourseStudentsResponse> {
  const token = Cookies.get('token')

  if (poleId && poleId !== 'all') {
    const response = await api.get<GetCourseStudentsAxiosResponseByPole>(
      `/courses/${courseId}/poles/${poleId}/students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          username: username ?? '',
          cpf: cpf ?? '',
          page,
          isEnabled: isEnabled ?? true,
        },
      },
    )

    return {
      students: response.data.students.map((student) => ({
        ...student,
        course: {
          id: response.data.courseId,
          name: response.data.course,
        },
      })),
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
      params: {
        username: username ?? '',
        cpf: cpf ?? '',
        page,
        isEnabled,
      },
    },
  )

  return {
    students: response.data.students,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
