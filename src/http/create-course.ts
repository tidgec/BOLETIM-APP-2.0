import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateCourseRequest {
  name: string
  formula: 'CAS' | 'CGS' | 'CFP' | 'CHO' | 'CFO' | 'none'
  startAt?: string
  endsAt: string
  imageUrl: string
}

interface CreateCourseResponse {
  id: string
}

export async function createCourse({
  name,
  formula,
  startAt,
  endsAt,
  imageUrl,
}: CreateCourseRequest) {
  const token = Cookies.get('token')

  const response = await api.post<CreateCourseResponse>(
    '/courses',
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

  return {
    id: response.data.id,
  }
}
