import { useMutation } from '@tanstack/react-query'

import { updateManager } from '@/http/update-manager'

export function useUpdateManager() {
  const mutation = useMutation({
    mutationFn: updateManager,
  })

  return mutation
}
