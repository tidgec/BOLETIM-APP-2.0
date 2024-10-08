import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { DeleteCoursePole } from '@/components/delete-course-pole'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreateCoursePole } from '@/hooks/use-create-course-pole'
import { useGetCoursePoles } from '@/hooks/use-get-course-poles'
import { useGetPoles } from '@/hooks/use-get-poles'
import { fail } from '@/utils/fail'

export function CoursePole() {
  const navigate = useNavigate()

  const { id } = useParams()

  const { poles } = useGetPoles()
  const { poles: coursePoles } = useGetCoursePoles({
    courseId: String(id),
  })

  const { mutateAsync: createCoursePoleFn, isPending } = useCreateCoursePole()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! O polo está sendo adicionado ao curso.',
    )
  }

  async function handleCreateCoursePole(poleId: string) {
    if (!id) throw new Error('Curso inexistente!')

    try {
      await createCoursePoleFn({
        courseId: id,
        poleId,
      })

      toast.success('Polo adicionado ao curso com sucesso!', {
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
      <section className="mx-auto w-full text-center sm:text-left md:max-w-[90rem] md:px-4">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar polos do curso
        </h2>

        <div className="my-4 flex flex-col items-center justify-between gap-2 lg:flex-row lg:items-start">
          <aside className="w-full max-w-72 space-y-3 rounded bg-pmpa-blue-500 p-4 text-white">
            <p className="text-lg font-semibold">Polos Adicionados ao curso:</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {coursePoles ? (
                coursePoles.map((coursePole) => (
                  <DeleteCoursePole key={coursePole.id} pole={coursePole} />
                ))
              ) : (
                <>
                  <Skeleton className="h-16 w-28 rounded bg-slate-300" />
                  <Skeleton className="h-16 w-28 rounded bg-slate-300" />
                </>
              )}
            </div>
          </aside>

          <div className="w-full max-w-4xl space-y-2 rounded bg-pmpa-blue-500 p-4">
            <div className="md:grid-col-3 grid grid-cols-1 sm:grid-cols-2 md:gap-4">
              {poles ? (
                poles?.map((pole) => (
                  <div
                    key={pole.id}
                    className="flex items-center justify-between gap-2 space-x-2 rounded bg-pmpa-blue-700 px-6 py-4 text-white"
                  >
                    <span className="font-bold">{pole.name}</span>
                    <Button
                      variant={'ghost'}
                      className="rounded"
                      onClick={() => handleCreateCoursePole(pole.id)}
                    >
                      Adicionar
                    </Button>
                  </div>
                ))
              ) : (
                <>
                  <Skeleton className="h-16 w-48 rounded bg-slate-300" />
                  <Skeleton className="h-16 w-48 rounded bg-slate-300" />
                  <Skeleton className="h-16 w-48 rounded bg-slate-300" />
                  <Skeleton className="h-16 w-48 rounded bg-slate-300" />
                </>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                variant={'link'}
                className="text-white"
                onClick={() =>
                  navigate(`/courses/management/${id}/disciplines`)
                }
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
