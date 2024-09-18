import { useQuery } from '@tanstack/react-query'

import { getProfile } from '@/http/get-profile'

export function useProfile() {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  return {
    ...query,
    user: query.data,
  }
}
