import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

export interface GetAssessmentRankingRequest {
  courseId?: string
  page?: string
}

interface GetAssessmentRankingResponse {
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

export async function getAssessmentRanking({
  courseId,
  page,
}: GetAssessmentRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.get<GetAssessmentRankingResponse>(
      `/courses/${courseId}/manager/classification/assessments`,
      {
        params: {
          page,
          hasBehavior: 'true',
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

  const response = await api.get<GetAssessmentRankingResponse>(
    `/courses/${courseId}/classification/assessments`,
    {
      params: {
        page,
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
