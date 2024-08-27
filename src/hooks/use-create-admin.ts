import { createAdmin } from '@/http/create-admin'
import { useMutation } from '@tanstack/react-query'

export function useCreateAdmin() {
  const mutate = useMutation({
    mutationFn: createAdmin,
  })

  return mutate
}
