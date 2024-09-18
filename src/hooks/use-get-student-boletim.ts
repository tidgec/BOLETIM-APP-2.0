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
  const expiresIn = 1000 * 60 * 60 // 1h

  const query = useQuery({
    queryKey: ['boletims', courseId, studentId, formula],
    queryFn: () => getStudentBoletim({ courseId, studentId, formula }),
    staleTime: expiresIn,
  })

  return {
    ...query,
    grades: query.data?.grades,
    behaviorMonths: query.data?.behaviorMonths,
  }
}
