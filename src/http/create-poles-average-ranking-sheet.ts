import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreatePolesAverageRankingSheetRequest {
  courseId: string
  hasBehavior: string
}

interface CreatePolesAverageRankingSheetResponse {
  fileUrl: string
}

export async function createPolesAverageRankingSheet({
  courseId,
  hasBehavior,
}: CreatePolesAverageRankingSheetRequest) {
  const token = Cookies.get('token')

  const response = await api.post<CreatePolesAverageRankingSheetResponse>(
    `/courses/${courseId}/classification/average/sheet`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        hasBehavior,
      },
    },
  )

  return {
    fileUrl: response.data.fileUrl,
  }
}
