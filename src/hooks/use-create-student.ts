import { createStudent } from '@/http/create-student'
import { useMutation } from '@tanstack/react-query'

export function useCreateStudent() {
  const mutate = useMutation({
    mutationFn: createStudent,
  })

  return mutate
}
