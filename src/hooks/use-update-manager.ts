import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SearchResponse } from '@/http/search'
import { updateManager } from '@/http/update-manager'

export function useUpdateManager() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateManager,
    onSuccess: async (_, { cpf, username, id }) => {
      const serchsCache = queryClient.getQueriesData<SearchResponse>({
        queryKey: ['search'],
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
