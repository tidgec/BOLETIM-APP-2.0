import { updateAssessmentsBatch } from '@/http/update-assessments-batch'
import { useMutation } from '@tanstack/react-query'

export function useUpdateAssessmentsBatch() {
  const mutate = useMutation({
    mutationFn: updateAssessmentsBatch,
  })

  return mutate
}
