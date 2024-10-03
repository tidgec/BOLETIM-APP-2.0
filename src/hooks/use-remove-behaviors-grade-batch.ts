import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeBehaviorsGradeBatch } from '@/http/remove-behaviors-grade-batch'

export function useRemoveBehaviorsGradeBatch() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: removeBehaviorsGradeBatch,
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

  return mutation
}
