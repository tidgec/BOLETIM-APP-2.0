import { useQuery } from '@tanstack/react-query'

import { getAverageBehaviorPolesRanking } from '@/http/get-average-behavior-poles-ranking'
import { GetPolesAverageRankingRequest } from '@/http/get-poles-average-ranking'

export function useGetAverageBehaviorPolesRanking({
  courseId,
}: GetPolesAverageRankingRequest) {
  const query = useQuery({
    queryKey: ['average-behavior-poles-ranking', courseId],
    queryFn: () => getAverageBehaviorPolesRanking({ courseId }),
    staleTime: Infinity,
  })

  return {
    ...query,
    ranking: query.data?.ranking,
  }
}
