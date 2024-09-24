import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface GetSubPoleRankingRequest {
  courseId?: string
  poleId: string
  page?: string
  hasBehavior?: string
  disciplineModule: number
}

interface GetSubPoleRankingResponse {
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
        studentName?: string
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
        studentName?: string
      }[]
  pages?: number
  totalItems?: number
}

export async function getSubPoleRanking({
  courseId,
  poleId,
  page,
  hasBehavior,
  disciplineModule,
}: GetSubPoleRankingRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const response = await api.get<GetSubPoleRankingResponse>(
    `/courses/${courseId}/poles/${poleId}/classification/sub`,
    {
      params: {
        page,
        hasBehavior: hasBehavior ?? 'true',
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
