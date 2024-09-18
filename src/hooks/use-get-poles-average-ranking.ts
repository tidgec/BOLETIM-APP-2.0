import { useQuery } from '@tanstack/react-query'

import {
  getPolesAverageRanking,
  GetPolesAverageRankingRequest,
} from '@/http/get-poles-average-ranking'

export function useGetPolesAverageRanking({
  courseId,
}: GetPolesAverageRankingRequest) {
  const expiresIn = 1000 * 60 * 60 // 1hr

  const query = useQuery({
    queryKey: ['poles-average-ranking', courseId],
    queryFn: () => getPolesAverageRanking({ courseId }),
    staleTime: expiresIn,
  })

  return {
    ...query,
    ranking: query.data?.ranking,
  }
}
