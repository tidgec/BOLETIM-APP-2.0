import { useMutation } from '@tanstack/react-query'

import { removeAssessmentGradesBatch } from '@/http/remove-assessment-grades-batch'

export function useRemoveAssessmentGradesBatch() {
  const mutate = useMutation({
    mutationFn: removeAssessmentGradesBatch,
  })

  return mutate
}
