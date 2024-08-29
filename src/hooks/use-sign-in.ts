import { useMutation } from '@tanstack/react-query'

import { signIn } from '@/http/sign-in'

export function useSignIn() {
  const mutate = useMutation({
    mutationFn: signIn,
  })

  return mutate
}
