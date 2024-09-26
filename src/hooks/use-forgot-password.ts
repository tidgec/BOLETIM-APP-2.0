import { useMutation } from '@tanstack/react-query'

import { forgotPassword } from '@/http/forgot-password'

export function useForgotPassword() {
  const mutate = useMutation({
    mutationFn: forgotPassword,
  })

  return mutate
}
