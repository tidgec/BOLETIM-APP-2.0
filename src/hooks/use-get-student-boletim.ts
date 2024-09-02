import { useQuery } from '@tanstack/react-query'

import {
  getStudentBoletim,
  GetStudentBoletimRequest,
} from '@/http/get-student-boletim'

export function useGetStudentBoletim({
  courseId,
  studentId,
  formula,
}: GetStudentBoletimRequest) {
  const query = useQuery({
    queryKey: ['boletims', courseId, studentId, formula],
    queryFn: () => getStudentBoletim({ courseId, studentId, formula }),
  })

  return {
    ...query,
    grades: query.data?.grades,
    behaviorMonths: query.data?.behaviorMonths,
  }
}
