import { useNavigate, useParams } from 'react-router-dom'

import { CreateCourseDisciplineForm } from '@/components/create-course-discipline-form'
import { DeleteCourseDiscipline } from '@/components/delete-course-discipline'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseDisciplines } from '@/hooks/use-get-course-disciplines'
import { useGetDisciplines } from '@/hooks/use-get-disciplines'

export function CourseDiscipline() {
  const navigate = useNavigate()

  const { id } = useParams()

  const { disciplines } = useGetDisciplines({})
  const { disciplines: courseDisciplines } = useGetCourseDisciplines({
    courseId: String(id),
  })

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full px-2 text-center sm:text-left md:max-w-[90rem] md:px-4">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar disciplinas do curso
        </h2>

        <div className="my-4 flex flex-col items-center justify-between gap-2 lg:flex-row">
          <aside className="w-full max-w-72 space-y-3 rounded bg-pmpa-blue-500 p-4 text-white">
            <p className="text-lg font-semibold">
              Disciplinas Adicionadas ao curso:
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {courseDisciplines ? (
                courseDisciplines.map((courseDiscipline) => (
                  <DeleteCourseDiscipline
                    key={courseDiscipline.disciplineId}
                    discipline={courseDiscipline}
                  />
                ))
              ) : (
                <>
                  <Skeleton className="h-16 w-28 rounded bg-slate-300" />
                  <Skeleton className="h-16 w-28 rounded bg-slate-300" />
                </>
              )}
            </div>
          </aside>

          <div className="max-w-4xl rounded bg-pmpa-blue-500 p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {disciplines ? (
                disciplines?.map((discipline) => (
                  <div
                    key={discipline.id}
                    className="flex flex-col items-start gap-2 rounded bg-pmpa-blue-700 p-4 text-white"
                  >
                    <span className="font-bold">
                      {discipline.name.toUpperCase()}
                    </span>

                    <CreateCourseDisciplineForm discipline={discipline} />
                  </div>
                ))
              ) : (
                <>
                  <Skeleton className="h-56 w-72 rounded bg-slate-300" />
                  <Skeleton className="h-56 w-72 rounded bg-slate-300" />
                </>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                variant={'link'}
                className="text-white"
                onClick={() => navigate(`/courses`)}
              >
                Voltar ao início
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
