import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

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
