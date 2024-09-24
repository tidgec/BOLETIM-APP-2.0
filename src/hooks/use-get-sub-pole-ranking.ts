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
  const expiresIn = 1000 * 60 * 60 // 1hr

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
