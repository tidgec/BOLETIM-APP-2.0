import { useMutation } from '@tanstack/react-query'

import { createAdmin } from '@/http/create-admin'

export function useCreateAdmin() {
  const mutate = useMutation({
    mutationFn: createAdmin,
  })

  return mutate
}
