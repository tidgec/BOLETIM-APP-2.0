import { useMutation } from '@tanstack/react-query'

import { createBehavior } from '@/http/create-behavior'

export function useCreateBehavior() {
  const mutation = useMutation({
    mutationFn: createBehavior,
  })

  return mutation
}
