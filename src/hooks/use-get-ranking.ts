import { useQuery } from '@tanstack/react-query'

import { getRanking, GetRankingRequest } from '@/http/get-ranking'

export function useGetRanking({ courseId, page }: GetRankingRequest) {
  const query = useQuery({
    queryKey: ['ranking', courseId, page],
    queryFn: () => getRanking({ courseId, page }),
  })

  return {
    ...query,
    ranking: query.data?.ranking,
    pages: query.data?.pages,
    totalItems: query.data?.totalItems,
  }
}
