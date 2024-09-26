import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import type { JWTPayload } from '@/types/jwt'

interface CreateRankingSheetRequest {
  courseId: string
  hasBehavior: string
}

interface CreateRankingSheetResponse {
  fileUrl: string
}

export async function createRankingSheet({
  courseId,
  hasBehavior,
}: CreateRankingSheetRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.post<CreateRankingSheetResponse>(
      `/courses/${courseId}/manager/classification/sheet`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        params: {
          hasBehavior: hasBehavior ?? 'true',
        },
      },
    )

    return {
      fileUrl: response.data.fileUrl,
    }
  }

  const response = await api.post<CreateRankingSheetResponse>(
    `/courses/${courseId}/classification/sheet`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        hasBehavior: hasBehavior ?? 'true',
      },
    },
  )

  return {
    fileUrl: response.data.fileUrl,
  }
}
