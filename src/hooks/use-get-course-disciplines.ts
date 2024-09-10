import { useQuery } from '@tanstack/react-query'

import { getCourseDisciplines } from '@/http/get-course-disciplines'

export function useGetCourseDisciplines(courseId: string) {
  const query = useQuery({
    queryKey: ['courses', courseId, 'disciplines'],
    queryFn: () => getCourseDisciplines({ courseId }),
  })

  return {
    ...query,
    disciplines: query.data?.disciplines,
  }
}
