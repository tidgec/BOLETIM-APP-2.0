import { useMutation } from '@tanstack/react-query'

import { createPoleSubRankingSheet } from '@/http/create-pole-sub-ranking-sheet'

export function useCreatePoleSubRankingSheet() {
  const mutation = useMutation({
    mutationFn: createPoleSubRankingSheet,
  })

  return mutation
}
