import { useMutation } from '@tanstack/react-query'

import { createAcademicRecord } from '@/http/create-academic-record'

export function useCreateAcademicRecord() {
  const mutation = useMutation({
    mutationFn: createAcademicRecord,
  })

  return mutation
}
