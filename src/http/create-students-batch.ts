import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

interface CreateStudentsBatchProps {
  formData: FormData
  courseId: string
}

export async function createStudentsBatch({
  formData,
  courseId,
}: CreateStudentsBatchProps) {
  const token = Cookies.get('token')

  await api.post(`/courses/${courseId}/students/batch`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}