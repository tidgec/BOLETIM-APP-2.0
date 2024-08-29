import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateManagerProps {
  id: string
  courseId: string
  newCourseId: string
  poleId: string
  username?: string
  email?: string
  cpf?: string
  password?: string
  civilId?: string
  militaryId?: string
  fatherName?: string
  motherName?: string
  birthday?: string
}

export async function updateManager({
  id,
  courseId,
  newCourseId,
  username,
  poleId,
  email,
  cpf,
  password,
  civilId,
  militaryId,
  fatherName,
  motherName,
  birthday,
}: UpdateManagerProps) {
  const token = Cookies.get('token')

  await api.put(
    `/managers/${id}`,
    {
      courseId,
      newCourseId,
      poleId,
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
