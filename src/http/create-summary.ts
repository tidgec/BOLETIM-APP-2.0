import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetSummaryRequest {
  courseId: string
}

export interface GetSummaryResponse {
  fileUrl: string
}

export async function createSummary({ courseId }: GetSummaryRequest) {
  const token = Cookies.get('token')

  const response = await api.post<GetSummaryResponse>(
    `/courses/${courseId}/summary`,
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
