import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateStudentsBatchProps {
  formData: FormData
  courseId: string
}

export async function createAssessmentsBatch({
  formData,
  courseId,
}: CreateStudentsBatchProps) {
  const token = Cookies.get('token')

  await api.post(`/assessments/batch?courseId=${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
