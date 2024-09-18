import { useQuery } from '@tanstack/react-query'

import { getCourseAssessments } from '@/http/get-course-assessments'

interface GetCourseAssessmentsProps {
  courseId: string
}

export function useGetCourseAssessments({
  courseId,
}: GetCourseAssessmentsProps) {
  const expiresIn = 1000 * 60 * 60 // 1hr

  const query = useQuery({
    queryKey: ['course-assessments', courseId],
    queryFn: () => getCourseAssessments({ courseId }),
    staleTime: expiresIn,
  })

  return {
    ...query,
    assessments: query.data?.assessments,
  }
}
