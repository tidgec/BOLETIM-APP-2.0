import { useMutation } from '@tanstack/react-query'

import { updateBehavior } from '@/http/update-behavior'

export function useUpdateBehavior() {
  const mutation = useMutation({
    mutationFn: updateBehavior,
  })

  return mutation
}
