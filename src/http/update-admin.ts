import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface UpdateAdminRequest {
  id: string
  username?: string
  cpf?: string
  email?: string
  password?: string
  birthday?: string
  civilId?: string
}

export async function updateAdmin({
  id,
  username,
  cpf,
  email,
  password,
  birthday,
  civilId,
}: UpdateAdminRequest) {
  const token = Cookies.get('token')

  await api.put(
    `/administrators/${id}`,
    {
      username,
      cpf,
      email,
      password,
      birthday,
      civilId: civilId ? Number(civilId) : undefined,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
