import { useQuery } from '@tanstack/react-query'

import {
  getPoleAssessmentRanking,
  GetPoleAssessmentRankingRequest,
} from '@/http/get-pole-assessment-ranking'

export function useGetPoleAssessmentRanking({
  courseId,
  poleId,
  page,
}: GetPoleAssessmentRankingRequest) {
  const query = useQuery({
    queryKey: ['pole-assessment-ranking', courseId, poleId, page],
    queryFn: () => getPoleAssessmentRanking({ courseId, poleId, page }),
  })

  return {
    ...query,
    ranking: query.data?.ranking,
  }
}
