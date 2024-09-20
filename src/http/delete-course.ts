import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DeleteCourseProps {
  id: string
}

export async function deleteCourse({ id }: DeleteCourseProps) {
  const token = Cookies.get('token')

  await api.delete(`/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
