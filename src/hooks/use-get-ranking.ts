import { useQuery } from '@tanstack/react-query'

import { getRanking, GetRankingRequest } from '@/http/get-ranking'

export function useGetRanking({ courseId, page }: GetRankingRequest) {
  const query = useQuery({
    queryKey: ['ranking', courseId, page],
    queryFn: () => getRanking({ courseId, page }),
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
