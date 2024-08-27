import { changeManagerStatus } from '@/http/change-manager-status'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
