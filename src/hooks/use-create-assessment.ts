import { useMutation } from '@tanstack/react-query'

import { createAssessment } from '@/http/create-assessment'

export function useCreateAssessment() {
  const mutate = useMutation({
    mutationFn: createAssessment,
  })

  return mutate
}
