import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetPolesAverageRankingRequest {
  courseId: string
  page: string
}

interface GetPolesAverageRankingResponse {
  assessmentAverageGroupedByPole: {
    assessmentAverageByPole: {
      poleId: string
      name: string
      average: number
      studentAverageStatus: {
        concept:
          | 'excellent'
          | 'very good'
          | 'good'
          | 'regular'
          | 'insufficient'
          | 'no income'
        status:
          | 'approved'
          | 'disapproved'
          | 'approved second season'
          | 'disapproved second season'
          | 'second season'
      }
    }
  }[]
}

export async function getPolesAverageRanking({
  courseId,
  page,
}: GetPolesAverageRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const response = await api.get<GetPolesAverageRankingResponse>(
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
    ranking: response.data.assessmentAverageGroupedByPole,
  }
}
