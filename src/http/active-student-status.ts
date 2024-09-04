import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface ActiveStudentStatusProps {
  courseId: string
  studentId: string
  reason: string
}

export async function activeStudentStatus({
  courseId,
  studentId,
  reason,
}: ActiveStudentStatusProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/courses/${courseId}/students/${studentId}/active-status`,
    {
      reason,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
