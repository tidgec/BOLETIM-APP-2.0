import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateCourseDisciplineRequest {
  courseId: string
  disciplineId: string
  expected: string
  hours: number
  module: number
}

export async function createCourseDiscipline({
  courseId,
  disciplineId,
  expected,
  hours,
  module,
}: CreateCourseDisciplineRequest) {
  const token = Cookies.get('token')

  await api.post(
    `/courses/${courseId}/disciplines`,
    {
      disciplineId,
      expected,
      hours,
      module,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
