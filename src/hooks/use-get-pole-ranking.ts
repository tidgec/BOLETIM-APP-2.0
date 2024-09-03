import { useQuery } from '@tanstack/react-query'

import { getPoleRanking, GetPoleRankingRequest } from '@/http/get-pole-ranking'

export function useGetPoleRanking({
  courseId,
  poleId,
  page,
}: GetPoleRankingRequest) {
  const query = useQuery({
    queryKey: ['pole-ranking', courseId, page],
    queryFn: () => getPoleRanking({ courseId, poleId, page }),
  })

  return {
    ...query,
    ranking: query.data?.ranking,
  }
}
