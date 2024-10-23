import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetSubPoleRankingRequest {
  courseId?: string
  poleId: string
  page?: string
  hasBehavior?: string
  disciplineModule: number
}

interface GetSubPoleRankingResponse {
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

export async function getSubPoleRanking({
  courseId,
  poleId,
  page,
  hasBehavior,
  disciplineModule,
}: GetSubPoleRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const response = await api.get<GetSubPoleRankingResponse>(
    `/courses/${courseId}/poles/${poleId}/classification/sub`,
    {
      params: {
        page,
        hasBehavior: hasBehavior ?? 'true',
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
