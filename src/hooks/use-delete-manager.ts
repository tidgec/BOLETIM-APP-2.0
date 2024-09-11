import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteManager } from '@/http/delete-manager'
import { GetCourseManagersResponse } from '@/http/get-course-managers'

export function useDeleteManager() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteManager,
    onSuccess: async (_, { id }) => {
      const courseManagersCache =
        queryClient.getQueriesData<GetCourseManagersResponse>({
          queryKey: ['manager-courses'],
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

        queryClient.setQueryData<GetCourseManagersResponse>(cacheKey, {
          ...cached,
          managers: cached.managers.filter((manager) => {
            return manager.id !== id
          }),
          totalItems: cached.totalItems - 1,
          pages,
        })
      })
    },
  })

  return mutation
}
