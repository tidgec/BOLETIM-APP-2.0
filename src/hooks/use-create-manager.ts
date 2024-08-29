import { useMutation } from '@tanstack/react-query'

import { createManager } from '@/http/create-manager'

export function useCreateManager() {
  const mutate = useMutation({
    mutationFn: createManager,
  })

  return mutate
}
