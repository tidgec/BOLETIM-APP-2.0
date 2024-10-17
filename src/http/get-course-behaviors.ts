import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface GetCourseBehaviorsRequest {
  courseId: string
}

export interface GetCourseBehaviorsResponse {
  behaviors: {
    id: string
    studentId: string
    january?: number | null
    february?: number | null
    march?: number | null
    april?: number | null
    may?: number | null
    jun?: number | null
    july?: number | null
    august?: number | null
    september?: number | null
    october?: number | null
    november?: number | null
    december?: number | null
    currentYear: number
    module: number
  }[]
}

export async function getCourseBehaviors({
  courseId,
}: GetCourseBehaviorsRequest) {
  const token = Cookies.get('token')

  const response = await api.get<GetCourseBehaviorsResponse>(
    `/courses/${courseId}/behaviors`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    behaviors: response.data.behaviors,
  }
}
