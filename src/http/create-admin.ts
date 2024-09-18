import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateAdminProps {
  username: string
  email: string
  cpf: string
  password: string
  civilId?: string
  militaryId?: string
  birthday: string
}

export async function createAdmin({
  username,
  email,
  cpf,
  password,
  civilId,
  militaryId,
  birthday,
}: CreateAdminProps) {
  const token = Cookies.get('token')

  await api.post(
    '/administrators',
    {
      username,
      email,
      password,
      cpf,
      civilId,
      militaryId,
      birthday,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
