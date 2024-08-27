import { createStudentsBatch } from '@/http/create-students-batch'
import { useMutation } from '@tanstack/react-query'

export function useCreateStudentsBatch() {
  const mutate = useMutation({
    mutationFn: createStudentsBatch,
  })

  return mutate
}
