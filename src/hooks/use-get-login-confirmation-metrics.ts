import { useQuery } from '@tanstack/react-query'

import {
  getLoginConfirmationMetrics,
  GetLoginConfirmationMetricsRequest,
} from '@/http/get-login-confirmation-metrics'

export function useGetLoginConfirmationMetrics({
  courseId,
}: GetLoginConfirmationMetricsRequest) {
  const expiresIn = 1000 * 60 * 60

  const query = useQuery({
    queryKey: ['students-metrics'],
    queryFn: () => getLoginConfirmationMetrics({ courseId }),
    staleTime: expiresIn,
  })

  return {
    ...query,
    loginConfirmationMetrics: query.data?.loginConfirmationMetrics,
  }
}
