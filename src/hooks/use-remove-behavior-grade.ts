import { useMutation } from '@tanstack/react-query'

import { removeBehaviorGrade } from '@/http/remove-behavior-grade'

export function useRemoveBehaviorGrade() {
  const mutation = useMutation({
    mutationFn: removeBehaviorGrade,
  })

  return mutation
}
