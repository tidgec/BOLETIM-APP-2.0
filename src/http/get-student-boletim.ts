import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetStudentBoletimRequest {
  courseId: string
  studentId: string
  formula: 'period' | 'module'
}

interface GetStudentBoletimResponse {
  grades: {
    averageInform: {
      geralAverage: number | string
      behaviorAverageStatus: {
        behaviorAverage: number
        status: 'disapproved' | 'approved'
      }[]

      behaviorsCount: number
      studentAverageStatus: {
        concept:
          | 'excellent'
          | 'very good'
          | 'good'
          | 'regular'
          | 'insufficient'
          | 'no income'
        status:
          | 'approved'
          | 'disapproved'
          | 'approved second season'
          | 'disapproved second season'
          | 'second season'
      }
    }

    assessments: ({
      courseId: string
      disciplineId: string

      vf: number
      avi: number | null
      avii: number | null
      vfe?: number | null
      average: number
      status:
        | 'approved'
        | 'disapproved'
        | 'approved second season'
        | 'second season'
        | 'no income'
      isRecovering: boolean
      id: string
      module: number
    } | null)[]
    assessmentsCount: number
  }

  behaviorMonths: {
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
    module: number
  }[]
}

export async function getStudentBoletim({
  courseId,
  studentId,
  formula,
}: GetStudentBoletimRequest): Promise<GetStudentBoletimResponse> {
  const token = Cookies.get('token')

  const response = await api.get<GetStudentBoletimResponse>(
    `/courses/${courseId}/students/${studentId}/average`,
    {
      params: {
        type: formula,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    grades: response.data.grades,
    behaviorMonths: response.data.behaviorMonths,
  }
}
