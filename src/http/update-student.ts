import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateStudentProps {
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

export async function updateStudent({
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
}: UpdateStudentProps) {
  const token = Cookies.get('token')

  await api.put(
    `/students/${id}`,
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
