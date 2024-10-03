import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAssessment } from '@/http/update-assessment'

export function useUpdateAssessment() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateAssessment,
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
