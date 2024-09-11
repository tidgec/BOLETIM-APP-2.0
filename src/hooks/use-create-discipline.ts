import { useMutation } from '@tanstack/react-query'

import { createDiscipline } from '@/http/create-discipline'

export function useCreateDiscipline() {
  const mutation = useMutation({
    mutationFn: createDiscipline,
  })

  return mutation
}
