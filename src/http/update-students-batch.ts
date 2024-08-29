import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateStudentsBatchProps {
  formData: FormData
  courseId: string
}

export async function updateStudentsBatch({
  formData,
  courseId,
}: UpdateStudentsBatchProps) {
  const token = Cookies.get('token')

  await api.put(`/courses/${courseId}/students/batch`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
