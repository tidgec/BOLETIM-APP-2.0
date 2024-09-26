import { useQuery } from '@tanstack/react-query'

import {
  getCourseDisciplines,
  GetCourseDisciplinesRequest,
} from '@/http/get-course-disciplines'

export function useGetCourseDisciplines({
  courseId,
  disciplineName,
}: GetCourseDisciplinesRequest) {
  const query = useQuery({
    queryKey: ['course-disciplines', courseId, disciplineName],
    queryFn: () => getCourseDisciplines({ courseId, disciplineName }),
    staleTime: Infinity,
  })

  return {
    ...query,
    disciplines: query.data?.disciplines,
  }
}
