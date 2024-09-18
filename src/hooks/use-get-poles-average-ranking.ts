import { useQuery } from '@tanstack/react-query'

import {
  getPolesAverageRanking,
  GetPolesAverageRankingRequest,
} from '@/http/get-poles-average-ranking'

export function useGetPolesAverageRanking({
  courseId,
}: GetPolesAverageRankingRequest) {
  const query = useQuery({
    queryKey: ['poles-average-ranking', courseId],
    queryFn: () => getPolesAverageRanking({ courseId }),
  })

  return {
    ...query,
    ranking: query.data?.ranking,
  }
}
