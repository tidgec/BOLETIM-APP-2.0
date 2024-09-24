import { useMutation, useQueryClient } from '@tanstack/react-query'

import { activeAdminStatus } from '@/http/active-admin-status'

export function useActiveAdminStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: activeAdminStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['admins'],
      })
    },
  })

  return mutation
}
