import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createCourseDiscipline } from '@/http/create-course-discipline'

export function useCreateCourseDiscipline() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createCourseDiscipline,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['course-disciplines'],
      })
    },
  })

  return mutation
}
