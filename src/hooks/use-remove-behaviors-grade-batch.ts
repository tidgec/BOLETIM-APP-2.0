import { useMutation } from '@tanstack/react-query'

import { removeBehaviorsGradeBatch } from '@/http/remove-behaviors-grade-batch'

export function useRemoveBehaviorsGradeBatch() {
  const mutation = useMutation({
    mutationFn: removeBehaviorsGradeBatch,
  })

  return mutation
}
