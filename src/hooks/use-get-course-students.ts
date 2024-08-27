import { getCourseStudents } from '@/http/get-course-students'
import { useQuery } from '@tanstack/react-query'

interface GetCourseStudentsProps {
  courseId: string
  poleId?: string
  username?: string
  cpf?: string
  page?: string
  isEnabled?: boolean
}

export function useGetCourseStudents({
  courseId,
  poleId,
  cpf,
  username,
  page,
  isEnabled,
}: GetCourseStudentsProps) {
  const query = useQuery({
    queryKey: [
      'student-courses',
      courseId,
      poleId,
      cpf,
      username,
      page,
      isEnabled,
    ],
    queryFn: () =>
      getCourseStudents({ courseId, poleId, cpf, username, page, isEnabled }),
  })

  return {
    ...query,
    students: query.data?.students,
    totalItems: query.data?.totalItems,
    pages: query.data?.pages,
  }
}
