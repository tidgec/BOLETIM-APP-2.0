import { useQuery } from '@tanstack/react-query'

import {
  getCourseAssessments,
  type GetCourseAssessmentsRequest,
} from '@/http/get-course-assessments'

export function useGetCourseAssessments({
  courseId,
  disciplineId,
}: GetCourseAssessmentsRequest) {
  const expiresIn = 1000 * 60 * 60 // 1hr

  const query = useQuery({
    queryKey: ['course-assessments', courseId],
    queryFn: () => getCourseAssessments({ courseId, disciplineId }),
    staleTime: expiresIn,
  })

  return {
    ...query,
    assessments: query.data?.assessments,
  }
}
