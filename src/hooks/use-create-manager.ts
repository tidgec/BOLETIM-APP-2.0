import { createManager } from '@/http/create-manager'
import { useMutation } from '@tanstack/react-query'

export function useCreateManager() {
  const mutate = useMutation({
    mutationFn: createManager,
  })

  return mutate
}
