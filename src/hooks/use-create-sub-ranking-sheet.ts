import { useMutation } from '@tanstack/react-query'

import { createSubRankingSheet } from '@/http/create-sub-ranking-sheet'

export function useCreateSubRankingSheet() {
  const mutation = useMutation({
    mutationFn: createSubRankingSheet,
  })

  return mutation
}
