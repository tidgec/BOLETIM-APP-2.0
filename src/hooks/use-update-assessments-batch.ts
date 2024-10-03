import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAssessmentsBatch } from '@/http/update-assessments-batch'

export function useUpdateAssessmentsBatch() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: updateAssessmentsBatch,
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
