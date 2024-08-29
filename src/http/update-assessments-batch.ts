import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateStudentsBatchProps {
  formData: FormData
  courseId: string
}

export async function updateAssessmentsBatch({
  formData,
  courseId,
}: UpdateStudentsBatchProps) {
  const token = Cookies.get('token')

  await api.put(`/assessments/batch?courseId=${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
