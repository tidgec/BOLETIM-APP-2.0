import { useMutation } from '@tanstack/react-query'

import { updateBehaviorsBatch } from '@/http/update-behaviors-batch'

export function useUpdateBehaviorsBatch() {
  const mutate = useMutation({
    mutationFn: updateBehaviorsBatch,
  })

  return mutate
}
