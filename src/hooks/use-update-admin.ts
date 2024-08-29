import { useMutation } from '@tanstack/react-query'

import { updateAdmin } from '@/http/update-admin'

export function useUpdateAdmin() {
  const mutation = useMutation({
    mutationFn: updateAdmin,
  })

  return mutation
}
