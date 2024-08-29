import { useMutation } from '@tanstack/react-query'

import { createStudentsBatch } from '@/http/create-students-batch'

export function useCreateStudentsBatch() {
  const mutate = useMutation({
    mutationFn: createStudentsBatch,
  })

  return mutate
}
