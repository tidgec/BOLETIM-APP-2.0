import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAdmin } from '@/http/create-admin'

export function useCreateAdmin() {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: createAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['search'],
      })
    },
  })

  return mutate
}
