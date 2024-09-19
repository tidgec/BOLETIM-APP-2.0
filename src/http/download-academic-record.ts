import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DownloadAcademicRecordRequest {
  courseId: string
  studentId: string
}

interface DownloadAcademicRecordResponse {
  fileUrl: string
}

export async function downloadAcademicRecord({
  courseId,
  studentId,
}: DownloadAcademicRecordRequest) {
  const token = Cookies.get('token')

  const response = await api.post<DownloadAcademicRecordResponse>(
    `/courses/${courseId}/download-historic`,
    {
      studentId,
    },
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
