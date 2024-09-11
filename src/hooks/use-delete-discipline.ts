import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteDiscipline } from '@/http/delete-discipline'
import { GetDisciplinesResponse } from '@/http/get-disciplines'

export function useDeleteDiscipline() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteDiscipline,
    onSuccess: async (_, { id }) => {
      const courseManagersCache =
        queryClient.getQueriesData<GetDisciplinesResponse>({
          queryKey: ['disciplines'],
        })

      courseManagersCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        let pages: number = 1

        if (cached.totalItems > 10) {
          pages = cached.pages
        }

        pages =
          cached.totalItems <= 10 && cached.pages === 1
            ? cached.pages
            : cached.pages - 1

        queryClient.setQueryData<GetDisciplinesResponse>(cacheKey, {
          ...cached,
          disciplines: cached.disciplines.filter((discipline) => {
            return discipline.id !== id
          }),
          totalItems: cached.totalItems - 1,
          pages,
        })
      })
    },
  })

  return mutation
}
