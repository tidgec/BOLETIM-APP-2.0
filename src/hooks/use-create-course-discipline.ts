import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createCourseDiscipline } from '@/http/create-course-discipline'

export function useCreateCourseDiscipline() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createCourseDiscipline,
    onSuccess: async (_, { courseId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['course-disciplines', courseId],
      })
    },
  })

  return mutation
}
