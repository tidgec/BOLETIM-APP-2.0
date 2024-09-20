import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCourse } from '@/http/delete-course'
import { GetCoursesResponse } from '@/http/get-courses'

export function useDeleteCourse() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: async (_, { id }) => {
      const courseManagersCache =
        queryClient.getQueriesData<GetCoursesResponse>({
          queryKey: ['courses'],
        })

      courseManagersCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        queryClient.setQueryData<GetCoursesResponse>(cacheKey, {
          ...cached,
          courses: cached.courses.filter((course) => {
            return course.id !== id
          }),
        })
      })
    },
  })

  return mutation
}
