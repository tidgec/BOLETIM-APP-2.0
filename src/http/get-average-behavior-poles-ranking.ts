import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetAverageBehaviorPolesRankingRequest {
  courseId: string
}

interface GetAverageBehaviorPolesRankingResponse {
  behaviorAverageGroupedByPole: {
    poleAverage: {
      poleId: string
      name: string
      average: number | null
    }
  }[]
}

export async function getAverageBehaviorPolesRanking({
  courseId,
}: GetAverageBehaviorPolesRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const response = await api.get<GetAverageBehaviorPolesRankingResponse>(
    `/courses/${courseId}/classification/behaviors`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    ranking: response.data.behaviorAverageGroupedByPole,
  }
}
