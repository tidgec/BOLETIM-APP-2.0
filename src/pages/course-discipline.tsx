import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { CreateCourseDisciplineForm } from '@/components/create-course-discipline-form'
import { DeleteCourseDiscipline } from '@/components/delete-course-discipline'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteDiscipline } from '@/hooks/use-delete-discipline'
import { useGetCourseDisciplines } from '@/hooks/use-get-course-disciplines'
import { useGetDisciplines } from '@/hooks/use-get-disciplines'
import { fail } from '@/utils/fail'

export function CourseDiscipline() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const navigate = useNavigate()

  const { id } = useParams()

  const { disciplines, pages, totalItems } = useGetDisciplines({
    page,
  })
  const { disciplines: courseDisciplines } = useGetCourseDisciplines({
    courseId: String(id),
  })

  const { mutateAsync: deleteDisciplineFn, isPending } = useDeleteDiscipline()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! A disciplina está sendo removida do curso.',
    )
  }

  async function handleDeleteDiscipline(id: string) {
    try {
      await deleteDisciplineFn({
        id,
      })

      toast.success('Disciplina deletada com sucesso!', {
        duration: 1000,
        onAutoClose: () => {
          toast.dismiss(toastId)
        },
      })
    } catch (err) {
      fail(err, toastId)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full px-2 text-center sm:text-left md:max-w-[90rem] md:px-4">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar disciplinas do curso
        </h2>

        <div className="my-4 flex flex-col items-center justify-between gap-2 lg:flex-row lg:items-start">
          <aside className="h-[32rem] w-full max-w-md space-y-3 overflow-auto rounded bg-pmpa-blue-500 p-4 text-white">
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

          <div className="flex-1 rounded bg-pmpa-blue-500 p-4">
            <Button variant={'link'} className="text-white">
              <Link to={'/disciplines/add'}>
                Adicionar nova disciplina na plataforma.
              </Link>
            </Button>

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
                    <div className="flex w-full items-center justify-end">
                      <Button
                        variant={'destructive'}
                        size={'sm'}
                        onClick={() => handleDeleteDiscipline(discipline.id)}
                      >
                        Deletar disciplina
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <Skeleton className="h-64 w-[28rem] rounded bg-slate-300" />
                  <Skeleton className="h-64 w-[28rem] rounded bg-slate-300" />
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
            <Pagination
              items={totalItems ?? 0}
              page={Number(page)}
              pages={pages ?? 0}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
