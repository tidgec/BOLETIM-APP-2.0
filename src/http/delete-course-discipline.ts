import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DeleteCourseDisciplineRequest {
  courseId: string
  disciplineId: string
}

export async function deleteCourseDiscipline({
  courseId,
  disciplineId,
}: DeleteCourseDisciplineRequest) {
  const token = Cookies.get('token')

  await api.delete(`/courses/${courseId}/disciplines/${disciplineId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
