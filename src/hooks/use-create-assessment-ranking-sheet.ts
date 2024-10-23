import { useMutation } from '@tanstack/react-query'

import { createAssessmentRankingSheet } from '@/http/create-assessment-ranking-sheet'

export function useCreateAssessmentRankingSheet() {
  const mutation = useMutation({
    mutationFn: createAssessmentRankingSheet,
  })

  return mutation
}
