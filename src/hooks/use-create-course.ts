import { useMutation } from '@tanstack/react-query'

import { createCourse } from '@/http/create-course'

export function useCreateCourse() {
  const mutate = useMutation({
    mutationFn: createCourse,
  })

  return mutate
}
