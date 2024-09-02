import { useQuery } from '@tanstack/react-query'

import { getOverating, GetOveratingRequest } from '@/http/get-overating'

export function useGetOverating({ courseId, page }: GetOveratingRequest) {
  const query = useQuery({
    queryKey: ['overating', courseId, page],
    queryFn: () => getOverating({ courseId, page }),
  })

  return {
    ...query,
    overating: query.data?.overating,
  }
}
