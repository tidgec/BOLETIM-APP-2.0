import { useQuery } from '@tanstack/react-query'

import { getSubRanking, GetSubRankingRequest } from '@/http/get-sub-ranking'

export function useGetSubRanking({
  courseId,
  page,
  disciplineModule,
}: GetSubRankingRequest) {
  const expiresIn = 1000 * 60 * 60 // 1hr

  const query = useQuery({
    queryKey: ['sub-ranking', courseId, page, disciplineModule],
    queryFn: () => getSubRanking({ courseId, page, disciplineModule }),
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
