import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface ChangeManagerStatusProps {
  courseId: string
  managerId: string
  status: boolean
}

export async function changeManagerStatus({
  courseId,
  managerId,
  status,
}: ChangeManagerStatusProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/courses/${courseId}/managers/${managerId}/status`,
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
