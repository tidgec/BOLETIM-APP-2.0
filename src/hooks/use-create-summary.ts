import { useMutation } from '@tanstack/react-query'

import { createSummary } from '@/http/create-summary'

export function useCreateSummary() {
  const mutation = useMutation({
    mutationFn: createSummary,
  })

  return {
    fileUrl: mutation.data?.fileUrl,
    ...mutation,
  }
}
