import { useMutation, useQueryClient } from '@tanstack/react-query'

import { activeManagerStatus } from '@/http/active-manager-status'

export function useActiveManagerStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: activeManagerStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['manager-courses'],
      })
    },
  })

  return mutation
}
