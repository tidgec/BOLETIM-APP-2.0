import { updateAssessment } from '@/http/update-assessment'
import { useMutation } from '@tanstack/react-query'

export function useUpdateAssessment() {
  const mutation = useMutation({
    mutationFn: updateAssessment,
  })

  return mutation
}
