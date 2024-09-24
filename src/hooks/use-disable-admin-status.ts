import { useMutation, useQueryClient } from '@tanstack/react-query'

import { disableAdminStatus } from '@/http/disable-admin-status'

export function useDisableAdminStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: disableAdminStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['admins'],
      })
    },
  })

  return mutation
}
