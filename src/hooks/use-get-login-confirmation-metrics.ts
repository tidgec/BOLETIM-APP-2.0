import { useQuery } from '@tanstack/react-query'

import {
  getLoginConfirmationMetrics,
  GetLoginConfirmationMetricsRequest,
} from '@/http/get-login-confirmation-metrics'

export function useGetLoginConfirmationMetrics({
  courseId,
}: GetLoginConfirmationMetricsRequest) {
  const query = useQuery({
    queryKey: ['students-metrics'],
    queryFn: () => getLoginConfirmationMetrics({ courseId }),
  })

  return {
    ...query,
    loginConfirmationMetrics: query.data?.loginConfirmationMetrics,
  }
}
