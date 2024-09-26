import { Link, useSearchParams } from 'react-router-dom'

import { Discipline } from '@/components/discipline'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetDisciplines } from '@/hooks/use-get-disciplines'

export function ListDisciplinesPage() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const method = searchParams.get('method') ?? ''

  const {
    disciplines,
    pages,
    totalItems,
    isLoading: isLoadingGetDisciplines,
  } = useGetDisciplines({ page })

  return (
    <div className="container mx-auto w-full p-4">
      <section className="max-w[90rem] mx-auto w-full">
        <h2 className="w-full border-b-2 border-black py-4 text-xl font-semibold">
          Disciplinas
        </h2>
        <div className="mb-4 flex items-center py-4">
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Pesquise pela disciplina"
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoadingGetDisciplines ? (
            <>
              <Skeleton className="h-10 rounded bg-slate-300" />
              <Skeleton className="h-10 rounded bg-slate-300" />
              <Skeleton className="h-10 rounded bg-slate-300" />
            </>
          ) : (
            disciplines?.map((discipline) => (
              <Link
                key={discipline.id}
                to={`/disciplines/${discipline.id}/${method}?discipline=${discipline.name}`}
              >
                <Discipline name={discipline.name} />
              </Link>
            ))
          )}
        </div>

        {disciplines && (
          <Pagination
            items={totalItems ?? 0}
            pages={pages ?? 0}
            page={page ? Number(page) : 0}
          />
        )}
      </section>
    </div>
  )
}
