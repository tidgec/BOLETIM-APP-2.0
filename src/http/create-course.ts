import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateCourseProps {
  name: string
  formula: 'CAS' | 'CGS' | 'CFP' | 'CHO' | 'CFO' | 'none'
  endsAt: string
  imageUrl: string
}

export async function createCourse({
  name,
  formula,
  endsAt,
  imageUrl,
}: CreateCourseProps) {
  const token = Cookies.get('token')

  await api.post(
    '/courses',
    {
      name,
      formula,
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
