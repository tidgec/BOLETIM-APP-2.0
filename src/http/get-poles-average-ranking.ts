import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetPolesAverageRankingRequest {
  courseId: string
}

interface GetPolesAverageRankingResponse {
  studentsAverageGroupedByPole: {
    poleAverage: {
      poleId: string
      name: string
      average: number
    }
  }[]
}

export async function getPolesAverageRanking({
  courseId,
}: GetPolesAverageRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const response = await api.get<GetPolesAverageRankingResponse>(
    `/courses/${courseId}/classification/average`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    ranking: response.data.studentsAverageGroupedByPole,
  }
}
