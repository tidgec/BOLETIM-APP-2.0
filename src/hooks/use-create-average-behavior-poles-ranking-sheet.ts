import { useMutation } from '@tanstack/react-query'

import { createAverageBehaviorPolesRanking } from '@/http/create-average-behavior-poles-ranking-sheet'

export function useCreateAverageBehaviorPolesRankingSheet() {
  const mutate = useMutation({
    mutationFn: createAverageBehaviorPolesRanking,
  })

  return mutate
}
