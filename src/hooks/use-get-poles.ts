import { useQuery } from '@tanstack/react-query'

import { getPoles } from '@/http/get-poles'

export function useGetPoles() {
  const query = useQuery({
    queryKey: ['poles'],
    queryFn: getPoles,
  })

  return {
    poles: query.data?.poles,
    ...query,
  }
}
