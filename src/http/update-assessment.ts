import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateAssessmentProps {
  id: string
  vf?: number
  avi?: number
  avii?: number
  vfe?: number
}

export async function updateAssessment({
  id,
  vf,
  avi,
  avii,
  vfe,
}: UpdateAssessmentProps) {
  const token = Cookies.get('token')

  await api.put(
    `/assessments/${id}`,
    {
      vf,
      avi,
      avii,
      vfe,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
