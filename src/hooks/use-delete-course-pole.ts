import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCoursePole } from '@/http/delete-course-pole'
import { GetCoursePolesResponse } from '@/http/get-course-poles'

export function useDeleteCoursePole() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteCoursePole,
    onSuccess: async (_, { poleId }) => {
      const courseStudentsCache =
        queryClient.getQueriesData<GetCoursePolesResponse>({
          queryKey: ['course-poles'],
        })

      courseStudentsCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        queryClient.setQueryData<GetCoursePolesResponse>(cacheKey, {
          ...cached,
          poles: cached.poles.filter((pole) => pole.id !== poleId),
        })
      })
    },
  })

  return mutation
}
