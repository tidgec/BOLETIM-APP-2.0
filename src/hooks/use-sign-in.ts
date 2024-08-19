import { signIn } from '@/http/sign-in'
import { useMutation } from '@tanstack/react-query'

export function useSignIn() {
  const mutate = useMutation({
    mutationFn: signIn,
  })

  return mutate
}
