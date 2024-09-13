import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface RemoveBehaviorsGradeBatchProps {
  formData: FormData
  courseId: string
}

export async function removeBehaviorsGradeBatch({
  formData,
  courseId,
}: RemoveBehaviorsGradeBatchProps) {
  const token = Cookies.get('token')

  await api.put(`/behaviors/batch/remove?courseId=${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
