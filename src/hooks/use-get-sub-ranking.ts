import { useQuery } from '@tanstack/react-query'

import { getSubRanking, GetSubRankingRequest } from '@/http/get-sub-ranking'

export function useGetSubRanking({
  courseId,
  page,
  disciplineModule,
  hasBehavior,
}: GetSubRankingRequest) {
  const query = useQuery({
    queryKey: ['sub-ranking', courseId, page, disciplineModule, hasBehavior],
    queryFn: () =>
      getSubRanking({ courseId, page, disciplineModule, hasBehavior }),
    staleTime: Infinity,
    enabled: !!courseId,
  })

  return {
    ...query,
    ranking: query.data?.ranking,
    students: query.data?.students,
    pages: query.data?.pages,
    totalItems: query.data?.totalItems,
  }
}
