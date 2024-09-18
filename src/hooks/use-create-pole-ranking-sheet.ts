import { useMutation } from '@tanstack/react-query'

import { createPoleRankingSheet } from '@/http/create-pole-ranking-sheet'

export function useCreatePoleRankingSheet() {
  const mutation = useMutation({
    mutationFn: createPoleRankingSheet,
  })

  return mutation
}
