import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DisableStudentStatusProps {
  courseId: string
  studentId: string
  reason: string
}

export async function disableStudentStatus({
  courseId,
  studentId,
  reason,
}: DisableStudentStatusProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/courses/${courseId}/students/${studentId}/disable-status`,
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
