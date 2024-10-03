import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createBehaviorsBatch } from '@/http/create-behaviors-batch'

export function useCreateBehaviorsBatch() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: createBehaviorsBatch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          'ranking',
          'pole-ranking',
          'sub-ranking',
          'sub-pole-ranking',
          'average-behavior-poles-ranking',
          'poles-average-ranking',
          'boletims',
        ],
      })
    },
  })

  return mutate
}
