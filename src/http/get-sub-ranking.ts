import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

export interface GetSubRankingRequest {
  courseId?: string
  page?: string
  disciplineModule: number
}

interface GetSubRankingResponse {
  studentsWithAverage:
    | {
        studentAverage: {
          averageInform: {
            geralAverage: number | string
            behaviorAverageStatus:
              | {
                  behaviorAverage: number
                  status: 'disapproved' | 'approved'
                }[]
              | {
                  behaviorAverage: number
                  status: 'disapproved' | 'approved'
                }
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

          assessmentsPerPeriod: {
            [x: string]: {
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
              isRecovering: boolean
              id: string
              module: number
            }[]
          }

          assessments: {
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
            isRecovering: boolean
            id: string
            module: number
          }[]
          assessmentsCount: number
        }
        studentBirthday?: string
        studentId: string
        studentName?: string
        studentCivilOrMilitaryId?: string
        studentPole?: string
      }[]
    | {
        studentAverage: {
          averageInform: {
            geralAverage: number | string
            behaviorAverageStatus:
              | {
                  behaviorAverage: number
                  status: 'disapproved' | 'approved'
                }[]
              | {
                  behaviorAverage: number
                  status: 'disapproved' | 'approved'
                }
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

          assessments: {
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
            isRecovering: boolean
            id: string
            module: number
          }[]
          assessmentsCount: number
        }
        studentBirthday?: string
        studentId: string
        studentName?: string
        studentCivilOrMilitaryId?: string
        studentPole?: string
      }[]
  pages?: number
  totalItems?: number
}

export async function getSubRanking({
  courseId,
  page,
  disciplineModule,
}: GetSubRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.get<GetSubRankingResponse>(
      `/courses/${courseId}/manager/sub`,
      {
        params: {
          page,
          hasBehavior: 'true',
          disciplineModule,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return {
      overanking: response.data.studentsWithAverage,
    }
  }

  const response = await api.get<GetSubRankingResponse>(
    `/courses/${courseId}/classification/sub`,
    {
      params: {
        page,
        hasBehavior: 'true',
        disciplineModule,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    ranking: response.data.studentsWithAverage,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
