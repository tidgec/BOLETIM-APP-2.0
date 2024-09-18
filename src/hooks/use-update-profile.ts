import { useMutation, useQueryClient } from '@tanstack/react-query'

import { GetProfileResponse } from '@/http/get-profile'
import { updateProfile } from '@/http/update-profile'

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (_, { username, email, birthday, civilId }) => {
      const profileCache = queryClient.getQueriesData<GetProfileResponse>({
        queryKey: ['profile'],
      })

      profileCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        queryClient.setQueryData<GetProfileResponse>(cacheKey, {
          ...cached,
          username: username ?? cached.username,
          email: email ?? cached.email,
          birthday: birthday ? new Date(birthday) : cached.birthday,
          civilId: civilId ?? cached.civilId,
        })
      })
    },
  })

  return mutation
}
