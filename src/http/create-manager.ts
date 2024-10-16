import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateManagerProps {
  username: string
  email: string
  cpf: string
  civilId?: string
  militaryId?: string
  birthday: string
  courseId: string
  poleId: string
}

export async function createManager({
  username,
  email,
  cpf,
  civilId,
  militaryId,
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
