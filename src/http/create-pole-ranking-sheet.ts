import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreatePoleRankingSheetRequest {
  courseId: string
  poleId: string
  hasBehavior: string
}

interface CreatePoleRankingSheetResponse {
  fileUrl: string
}

export async function createPoleRankingSheet({
  courseId,
  poleId,
  hasBehavior,
}: CreatePoleRankingSheetRequest) {
  const token = Cookies.get('token')

  const response = await api.post<CreatePoleRankingSheetResponse>(
    `/courses/${courseId}/poles/${poleId}/classification/sheet`,
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
