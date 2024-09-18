import { useQuery } from '@tanstack/react-query'

import { getReports, GetReportsRequest } from '@/http/get-reports'

export function useGetReports({ action, page }: GetReportsRequest) {
  const expiresIn = 1000 * 60 * 10 // 15m

  const query = useQuery({
    queryKey: ['reports', action, page],
    queryFn: () => getReports({ action, page }),
    staleTime: expiresIn,
  })

  return {
    ...query,
    reports: query.data?.reports,
    pages: query.data?.pages,
    totalItems: query.data?.totalItems,
  }
}
