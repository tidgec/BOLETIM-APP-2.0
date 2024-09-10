import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteStudent } from '@/http/delete-student'
import type { GetCourseStudentsResponse } from '@/http/get-course-students'

export function useDeleteStudent() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: (_, { id }) => {
      const cached = queryClient.getQueryData<GetCourseStudentsResponse>([
        'student-courses',
      ])

      console.log(cached)

      if (cached) {
        queryClient.setQueryData<GetCourseStudentsResponse>(
          ['student-courses'],
          {
            ...cached,
            students: cached.students.filter((student) => {
              return student.id === id
            }),
            totalItems: cached.totalItems - 1,
            pages: cached.pages - 1,
          },
        )
      }

      return cached
    },
  })

  return mutation
}
