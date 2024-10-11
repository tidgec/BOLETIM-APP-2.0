import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createManager } from '@/http/create-manager'

export function useCreateManager() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: createManager,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['search'],
      })
    },
  })

  return mutate
}
