import { useQuery } from '@tanstack/react-query'

import { getCourses } from '@/http/get-courses'

export function useGetCourses(page?: string) {
  const query = useQuery({
    queryKey: ['courses', page],
    queryFn: () => getCourses(page),
  })

  return {
    ...query,
    courses: query.data?.courses,
    pages: query.data?.pages,
    totalItems: query.data?.totalItems,
  }
}
