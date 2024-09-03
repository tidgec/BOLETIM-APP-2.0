import { useQuery } from '@tanstack/react-query'

import { getCourseAssessments } from '@/http/get-course-assessments'

interface GetCourseAssessmentsProps {
  courseId: string
}

export function useGetCourseAssessments({
  courseId,
}: GetCourseAssessmentsProps) {
  const query = useQuery({
    queryKey: ['course-assessments', courseId],
    queryFn: () => getCourseAssessments({ courseId }),
  })

  return {
    ...query,
    assessments: query.data?.assessments,
  }
}
