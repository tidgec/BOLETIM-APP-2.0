import { useMutation } from '@tanstack/react-query'

import { deleteStudent } from '@/http/delete-student'

export function useDeleteStudent() {
  const mutation = useMutation({
    mutationFn: deleteStudent,
  })

  return mutation
}
