import { useMutation } from '@tanstack/react-query'

import { deleteAdmin } from '@/http/delete-admin'

export function useDeleteAdmin() {
  const mutation = useMutation({
    mutationFn: deleteAdmin,
  })

  return mutation
}
