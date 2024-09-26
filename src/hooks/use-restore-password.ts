import { useMutation } from '@tanstack/react-query'

import { restorePassword } from '@/http/restore-password'

export function useRestorePassword() {
  const mutate = useMutation({
    mutationFn: restorePassword,
  })

  return mutate
}
