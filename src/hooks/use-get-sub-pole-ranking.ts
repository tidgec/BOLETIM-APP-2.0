import { useQuery } from '@tanstack/react-query'

import {
  getSubPoleRanking,
  GetSubPoleRankingRequest,
} from '@/http/get-sub-pole-ranking'

export function useGetSubPoleRanking({
  courseId,
  poleId,
  page,
  hasBehavior,
  disciplineModule,
}: GetSubPoleRankingRequest) {
  const query = useQuery({
    queryKey: [
      'sub-pole-ranking',
      courseId,
      poleId,
      page,
      hasBehavior,
      disciplineModule,
    ],
    queryFn: () =>
      getSubPoleRanking({
        courseId,
        poleId,
        page,
        hasBehavior,
        disciplineModule,
      }),
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
