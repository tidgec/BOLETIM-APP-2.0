import { useMutation } from '@tanstack/react-query'

import { deleteManager } from '@/http/delete-manager'

export function useDeleteManager() {
  const mutation = useMutation({
    mutationFn: deleteManager,
  })

  return mutation
}
