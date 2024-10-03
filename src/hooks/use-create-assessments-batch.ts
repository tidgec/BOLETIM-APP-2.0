import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAssessmentsBatch } from '@/http/create-assessments-batch'

export function useCreateAssessmentsBatch() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: createAssessmentsBatch,
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
