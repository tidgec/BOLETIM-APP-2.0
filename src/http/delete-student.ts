import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface DeleteStudentProps {
  id: string
}

export async function deleteStudent({ id }: DeleteStudentProps) {
  const token = Cookies.get('token')

  await api.delete(`/students/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
