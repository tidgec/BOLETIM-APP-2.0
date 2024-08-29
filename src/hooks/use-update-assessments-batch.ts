import { useMutation } from '@tanstack/react-query'

import { updateAssessmentsBatch } from '@/http/update-assessments-batch'

export function useUpdateAssessmentsBatch() {
  const mutate = useMutation({
    mutationFn: updateAssessmentsBatch,
  })

  return mutate
}
