import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface CreateAssessmentProps {
  disciplineId: string
  studentId: string
  courseId: string
  vf: number
  avi?: number
  avii?: number
  vfe?: number
}

export async function createAssessment({
  disciplineId,
  courseId,
  studentId,
  vf,
  avi,
  avii,
  vfe,
}: CreateAssessmentProps) {
  const token = Cookies.get('token')

  await api.post(`/disciplines/${disciplineId}/assessment`, {
    courseId,
    studentId,
    vf,
    avi,
    avii,
    vfe,
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
