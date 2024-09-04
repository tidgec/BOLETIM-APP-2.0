import { useMutation, useQueryClient } from '@tanstack/react-query'

import { disableManagerStatus } from '@/http/disable-manager-status'

export function useDisableManagerStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: disableManagerStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['manager-courses'],
      })
    },
  })

  return mutation
}
