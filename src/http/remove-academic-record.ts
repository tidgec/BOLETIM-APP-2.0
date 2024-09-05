import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface RemoveAcademicRecordRequest {
  courseId: string
}

export async function removeAcademicRecord({
  courseId,
}: RemoveAcademicRecordRequest) {
  const token = Cookies.get('token')

  await api.delete(`/courses/${courseId}/historic`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
