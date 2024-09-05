import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface CreateAcademicRecordRequest {
  courseId: string
  className: string
  startDate: string
  finishDate: string
  speechs?: number
  internships?: number
  totalHours?: number
  divisionBoss?: string
  commander?: string
}

export async function createAcademicRecord({
  courseId,
  className,
  startDate,
  finishDate,
  speechs,
  internships,
  totalHours,
  divisionBoss,
  commander,
}: CreateAcademicRecordRequest) {
  const token = Cookies.get('token')

  await api.post(
    `/courses/${courseId}/historic`,
    {
      className,
      startDate,
      finishDate,
      speechs,
      internships,
      totalHours,
      divisionBoss,
      commander,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
