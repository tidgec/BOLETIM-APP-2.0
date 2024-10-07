import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAssessment } from '@/http/create-assessment'

export function useCreateAssessment() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: createAssessment,
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
          'course-assessments',
        ],
      })
    },
  })

  return mutate
}
