import { getCourses } from '@/http/get-courses'
import { useQuery } from '@tanstack/react-query'

export function useGetCourses(page: number) {
  const query = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(page),
  })

  return {
    ...query,
    courses: query.data?.courses,
    pages: query.data?.pages,
    totalItems: query.data?.totalItems,
  }
}
