import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface ActiveManagerStatusProps {
  courseId: string
  managerId: string
  reason: string
}

export async function activeManagerStatus({
  courseId,
  managerId,
  reason,
}: ActiveManagerStatusProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/courses/${courseId}/managers/${managerId}/active-status`,
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
