import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

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

  const response = await api.post<CreateRankingSheetResponse>(
    `/courses/${courseId}/classification/sheet`,
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
