import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateCoursePoleRequest {
  courseId: string
  poleId: string
}

export async function createCoursePole({
  courseId,
  poleId,
}: CreateCoursePoleRequest) {
  const token = Cookies.get('token')

  await api.post(
    `/courses/${courseId}/poles`,
    {
      poleId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
