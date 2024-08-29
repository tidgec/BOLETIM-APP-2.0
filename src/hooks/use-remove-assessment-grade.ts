import { useMutation } from '@tanstack/react-query'

import { removeAssessmentGrade } from '@/http/remove-assessment-grade'

export function useRemoveAssessmentGrade() {
  const mutation = useMutation({
    mutationFn: removeAssessmentGrade,
  })

  return mutation
}
