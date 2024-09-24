import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DisableAdminStatusProps {
  id: string
  reason: string
}

export async function disableAdminStatus({
  id,
  reason,
}: DisableAdminStatusProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/administrators/${id}/disable-status`,
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
