import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import type { JWTPayload } from '@/types/jwt'

interface CreateSubRankingSheetRequest {
  courseId: string
  disciplineModule: number
  hasBehavior: string
}

interface CreateSubRankingSheetResponse {
  fileUrl: string
}

export async function createSubRankingSheet({
  courseId,
  disciplineModule,
  hasBehavior,
}: CreateSubRankingSheetRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.post<CreateSubRankingSheetResponse>(
      `/courses/${courseId}/manager/classification/sheet/sub`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        params: {
          hasBehavior: hasBehavior ?? 'true',
          disciplineModule,
        },
      },
    )

    return {
      fileUrl: response.data.fileUrl,
    }
  }

  const response = await api.post<CreateSubRankingSheetResponse>(
    `/courses/${courseId}/classification/sheet/sub`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        hasBehavior: hasBehavior ?? 'true',
        disciplineModule,
      },
    },
  )

  return {
    fileUrl: response.data.fileUrl,
  }
}
