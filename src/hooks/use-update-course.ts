import { useMutation } from '@tanstack/react-query'

import { updateCourse } from '@/http/update-course'

export function useUpdateCourse() {
  const mutate = useMutation({
    mutationFn: updateCourse,
  })

  return mutate
}
