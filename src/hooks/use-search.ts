import { search, type SearchProps } from '@/http/search'
import { useQuery } from '@tanstack/react-query'

export function useSearch({ page, query: searchQuery }: SearchProps) {
  const query = useQuery({
    queryKey: ['search', page, searchQuery],
    queryFn: () => search({ query: searchQuery, page }),
  })

  return {
    ...query,
    users: query.data?.searchs,
    totalItems: query.data?.totalItems,
    pages: query.data?.pages,
  }
}
