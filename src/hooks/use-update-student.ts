import { useMutation, useQueryClient } from '@tanstack/react-query'

import { GetCourseStudentsResponse } from '@/http/get-course-students'
import { SearchResponse } from '@/http/search'
import { updateStudent } from '@/http/update-student'

export function useUpdateStudent() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: async (_, { cpf, username, email, id }) => {
      const serchsCache = queryClient.getQueriesData<SearchResponse>({
        queryKey: ['search'],
      })

      const studentCoursesCache =
        queryClient.getQueriesData<GetCourseStudentsResponse>({
          queryKey: ['student-courses'],
        })

      studentCoursesCache.forEach(([cacheKey, cached]) => {
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
          students: cached.students.map((student) => {
            const isUser = student.id === id

            return {
              ...student,
              username: isUser && username ? username : student.username,
              cpf: isUser && cpf ? cpf : student.cpf,
              email: isUser && email ? email : student.email,
            }
          }),
          totalItems: cached.totalItems - 1,
          pages,
        })
      })

      serchsCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        let pages: number = 1

        if (cached.totalItems > 10) {
          pages = cached.pages
        }

        pages =
          cached.totalItems <= 10 && cached.pages === 1
            ? cached.pages
            : cached.pages - 1

        queryClient.setQueryData<SearchResponse>(cacheKey, {
          ...cached,
          searchs: cached.searchs.map((search) => {
            const isUser = search.id === id

            return {
              ...search,
              username: isUser && username ? username : search.username,
              cpf: isUser && cpf ? cpf : search.cpf,
            }
          }),
          totalItems: cached.totalItems - 1,
          pages,
        })
      })
    },
  })

  return mutation
}
