import { getProfile } from '@/http/get-profile'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  return {
    ...query,
    user: query.data,
  }
}
