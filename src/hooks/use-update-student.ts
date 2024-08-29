import { useMutation } from '@tanstack/react-query'

import { updateStudent } from '@/http/update-student'

export function useUpdateStudent() {
  const mutation = useMutation({
    mutationFn: updateStudent,
  })

  return mutation
}
