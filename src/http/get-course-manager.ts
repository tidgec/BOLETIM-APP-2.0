import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetCourseManagerRequest {
  courseId: string
  managerId: string
}

export interface GetCourseManagerResponse {
  manager: {
    id: string
    username: string
    email: string
    cpf: string
    createdAt: string
    birthday: string
    civilId: string
    militaryId: string
    fatherName: string
    motherName: string
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

export async function getCourseManager({
  courseId,
  managerId,
}: GetCourseManagerRequest): Promise<GetCourseManagerResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetCourseManagerResponse>(
    `/courses/${courseId}/managers/${managerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    manager: response.data.manager,
  }
}
