import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCourseDiscipline } from '@/http/delete-course-discipline'
import { GetCourseDisciplinesResponse } from '@/http/get-course-disciplines'

export function useDeleteCourseDiscipline() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteCourseDiscipline,
    onSuccess: async (_, { disciplineId }) => {
      const courseStudentsCache =
        queryClient.getQueriesData<GetCourseDisciplinesResponse>({
          queryKey: ['course-disciplines'],
        })

      courseStudentsCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        queryClient.setQueryData<GetCourseDisciplinesResponse>(cacheKey, {
          ...cached,
          disciplines: cached.disciplines.filter(
            (discipline) => discipline.disciplineId !== disciplineId,
          ),
        })
      })
    },
  })

  return mutation
}
