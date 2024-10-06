import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetCourseAssessmentsRequest {
  courseId: string
  disciplineId: string
}

export interface GetCourseAssessmentsResponse {
  assessments: {
    id: string
    courseId: string
    disciplineId: string
    studentId: string
    vf?: number
    avi?: number
    avii?: number
    vfe?: number
  }[]
}

export async function getCourseAssessments({
  courseId,
  disciplineId,
}: GetCourseAssessmentsRequest) {
  const token = Cookies.get('token')

  const response = await api.get<GetCourseAssessmentsResponse>(
    `/courses/${courseId}/disciplines/${disciplineId}/assessments`,
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
