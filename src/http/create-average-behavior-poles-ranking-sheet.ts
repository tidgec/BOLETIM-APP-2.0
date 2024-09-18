import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateAverageBehaviorPolesRankingSheetRequest {
  courseId: string
  hasBehavior: string
}

interface CreateAverageBehaviorPolesRankingSheet {
  fileUrl: string
}

export async function createAverageBehaviorPolesRanking({
  courseId,
  hasBehavior,
}: CreateAverageBehaviorPolesRankingSheetRequest) {
  const token = Cookies.get('token')

  const response = await api.post<CreateAverageBehaviorPolesRankingSheet>(
    `/courses/${courseId}/classification/behaviors/sheet`,
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
