import { useQuery } from '@tanstack/react-query'

import { getReports, GetReportsRequest } from '@/http/get-reports'

export function useGetReports({ action, page, username }: GetReportsRequest) {
  const query = useQuery({
    queryKey: ['reports', action, page, username],
    queryFn: () => getReports({ action, page, username }),
  })

  return {
    ...query,
    reports: query.data?.reports,
    pages: query.data?.pages,
    totalItems: query.data?.totalItems,
  }
}
