import { updateAdmin } from '@/http/update-admin'
import { useMutation } from '@tanstack/react-query'

export function useUpdateAdmin() {
  const mutation = useMutation({
    mutationFn: updateAdmin,
  })

  return mutation
}
