import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createBehavior } from '@/http/create-behavior'

export function useCreateBehavior() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBehavior,
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
