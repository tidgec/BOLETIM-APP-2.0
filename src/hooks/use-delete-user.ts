import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteUser } from '@/http/delete-user'
import { SearchResponse } from '@/http/search'

export function useDeleteUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async (_, { id }) => {
      const courseStudentsCache = queryClient.getQueriesData<SearchResponse>({
        queryKey: ['searchs'],
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

        queryClient.setQueryData<SearchResponse>(cacheKey, {
          ...cached,
          searchs: cached.searchs.filter((search) => {
            return search.id !== id
          }),
          totalItems: cached.totalItems - 1,
          pages,
        })
      })
    },
  })

  return mutation
}
