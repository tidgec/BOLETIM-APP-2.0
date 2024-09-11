import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteAdmin } from '@/http/delete-admin'
import { GetAdminsResponse } from '@/http/get-admins'

export function useDeleteAdmin() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: async (_, { id }) => {
      const courseManagersCache = queryClient.getQueriesData<GetAdminsResponse>(
        {
          queryKey: ['admins'],
        },
      )

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

        queryClient.setQueryData<GetAdminsResponse>(cacheKey, {
          ...cached,
          admins: cached.admins.filter((admin) => {
            return admin.id !== id
          }),
          totalItems: cached.totalItems - 1,
          pages,
        })
      })
    },
  })

  return mutation
}
