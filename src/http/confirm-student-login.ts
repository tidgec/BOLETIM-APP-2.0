import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface ConfirmStudentLoginRequest {
  fatherName?: string | undefined
  motherName?: string
  militaryId?: string | undefined
  state?: string | undefined
  county?: string | undefined
}

export async function confirmStudentLogin({
  fatherName,
  motherName,
  militaryId,
  state,
  county,
}: ConfirmStudentLoginRequest) {
  const token = Cookies.get('token')

  await api.patch(
    '/students/confirm',
    {
      fatherName,
      motherName,
      militaryId,
      state,
      county,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
