import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DeleteCoursePoleRequest {
  courseId: string
  poleId: string
}

export async function deleteCoursePole({
  courseId,
  poleId,
}: DeleteCoursePoleRequest) {
  const token = Cookies.get('token')

  await api.delete(`/courses/${courseId}/poles/${poleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
