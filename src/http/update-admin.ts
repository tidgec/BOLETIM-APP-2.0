import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateAdminRequest {
  id: string
  username?: string
  cpf?: string
  email?: string
  password?: string
  birthday?: string
  civilId?: string
  militaryId?: string
  fatherName?: string
  motherName?: string
}

export async function updateAdmin({
  id,
  username,
  cpf,
  email,
  password,
  birthday,
  civilId,
  militaryId,
  fatherName,
  motherName,
}: UpdateAdminRequest) {
  const token = Cookies.get('token')

  await api.put(
    `/administrators/${id}`,
    {
      username,
      email,
      cpf,
      password,
      civilId,
      militaryId,
      fatherName,
      motherName,
      birthday,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
