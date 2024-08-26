import { zodResolver } from '@hookform/resolvers/zod'
import { LucideSearch } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string(),
})

type SearchSchema = z.infer<typeof searchSchema>

export function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('query')

  const { handleSubmit, register } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: query ?? '',
    },
  })

  function handleSearch({ query }: SearchSchema) {
    setSearchParams((params) => {
      params.set('query', query)

      return params
    })
  }
  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="flex w-full max-w-3xl items-center gap-4 rounded-full bg-white px-6 py-2"
    >
      <LucideSearch size={20} className="h-4 w-4 text-slate-600" />
      <input
        type="text"
        placeholder="Busque por nome ou cpf..."
        className="flex-1 bg-transparent py-2 hover:outline-2"
        {...register('query')}
      />
      <button className="hidden"></button>
    </form>
  )
}
