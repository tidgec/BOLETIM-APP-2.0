import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import type { JWTPayload } from '@/types/jwt'

interface CreateAssessmentRankingSheetRequest {
  courseId: string
}

interface CreateAssessmentRankingSheetResponse {
  fileUrl: string
}

export async function createAssessmentRankingSheet({
  courseId,
}: CreateAssessmentRankingSheetRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.post<CreateAssessmentRankingSheetResponse>(
      `/courses/${courseId}/manager/classification/assessments/sheet`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return {
      fileUrl: response.data.fileUrl,
    }
  }

  const response = await api.post<CreateAssessmentRankingSheetResponse>(
    `/courses/${courseId}/classification/assessmnets/sheet`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    fileUrl: response.data.fileUrl,
  }
}
