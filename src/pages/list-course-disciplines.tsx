import { Link, useSearchParams } from 'react-router-dom'

import { Discipline } from '@/components/discipline'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseDisciplines } from '@/hooks/use-get-course-disciplines'

export function ListCourseDisciplinesPage() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const { disciplines, isLoading } = useGetCourseDisciplines(String(courseId))
  const currentUrl = window.location.href.replace(`?courseId=${courseId}`, '')

  return (
    <div className="container mx-auto w-full p-4">
      <section className="mx-auto w-full max-w-[90rem]">
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
