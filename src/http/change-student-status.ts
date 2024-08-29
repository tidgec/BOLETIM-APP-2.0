import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface ChangeStudentStatusProps {
  courseId: string
  studentId: string
  status: boolean
}

export async function changeStudentStatus({
  courseId,
  studentId,
  status,
}: ChangeStudentStatusProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/courses/${courseId}/students/${studentId}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
