import { useQuery } from '@tanstack/react-query'

import { getPoleRanking, GetPoleRankingRequest } from '@/http/get-pole-ranking'

export function useGetPoleRanking({
  courseId,
  poleId,
  page,
  hasBehavior,
}: GetPoleRankingRequest) {
  const query = useQuery({
    queryKey: ['pole-ranking', courseId, poleId, page, hasBehavior],
    queryFn: () => getPoleRanking({ courseId, poleId, page, hasBehavior }),
  })

  return {
    ...query,
    ranking: query.data?.ranking,
  }
}
