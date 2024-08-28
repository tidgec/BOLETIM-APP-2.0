import { removeAssessmentGrade } from '@/http/remove-assessment-grade'
import { useMutation } from '@tanstack/react-query'

export function useRemoveAssessmentGrade() {
  const mutation = useMutation({
    mutationFn: removeAssessmentGrade,
  })

  return mutation
}
