import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetPoleAssessmentRankingRequest {
  courseId: string
  poleId: string
  page: string
}

interface GetPoleAssessmentRankingResponse {
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

          assessments: {
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
          assessmentsCount: number
        }
        studentBirthday?: string
        studentCivilID?: string
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
        studentCivilID?: string
        studentPole?: string
      }[]
}

export async function getPoleAssessmentRanking({
  courseId,
  poleId,
  page,
}: GetPoleAssessmentRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const response = await api.get<GetPoleAssessmentRankingResponse>(
    `/courses/${courseId}/poles/${poleId}/classification`,
    {
      params: {
        page,
        hasBehavior: 'false',
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    ranking: response.data.studentsWithAverage,
  }
}