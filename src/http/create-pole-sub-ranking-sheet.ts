import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreatePoleSubRankingSheetRequest {
  courseId: string
  poleId: string
  disciplineModule: number
  hasBehavior: string
}

interface CreatePoleSubRankingSheetResponse {
  fileUrl: string
}

export async function createPoleSubRankingSheet({
  courseId,
  poleId,
  disciplineModule,
  hasBehavior,
}: CreatePoleSubRankingSheetRequest) {
  const token = Cookies.get('token')

  const response = await api.post<CreatePoleSubRankingSheetResponse>(
    `/courses/${courseId}/poles/${poleId}/classification/sheet/sub`,
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
