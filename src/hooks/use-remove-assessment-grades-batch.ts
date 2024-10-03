import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeAssessmentGradesBatch } from '@/http/remove-assessment-grades-batch'

export function useRemoveAssessmentGradesBatch() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: removeAssessmentGradesBatch,
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
