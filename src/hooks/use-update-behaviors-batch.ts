import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateBehaviorsBatch } from '@/http/update-behaviors-batch'

export function useUpdateBehaviorsBatch() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: updateBehaviorsBatch,
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
