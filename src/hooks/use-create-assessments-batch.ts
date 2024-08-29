import { useMutation } from '@tanstack/react-query'

import { createAssessmentsBatch } from '@/http/create-assessments-batch'

export function useCreateAssessmentsBatch() {
  const mutate = useMutation({
    mutationFn: createAssessmentsBatch,
  })

  return mutate
}
