import { useMutation } from '@tanstack/react-query'

import { confirmStudentLogin } from '@/http/confirm-student-login'

export function useConfirmStudentLogin() {
  const mutation = useMutation({
    mutationFn: confirmStudentLogin,
  })

  return mutation
}
