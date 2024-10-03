import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeAssessmentGrade } from '@/http/remove-assessment-grade'

export function useRemoveAssessmentGrade() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: removeAssessmentGrade,
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
