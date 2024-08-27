import { updateStudentsBatch } from '@/http/update-students-batch'
import { useMutation } from '@tanstack/react-query'

export function useUpdateStudentsBatch() {
  const mutate = useMutation({
    mutationFn: updateStudentsBatch,
  })

  return mutate
}
