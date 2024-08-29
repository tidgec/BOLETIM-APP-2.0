import { useQuery } from '@tanstack/react-query'

import { getReports } from '@/http/get-reports'

export function useGetReports() {
  const query = useQuery({
    queryKey: ['reports'],
    queryFn: () => getReports(),
  })

  return {
    ...query,
    reports: query.data,
  }
}
