import { useMutation } from '@tanstack/react-query'

import { createPolesAverageRankingSheet } from '@/http/create-poles-average-ranking-sheet'

export function useCreatePolesAverageRankingSheet() {
  const mutation = useMutation({
    mutationFn: createPolesAverageRankingSheet,
  })

  return mutation
}
