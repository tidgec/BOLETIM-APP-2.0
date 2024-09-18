import { useQuery } from '@tanstack/react-query'

import { getCourse, GetCourseRequest } from '@/http/get-course'

export function useGetCourse({ courseId }: GetCourseRequest) {
  const query = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourse({ courseId }),
    staleTime: Infinity,
  })

  return {
    ...query,
    course: query.data?.course,
  }
}
