import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface RemoveAssessmentGradesBatchProps {
  formData: FormData
  courseId: string
}

export async function removeAssessmentGradesBatch({
  formData,
  courseId,
}: RemoveAssessmentGradesBatchProps) {
  const token = Cookies.get('token')

  await api.put(`/assessments/batch/remove?courseId=${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
