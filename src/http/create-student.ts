import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface CreateStudentProps {
  username: string
  email: string
  cpf: string
  civilId: string
  birthday: string
  courseId: string
  poleId: string
}

export async function createStudent({
  username,
  email,
  cpf,
  civilId,
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
