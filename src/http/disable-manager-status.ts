import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DisableManagerStatusProps {
  courseId: string
  managerId: string
  reason: string
}

export async function disableManagerStatus({
  courseId,
  managerId,
  reason,
}: DisableManagerStatusProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/courses/${courseId}/managers/${managerId}/disable-status`,
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
