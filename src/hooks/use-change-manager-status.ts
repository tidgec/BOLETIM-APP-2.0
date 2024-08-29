import { useMutation, useQueryClient } from '@tanstack/react-query'

import { changeManagerStatus } from '@/http/change-manager-status'

export function useChangeManagerStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: changeManagerStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['manager-courses'],
      })
    },
  })

  return mutation
}
