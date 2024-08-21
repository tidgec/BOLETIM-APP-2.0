import { getCourseStudents } from '@/http/get-course-students'
import { useQuery } from '@tanstack/react-query'

interface GetCourseStudentsProps {
  courseId: string
  poleId?: string
}

export function useGetCourseStudents({
  courseId,
  poleId,
}: GetCourseStudentsProps) {
  const query = useQuery({
    queryKey: ['courses', 'students'],
    queryFn: () => getCourseStudents({ courseId, poleId }),
  })

  return {
    ...query,
    students: query.data?.students,
  }
}
