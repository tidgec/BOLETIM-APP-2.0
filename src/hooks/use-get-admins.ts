import { useQuery } from '@tanstack/react-query'

import { getAdmins } from '@/http/get-admins'

interface GetAdminsProps {
  username?: string
  cpf?: string
  page?: string
}

export function useGetAdmins({ cpf, username, page }: GetAdminsProps) {
  const query = useQuery({
    queryKey: ['admins', cpf, username, page],
    queryFn: () => getAdmins({ cpf, username, page }),
    staleTime: Infinity,
  })

  return {
    ...query,
    admins: query.data?.admins,
    totalItems: query.data?.totalItems,
    pages: query.data?.pages,
  }
}
