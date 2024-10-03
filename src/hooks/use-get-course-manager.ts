import { useQuery } from '@tanstack/react-query'

import { getCourseManager } from '@/http/get-course-manager'

interface GetCourseManagerProps {
  courseId: string
  managerId: string
}

export function useGetCourseManager({
  courseId,
  managerId,
}: GetCourseManagerProps) {
  const query = useQuery({
    queryKey: ['manager-course', courseId, managerId],
    queryFn: () => getCourseManager({ courseId, managerId }),
    staleTime: Infinity,
  })

  return {
    ...query,
    manager: query.data?.manager,
  }
}
