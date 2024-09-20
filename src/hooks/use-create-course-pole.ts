import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createCoursePole } from '@/http/create-course-pole'

export function useCreateCoursePole() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createCoursePole,
    onSuccess: async (_, { courseId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['course-poles', courseId],
      })
    },
  })

  return mutation
}
