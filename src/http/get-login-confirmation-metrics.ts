import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

export interface GetLoginConfirmationMetricsRequest {
  courseId: string
}

export interface GetLoginConfirmationMetricsResponse {
  loginConfirmationMetrics:
    | {
        poleId: string
        pole: string
        metrics: {
          totalConfirmedSize: number
          totalNotConfirmedSize: number
        }
      }[]
    | {
        poleId: string
        pole: string
        metrics: {
          totalConfirmedSize: number
          totalNotConfirmedSize: number
        }
      }
}

export async function getLoginConfirmationMetrics({
  courseId,
}: GetLoginConfirmationMetricsRequest): Promise<GetLoginConfirmationMetricsResponse> {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.get<GetLoginConfirmationMetricsResponse>(
      `/courses/${courseId}/manager/students/metrics`,
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
