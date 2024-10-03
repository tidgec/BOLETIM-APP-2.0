import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateBehavior } from '@/http/update-behavior'

export function useUpdateBehavior() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateBehavior,
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
