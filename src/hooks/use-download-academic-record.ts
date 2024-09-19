import { useMutation } from '@tanstack/react-query'

import { downloadAcademicRecord } from '@/http/download-academic-record'

export function useDownloadAcademicRecord() {
  const mutation = useMutation({
    mutationFn: downloadAcademicRecord,
  })

  return mutation
}
