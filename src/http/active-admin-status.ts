import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface ActiveAdminStatusProps {
  id: string
  reason: string
}

export async function activeAdminStatus({
  id,
  reason,
}: ActiveAdminStatusProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/administrators/${id}/active-status`,
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
