import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface CreateAdminProps {
  username: string
  email: string
  cpf: string
  password: string
  civilId: string
  birthday: string
}

export async function createAdmin({
  username,
  email,
  cpf,
  password,
  civilId,
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
      civilId: Number(civilId),
      birthday,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
