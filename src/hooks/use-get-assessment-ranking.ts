import { useQuery } from '@tanstack/react-query'

import {
  getAssessmentRanking,
  type GetAssessmentRankingRequest,
} from '@/http/get-assessment-ranking'

export function useGetAssessmentRanking({
  courseId,
  page,
}: GetAssessmentRankingRequest) {
  const query = useQuery({
    queryKey: ['assessment-ranking', courseId, page],
    queryFn: () => getAssessmentRanking({ courseId, page }),
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
