import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateBehaviorsBatchProps {
  formData: FormData
  courseId: string
}

export async function updateBehaviorsBatch({
  formData,
  courseId,
}: UpdateBehaviorsBatchProps) {
  const token = Cookies.get('token')

  await api.put(`/behaviors/batch?courseId=${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
