import { api } from '@/lib/axios'

interface CreateAssessmentProps {
  disciplineId: string
  studentId: string
  courseId: string
  vf: number
  avi?: number
  avii?: number
  vfe?: number
}

export async function createAssessment({
  disciplineId,
  courseId,
  studentId,
  vf,
  avi,
  avii,
  vfe,
}: CreateAssessmentProps) {
  return await api.post(`/disciplines/${disciplineId}/assessment`, {
    courseId,
    studentId,
    vf,
    avi,
    avii,
    vfe,
  })
}
