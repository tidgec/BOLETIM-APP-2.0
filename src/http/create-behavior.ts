import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateBehaviorRequest {
  courseId: string
  studentId: string
  january?: number | null
  february?: number | null
  march?: number | null
  april?: number | null
  may?: number | null
  jun?: number | null
  july?: number | null
  august?: number | null
  september?: number | null
  october?: number | null
  november?: number | null
  december?: number | null
}

export async function createBehavior({
  courseId,
  studentId,
  january,
  february,
  march,
  april,
  may,
  jun,
  july,
  august,
  september,
  october,
  november,
  december,
}: CreateBehaviorRequest) {
  const token = Cookies.get('token')

  await api.post(
    `/courses/${courseId}/behavior`,
    {
      studentId,
      january,
      february,
      march,
      april,
      may,
      jun,
      july,
      august,
      september,
      october,
      november,
      december,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
