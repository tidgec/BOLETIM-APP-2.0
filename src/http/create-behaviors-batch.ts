import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateBehaviorsBatchProps {
  formData: FormData
  courseId: string
}

export async function createBehaviorsBatch({
  formData,
  courseId,
}: CreateBehaviorsBatchProps) {
  const token = Cookies.get('token')

  await api.post(`/behaviors/batch?courseId=${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
