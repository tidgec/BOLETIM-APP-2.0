import { useMutation } from '@tanstack/react-query'

import { createBehaviorsBatch } from '@/http/create-behaviors-batch'

export function useCreateBehaviorsBatch() {
  const mutate = useMutation({
    mutationFn: createBehaviorsBatch,
  })

  return mutate
}
