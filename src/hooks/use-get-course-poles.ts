import { useQuery } from '@tanstack/react-query'

import { getCoursePoles } from '@/http/get-course-poles'

interface GetCoursePolesProps {
  courseId: string
}

export function useGetCoursePoles({ courseId }: GetCoursePolesProps) {
  const query = useQuery({
    queryKey: ['course-poles', courseId],
    queryFn: () => getCoursePoles({ courseId }),
    staleTime: Infinity,
  })

  return {
    ...query,
    poles: query.data?.poles,
  }
}
