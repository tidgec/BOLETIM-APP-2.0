import { removeAssessmentGradesBatch } from '@/http/remove-assessment-grades-batch'
import { useMutation } from '@tanstack/react-query'

export function useRemoveAssessmentGradesBatch() {
  const mutate = useMutation({
    mutationFn: removeAssessmentGradesBatch,
  })

  return mutate
}