import { useQuery } from '@tanstack/react-query'

import { getDisciplines, GetDisciplinesRequest } from '@/http/get-disciplines'

export function useGetDisciplines({ page }: GetDisciplinesRequest) {
  const query = useQuery({
    queryKey: ['disciplines', page],
    queryFn: () => getDisciplines({ page }),
  })

  return {
    disciplines: query.data?.disciplines,
    totalItems: query.data?.totalItems,
    pages: query.data?.pages,
    ...query,
  }
}
