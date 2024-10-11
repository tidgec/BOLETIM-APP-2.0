import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createStudentsBatch } from '@/http/create-students-batch'

export function useCreateStudentsBatch() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: createStudentsBatch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['search'],
      })
    },
  })

  return mutate
}
