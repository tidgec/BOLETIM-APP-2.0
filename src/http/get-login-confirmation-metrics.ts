import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetLoginConfirmationMetricsRequest {
  courseId: string
}

export interface GetLoginConfirmationMetricsResponse {
  loginConfirmationMetrics: {
    poleId: string
    pole: string
    metrics: {
      totalConfirmedSize: number
      totalNotConfirmedSize: number
    }
  }[]
}

export async function getLoginConfirmationMetrics({
  courseId,
}: GetLoginConfirmationMetricsRequest): Promise<GetLoginConfirmationMetricsResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetLoginConfirmationMetricsResponse>(
    `/courses/${courseId}/students/metrics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    loginConfirmationMetrics: response.data.loginConfirmationMetrics,
  }
}
