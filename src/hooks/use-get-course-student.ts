import { useQuery } from '@tanstack/react-query'

import { getCourseStudent } from '@/http/get-course-student'

interface GetCourseStudentProps {
  courseId: string
  studentId: string
}

export function useGetCourseStudent({
  courseId,
  studentId,
}: GetCourseStudentProps) {
  const query = useQuery({
    queryKey: ['student-course', courseId, studentId],
    queryFn: () => getCourseStudent({ courseId, studentId }),
  })

  return {
    ...query,
    student: query.data?.student,
  }
}
