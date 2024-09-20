import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreateCoursePole } from '@/hooks/use-create-course-pole'
import { useGetCoursePoles } from '@/hooks/use-get-course-poles'
import { useGetPoles } from '@/hooks/use-get-poles'

export function AddCoursePole() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const { poles } = useGetPoles()
  const { poles: coursePoles } = useGetCoursePoles({
    courseId: String(courseId),
  })

  const { mutateAsync: createCoursePoleFn } = useCreateCoursePole()

  async function handleCreateCoursePole(poleId: string) {
    if (!courseId) throw new Error('Curso inexistente!')

    try {
      await createCoursePoleFn({
        courseId,
        poleId,
      })

      toast.success('Polo adicionado com sucesso!', {
        duration: 1000,
      })

      navigate(`/courses/add/disciplines?courseId=${courseId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar pólos do curso
        </h2>

        <div className="flex items-center justify-between gap-2">
          <aside className="space-y-3 rounded bg-pmpa-blue-500 p-4 text-white">
            <p className="text-lg font-semibold">Polos Adicionados ao curso:</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {coursePoles
                ? coursePoles.map((coursePole) => (
                    <div
                      key={coursePole.id}
                      className="flex flex-col gap-1 rounded bg-pmpa-blue-600 px-2 py-1"
                    >
                      <span className="font-medium">{coursePole.name}</span>
                      <Button variant={'destructive'} size={'sm'}>
                        Deletar
                      </Button>
                    </div>
                  ))
                : ''}
            </div>
          </aside>

          <div className="md:grid-col-3 my-12 grid max-w-4xl grid-cols-2 gap-4 rounded bg-pmpa-blue-500 p-4 lg:grid-cols-4">
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
        </div>
      </section>
    </div>
  )
}
