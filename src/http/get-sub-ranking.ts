import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

export interface GetSubRankingRequest {
  courseId?: string
  page?: string
  disciplineModule: number
  hasBehavior?: string
}

interface GetSubRankingResponse {
  classifications: {
    id: string
    courseId: string
    studentId: string
    poleId: string
    average: number
    concept:
      | 'excellent'
      | 'very good'
      | 'good'
      | 'regular'
      | 'insufficient'
      | 'no income'
    assessmentsCount: number
    status:
      | 'approved'
      | 'disapproved'
      | 'approved second season'
      | 'disapproved second season'
      | 'second season'

    behaviorsCount: number
  }[]
  students: {
    id: string
    username: string
    civilId: string
    birthday: string
    militaryId: string
    pole: {
      name: string
    }
  }[]
  pages?: number
  totalItems?: number
}

export async function getSubRanking({
  courseId,
  page,
  disciplineModule,
  hasBehavior,
}: GetSubRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.get<GetSubRankingResponse>(
      `/courses/${courseId}/manager/sub`,
      {
        params: {
          page,
          hasBehavior,
          disciplineModule,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return {
      ranking: response.data.classifications,
      students: response.data.students,
    }
  }

  const response = await api.get<GetSubRankingResponse>(
    `/courses/${courseId}/classification/sub`,
    {
      params: {
        page,
        hasBehavior,
        disciplineModule,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    ranking: response.data.classifications,
    students: response.data.students,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
