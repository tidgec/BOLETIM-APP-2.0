import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface RemoveAssessmentGradeProps {
  courseId: string
  disciplineId: string
  studentId: string
  vf?: number
  avi?: number
  avii?: number
  vfe?: number
}

export async function removeAssessmentGrade({
  courseId,
  disciplineId,
  studentId,
  vf,
  avi,
  avii,
  vfe,
}: RemoveAssessmentGradeProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/disciplines/${disciplineId}/assessment/remove`,
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
