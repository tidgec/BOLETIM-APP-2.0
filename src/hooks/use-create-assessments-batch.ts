import { createAssessmentsBatch } from '@/http/create-assessments-batch'
import { useMutation } from '@tanstack/react-query'

export function useCreateAssessmentsBatch() {
  const mutate = useMutation({
    mutationFn: createAssessmentsBatch,
  })

  return mutate
}
