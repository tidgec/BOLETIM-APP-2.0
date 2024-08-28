import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface UpdateAssessmentProps {
  courseId: string
  disciplineId: string
  studentId: string
  vf?: number
  avi?: number
  avii?: number
  vfe?: number
}

export async function updateAssessment({
  courseId,
  disciplineId,
  studentId,
  vf,
  avi,
  avii,
  vfe,
}: UpdateAssessmentProps) {
  const token = Cookies.get('token')

  await api.put(
    `/disciplines/${disciplineId}/assessment`,
    {
      courseId,
      studentId,
      vf,
      avi,
      avii,
      vfe,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
