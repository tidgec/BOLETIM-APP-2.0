import { getCourseDisciplines } from '@/http/get-course-disciplines'
import { useQuery } from '@tanstack/react-query'

export function useGetCourseDisciplines(courseId: string) {
  const query = useQuery({
    queryKey: ['courses', 'disciplines'],
    queryFn: () => getCourseDisciplines({ courseId }),
  })

  return {
    ...query,
    disciplines: query.data?.disciplines,
  }
}
