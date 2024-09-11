import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteStudent } from '@/http/delete-student'
import type { GetCourseStudentsResponse } from '@/http/get-course-students'

export function useDeleteStudent() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: async (_, { id }) => {
      const courseStudentsCache =
        queryClient.getQueriesData<GetCourseStudentsResponse>({
          queryKey: ['student-courses'],
        })

      courseStudentsCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        let pages: number = 1

        if (cached.totalItems > 10) {
          pages = cached.pages
        }

        pages =
          cached.totalItems <= 10 && cached.pages === 1
            ? cached.pages
            : cached.pages - 1

        queryClient.setQueryData<GetCourseStudentsResponse>(cacheKey, {
          ...cached,
          students: cached.students.filter((student) => {
            return student.id !== id
          }),
          totalItems: cached.totalItems - 1,
          pages,
        })
      })
    },
  })

  return mutation
}
