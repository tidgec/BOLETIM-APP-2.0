import { useMutation } from '@tanstack/react-query'

import { updateDiscipline } from '@/http/update-discipline'

export function useUpdateDiscipline() {
  const mutation = useMutation({
    mutationFn: updateDiscipline,
  })

  return mutation
}
