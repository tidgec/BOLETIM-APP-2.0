import { useMutation } from '@tanstack/react-query'

import { createStudent } from '@/http/create-student'

export function useCreateStudent() {
  const mutate = useMutation({
    mutationFn: createStudent,
  })

  return mutate
}
