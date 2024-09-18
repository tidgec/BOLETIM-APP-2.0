import { useQuery } from '@tanstack/react-query'

import { getCourseManagers } from '@/http/get-course-managers'

interface GetCourseManagersProps {
  courseId: string
  poleId?: string
  username?: string
  cpf?: string
  page?: string
  isEnabled?: boolean
}

export function useGetCourseManagers({
  courseId,
  poleId,
  cpf,
  username,
  page,
  isEnabled,
}: GetCourseManagersProps) {
  const query = useQuery({
    queryKey: [
      'manager-courses',
      courseId,
      poleId,
      cpf,
      username,
      page,
      isEnabled,
    ],
    queryFn: () =>
      getCourseManagers({ courseId, poleId, cpf, username, page, isEnabled }),
    staleTime: Infinity,
  })

  return {
    ...query,
    managers: query.data?.managers,
    totalItems: query.data?.totalItems,
    pages: query.data?.pages,
  }
}
