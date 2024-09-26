import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetCourseManagersRequest {
  courseId: string
  poleId?: string
  username?: string
  cpf?: string
  page?: string
  isEnabled?: boolean
}

export interface GetCourseManagersResponse {
  managers: {
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

export interface GetCourseManagersAxiosResponseByPole {
  managers: {
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

export async function getCourseManagers({
  courseId,
  poleId,
  cpf,
  username,
  page,
  isEnabled,
}: GetCourseManagersRequest): Promise<GetCourseManagersResponse> {
  const token = Cookies.get('token')

  if (poleId && poleId !== 'all') {
    const response = await api.get<GetCourseManagersAxiosResponseByPole>(
      `/courses/${courseId}/poles/${poleId}/managers`,
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
      managers: response.data.managers.map((manager) => ({
        ...manager,
        course: {
          id: response.data.courseId,
          name: response.data.course,
        },
      })),
      pages: response.data.pages,
      totalItems: response.data.totalItems,
    }
  }

  const response = await api.get<GetCourseManagersResponse>(
    `/courses/${courseId}/managers`,
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
    managers: response.data.managers,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
