import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

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
    civilId: string
    createdAt: string
    birthday?: string
    militaryId?: string
    fatherName?: string
    motherName?: string
    state?: string
    county?: string
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
  cpf,
  username,
  page,
  isEnabled,
}: GetCourseStudentsRequest): Promise<GetCourseStudentsResponse> {
  const token = Cookies.get('token')

  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.get<GetCourseStudentsResponse>(
      `/courses/${courseId}/poles/${poleId}/manager/students`,
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
      students: response.data.students,
      pages: response.data.pages,
      totalItems: response.data.totalItems,
    }
  }

  if (poleId && poleId !== 'all') {
    const response = await api.get<GetCourseStudentsResponse>(
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
