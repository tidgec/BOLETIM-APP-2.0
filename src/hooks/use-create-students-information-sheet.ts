import { useMutation } from '@tanstack/react-query'

import { createStudentsInformationSheet } from '@/http/create-students-information-sheet'

export function useCreateStudentsInformationSheet() {
  const mutation = useMutation({
    mutationFn: createStudentsInformationSheet,
  })

  return mutation
}
