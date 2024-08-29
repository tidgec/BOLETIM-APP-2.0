import { useQuery } from '@tanstack/react-query'

import { getCoursePoles } from '@/http/get-course-poles'

interface GetCoursePolesProps {
  courseId: string
}

export function useGetCoursePoles({ courseId }: GetCoursePolesProps) {
  const query = useQuery({
    queryKey: ['courses', 'poles'],
    queryFn: () => getCoursePoles({ courseId }),
  })

  return {
    ...query,
    poles: query.data?.poles,
  }
}
