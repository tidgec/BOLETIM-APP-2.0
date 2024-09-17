import { useMutation } from '@tanstack/react-query'

import { createRankingSheet } from '@/http/create-ranking-sheet'

export function useCreateRankingSheet() {
  const mutation = useMutation({
    mutationFn: createRankingSheet,
  })

  return mutation
}
