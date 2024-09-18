import { useMutation, useQueryClient } from '@tanstack/react-query'

import { GetProfileResponse } from '@/http/get-profile'
import { updateProfileAvatar } from '@/http/update-profile-avatar'

export function useUpdateProfileAvatar() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateProfileAvatar,
    onSuccess: async (_, { file }) => {
      const profileCache = queryClient.getQueriesData<GetProfileResponse>({
        queryKey: ['profile'],
      })

      const fileURL = URL.createObjectURL(file)

      profileCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        queryClient.setQueryData<GetProfileResponse>(cacheKey, {
          ...cached,
          avatarUrl: fileURL,
        })
      })
    },
  })

  return mutation
}
