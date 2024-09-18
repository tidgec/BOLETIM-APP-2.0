import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateStudentProps {
  username: string
  email: string
  cpf: string
  civilId?: string
  militaryId?: string
  birthday: string
  courseId: string
  poleId: string
}

export async function createStudent({
  username,
  email,
  cpf,
  civilId,
  militaryId,
  birthday,
  courseId,
  poleId,
}: CreateStudentProps) {
  const token = Cookies.get('token')

  await api.post(
    '/students',
    {
      username,
      email,
      cpf,
      civilId,
      militaryId,
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
