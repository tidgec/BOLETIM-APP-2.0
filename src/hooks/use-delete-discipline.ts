import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteDiscipline } from '@/http/delete-discipline'
import { GetDisciplinesResponse } from '@/http/get-disciplines'

export function useDeleteDiscipline() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteDiscipline,
    onSuccess: async (_, { id }) => {
      const disciplinesCache =
        queryClient.getQueriesData<GetDisciplinesResponse>({
          queryKey: ['disciplines'],
        })

      disciplinesCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        let pages: number = 1

        if (cached.pages && cached.totalItems) {
          if (cached.totalItems > 10) {
            pages = cached.pages
          }

          pages =
            cached.totalItems && cached.totalItems <= 10 && cached.pages === 1
              ? cached.pages
              : cached.pages - 1
        }

        queryClient.setQueryData<GetDisciplinesResponse>(cacheKey, {
          ...cached,
          disciplines: cached.disciplines.filter((discipline) => {
            return discipline.id !== id
          }),
          totalItems: cached.totalItems && cached.totalItems - 1,
          pages,
        })
      })
    },
  })

  return mutation
}
