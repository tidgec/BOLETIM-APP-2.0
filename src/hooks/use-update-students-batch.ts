import { useMutation } from '@tanstack/react-query'

import { updateStudentsBatch } from '@/http/update-students-batch'

export function useUpdateStudentsBatch() {
  const mutate = useMutation({
    mutationFn: updateStudentsBatch,
  })

  return mutate
}
