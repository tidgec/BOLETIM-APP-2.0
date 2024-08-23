import { getReports } from '@/http/get-reports'
import { useQuery } from '@tanstack/react-query'

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
