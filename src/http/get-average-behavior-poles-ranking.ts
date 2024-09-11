import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetAverageBehaviorPolesRankingRequest {
  courseId: string
  page: string
}

interface GetAverageBehaviorPolesRankingResponse {
  behaviorAverageGroupedByPole: {
    behaviorAverageByPole: {
      poleId: string
      name: string
      average: number
      behaviorAverageStatus: {
        behaviorAverage: number
        status: 'disapproved' | 'approved'
      }
    }
  }[]
}

export async function getAverageBehaviorPolesRanking({
  courseId,
  page,
}: GetAverageBehaviorPolesRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const response = await api.get<GetAverageBehaviorPolesRankingResponse>(
    `/courses/${courseId}/classification/behaviors`,
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
    ranking: response.data.behaviorAverageGroupedByPole,
  }
}
