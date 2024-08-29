import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateStudentProps {
  username?: string
  email?: string
  cpf?: string
  civilId?: string
  birthday?: string
  courseId?: string
  poleId?: string
}

export async function updateStudent({
  username,
  email,
  cpf,
  civilId,
  birthday,
  courseId,
  poleId,
}: UpdateStudentProps) {
  const token = Cookies.get('token')

  await api.post(
    '/students',
    {
      username,
      email,
      cpf,
      civilId: Number(civilId),
      courseId,
      poleId,
      birthday,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
