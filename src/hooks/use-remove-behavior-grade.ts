import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeBehaviorGrade } from '@/http/remove-behavior-grade'

export function useRemoveBehaviorGrade() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: removeBehaviorGrade,
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
