import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateCourseRequest {
  id: string
  name?: string
  formula?: string
  startAt?: string
  endsAt?: string
  imageUrl?: string
}

export async function updateCourse({
  id,
  name,
  formula,
  startAt,
  endsAt,
  imageUrl,
}: UpdateCourseRequest) {
  const token = Cookies.get('token')

  await api.put(
    `/courses/${id}`,
    {
      name,
      formula,
      startAt,
      endsAt,
      imageUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
