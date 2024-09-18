import { useQuery } from '@tanstack/react-query'

import { getAverageBehaviorPolesRanking } from '@/http/get-average-behavior-poles-ranking'
import { GetPolesAverageRankingRequest } from '@/http/get-poles-average-ranking'

export function useGetAverageBehaviorPolesRanking({
  courseId,
}: GetPolesAverageRankingRequest) {
  const expiresIn = 1000 * 60 * 60 // 1hr

  const query = useQuery({
    queryKey: ['average-behavior-poles-ranking', courseId],
    queryFn: () => getAverageBehaviorPolesRanking({ courseId }),
    staleTime: expiresIn,
  })

  return {
    ...query,
    ranking: query.data?.ranking,
  }
}
