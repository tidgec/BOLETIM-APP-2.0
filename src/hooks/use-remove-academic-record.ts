import { useMutation } from '@tanstack/react-query'

import { removeAcademicRecord } from '@/http/remove-academic-record'

export function useRemoveAcademicRecord() {
  const mutation = useMutation({
    mutationFn: removeAcademicRecord,
  })

  return mutation
}
