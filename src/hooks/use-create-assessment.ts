import { createAssessment } from '@/http/create-assessment'
import { useMutation } from '@tanstack/react-query'

export function useCreateAssessment() {
  const mutate = useMutation({
    mutationFn: createAssessment,
  })

  return mutate
}
