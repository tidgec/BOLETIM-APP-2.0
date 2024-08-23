import { search } from '@/http/search'
import { useQuery } from '@tanstack/react-query'

export function useSearch(searchQuery: string) {
  const query = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => search({ query: searchQuery }),
  })

  return {
    ...query,
    users: query.data?.searchs,
    totalItems: query.data?.totalItems,
    pages: query.data?.pages,
  }
}
