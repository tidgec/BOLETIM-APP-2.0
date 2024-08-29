import { useMutation } from '@tanstack/react-query'

import { updateAssessment } from '@/http/update-assessment'

export function useUpdateAssessment() {
  const mutation = useMutation({
    mutationFn: updateAssessment,
  })

  return mutation
}
