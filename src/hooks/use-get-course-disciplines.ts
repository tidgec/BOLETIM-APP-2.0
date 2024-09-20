import { useQuery } from '@tanstack/react-query'

import { getCourseDisciplines } from '@/http/get-course-disciplines'

export function useGetCourseDisciplines(courseId: string) {
  const query = useQuery({
    queryKey: ['course-disciplines', courseId],
    queryFn: () => getCourseDisciplines({ courseId }),
    staleTime: Infinity,
  })

  return {
    ...query,
    disciplines: query.data?.disciplines,
  }
}
