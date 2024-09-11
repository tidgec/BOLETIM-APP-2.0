import { useQuery } from '@tanstack/react-query'

import {
  getPolesAverageRanking,
  GetPolesAverageRankingRequest,
} from '@/http/get-poles-average-ranking'

export function useGetPolesAverageRanking({
  courseId,
  page,
}: GetPolesAverageRankingRequest) {
  const query = useQuery({
    queryKey: ['poles-assessment-ranking', courseId, page],
    queryFn: () => getPolesAverageRanking({ courseId, page }),
  })

  return {
    ...query,
    ranking: query.data?.ranking,
  }
}
