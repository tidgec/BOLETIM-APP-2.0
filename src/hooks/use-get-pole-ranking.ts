import { useQuery } from '@tanstack/react-query'

import { getPoleRanking, GetPoleRankingRequest } from '@/http/get-pole-ranking'

export function useGetPoleRanking({
  courseId,
  poleId,
  page,
  hasBehavior,
}: GetPoleRankingRequest) {
  const expiresIn = 1000 * 60 * 60 // 1hr

  const query = useQuery({
    queryKey: ['pole-ranking', courseId, poleId, page, hasBehavior],
    queryFn: () => getPoleRanking({ courseId, poleId, page, hasBehavior }),
    staleTime: expiresIn,
    enabled: !!courseId,
  })

  return {
    ...query,
    ranking: query.data?.ranking,
    pages: query.data?.pages,
    totalItems: query.data?.totalItems,
  }
}
