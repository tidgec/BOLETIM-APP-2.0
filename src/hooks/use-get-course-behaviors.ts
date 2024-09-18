import { useQuery } from '@tanstack/react-query'

import { getCourseBehaviors } from '@/http/get-course-behaviors'

export function useGetCourseBehaviors(courseId: string) {
  const query = useQuery({
    queryKey: ['courses', courseId, 'behaviors'],
    queryFn: () => getCourseBehaviors({ courseId }),
    staleTime: Infinity,
  })

  return {
    ...query,
    behaviors: query.data?.behaviors,
  }
}
