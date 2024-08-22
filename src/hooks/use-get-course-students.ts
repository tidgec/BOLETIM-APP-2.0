import { getCourseStudents } from '@/http/get-course-students'
import { useQuery } from '@tanstack/react-query'

interface GetCourseStudentsProps {
  courseId: string
  poleId?: string
  username?: string
  cpf?: string
  page?: string
}

export function useGetCourseStudents({
  courseId,
  poleId,
  cpf,
  username,
  page,
}: GetCourseStudentsProps) {
  const query = useQuery({
    queryKey: ['courses', 'students', courseId, poleId, cpf, username, page],
    queryFn: () => getCourseStudents({ courseId, poleId, cpf, username, page }),
  })

  return {
    ...query,
    students: query.data?.students,
    totalItems: query.data?.totalItems,
    pages: query.data?.pages,
  }
}
