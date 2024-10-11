import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createStudent } from '@/http/create-student'

export function useCreateStudent() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: createStudent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['search'],
      })
    },
  })

  return mutate
}
