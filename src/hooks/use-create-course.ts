import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createCourse } from '@/http/create-course'

export function useCreateCourse() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: createCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['courses'],
      })
    },
  })

  return mutate
}
