import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetCourseAssessmentsRequest {
  courseId: string
}

export interface GetCourseAssessmentsResponse {
  assessments: {
    id: string
  }[]
}

export async function getCourseAssessments({
  courseId,
}: GetCourseAssessmentsRequest): Promise<GetCourseAssessmentsResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetCourseAssessmentsResponse>(
    `/courses/${courseId}/assessments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    assessments: response.data.assessments,
  }
}
