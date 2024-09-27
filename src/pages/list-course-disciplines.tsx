import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Discipline } from '@/components/discipline'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseDisciplines } from '@/hooks/use-get-course-disciplines'

const disciplineFiltersSchema = z.object({
  name: z.string().optional(),
})

type DisciplineFiltersSchema = z.infer<typeof disciplineFiltersSchema>

export function ListCourseDisciplinesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const disciplineName = searchParams.get('disciplineName') ?? ''

  const { handleSubmit, register } = useForm<DisciplineFiltersSchema>({
    resolver: zodResolver(disciplineFiltersSchema),
    defaultValues: {
      name: disciplineName,
    },
  })

  const { disciplines, isLoading } = useGetCourseDisciplines({
    courseId: String(courseId),
    disciplineName,
  })

  const currentUrl = window.location.href
    .replace(`?courseId=${courseId}`, '')
    .replace(`&disciplineName=${disciplineName}`, '')

  function handleFilter({ name }: DisciplineFiltersSchema) {
    setSearchParams((state) => {
      if (name) {
        state.set('disciplineName', name)
      } else {
        state.delete('disciplineName')
      }

      return state
    })
  }

  return (
    <div className="container mx-auto w-full p-4">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-black py-4 text-xl font-semibold">
          Disciplinas
        </h2>

        <form
          className="mb-4 flex items-center py-4"
          onSubmit={handleSubmit(handleFilter)}
        >
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Pesquise pela disciplina"
            {...register('name')}
          />
        </form>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <Skeleton className="h-10 rounded bg-slate-300" />
              <Skeleton className="h-10 rounded bg-slate-300" />
              <Skeleton className="h-10 rounded bg-slate-300" />
            </>
          ) : (
            disciplines?.map((discipline) => (
              <Link
                key={discipline.disciplineId}
                to={`${currentUrl}/disciplines/${discipline.disciplineId}?courseId=${courseId}`}
              >
                <Discipline name={discipline.name} />
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
