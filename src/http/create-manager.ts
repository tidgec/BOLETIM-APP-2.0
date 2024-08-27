import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface CreateManagerProps {
  username: string
  email: string
  cpf: string
  civilId: string
  birthday: string
  courseId: string
  poleId: string
}

export async function createManager({
  username,
  email,
  cpf,
  civilId,
  birthday,
  courseId,
  poleId,
}: CreateManagerProps) {
  const token = Cookies.get('token')

  await api.post(
    '/managers',
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
