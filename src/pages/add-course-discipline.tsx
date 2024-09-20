import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreateCourseDiscipline } from '@/hooks/use-create-course-discipline'
import { useGetDisciplines } from '@/hooks/use-get-disciplines'

const addCourseDisciplineSchema = z.object({
  module: z.number().min(1, 'Preencha o campo!'),
  hours: z.number().min(1, 'Preencha o campo'),
  vf: z.boolean().optional(),
  avi: z.boolean().optional(),
  avii: z.boolean().optional(),
})

type AddCourseDisciplineSchema = z.infer<typeof addCourseDisciplineSchema>

export function AddCourseDiscipline() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const { handleSubmit, register, control } =
    useForm<AddCourseDisciplineSchema>({
      resolver: zodResolver(addCourseDisciplineSchema),
    })

  const { disciplines } = useGetDisciplines({})
  const { mutateAsync: createCourseDisciplineFn } = useCreateCourseDiscipline()

  async function handleCreateCourseDiscipline(
    { module, hours, vf, avi, avii }: AddCourseDisciplineSchema,
    disciplineId: string,
  ) {
    if (!courseId) throw new Error('Curso inexistente!')

    let expected = ''

    if (vf) {
      expected = 'VF'
    }

    if (vf && avi) {
      expected = 'AVI VF'
    }

    if (vf && avi && avii) {
      expected = 'AVI AVII VF'
    }

    try {
      await createCourseDisciplineFn({
        courseId,
        disciplineId,
        expected,
        module,
        hours,
      })

      toast.success('Disciplina adicionada com sucesso!', {
        duration: 1000,
      })

      navigate(`/courses`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar disciplinas do curso
        </h2>

        <div className="my-12 grid max-w-4xl grid-cols-1 gap-4 rounded bg-pmpa-blue-500 p-4 md:grid-cols-2">
          {disciplines ? (
            disciplines?.map((discipline) => (
              <div
                key={discipline.id}
                className="flex flex-col items-start gap-2 space-x-2 rounded bg-pmpa-blue-700 px-2 py-4 text-white"
              >
                <span className="font-bold">
                  {discipline.name.toUpperCase()}
                </span>
                <form
                  onSubmit={handleSubmit((data) =>
                    handleCreateCourseDiscipline(data, discipline.id),
                  )}
                  className="flex w-full flex-col items-center justify-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="hours" className="text-sm">
                        Horas:
                      </label>
                      <input
                        type="text"
                        id="hours"
                        placeholder="30"
                        className="w-full max-w-32 rounded px-2 py-1 text-black"
                        {...register('hours', {
                          valueAsNumber: true,
                        })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="module" className="text-sm">
                        Módulo:
                      </label>
                      <input
                        type="text"
                        id="module"
                        placeholder="1"
                        className="w-full max-w-32 rounded px-2 py-1 text-black"
                        {...register('module', {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center">
                      <label htmlFor="vf">VF</label>
                      <Controller
                        name="vf"
                        defaultValue={false}
                        control={control}
                        render={({
                          field: { name, onChange, value, disabled },
                        }) => {
                          return (
                            <Checkbox
                              name={name}
                              checked={value}
                              disabled={disabled}
                              onCheckedChange={onChange}
                              className="h-6 w-6 border-slate-100 data-[state=checked]:bg-green-600"
                              id="vf"
                            />
                          )
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="avi">AVI</label>
                      <Controller
                        name="avi"
                        defaultValue={false}
                        control={control}
                        render={({
                          field: { name, onChange, value, disabled },
                        }) => {
                          return (
                            <Checkbox
                              name={name}
                              checked={value}
                              disabled={disabled}
                              onCheckedChange={onChange}
                              className="h-6 w-6 border-slate-100 data-[state=checked]:bg-green-600"
                              id="avi"
                            />
                          )
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="avii">AVII</label>
                      <Controller
                        name="avii"
                        defaultValue={false}
                        control={control}
                        render={({
                          field: { name, onChange, value, disabled },
                        }) => {
                          return (
                            <Checkbox
                              name={name}
                              checked={value}
                              disabled={disabled}
                              onCheckedChange={onChange}
                              className="h-6 w-6 border-slate-100 data-[state=checked]:bg-green-600"
                              id="avii"
                            />
                          )
                        }}
                      />
                    </div>
                  </div>

                  <Button type="submit" variant={'ghost'}>
                    Adicionar
                  </Button>
                </form>
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
      </section>
    </div>
  )
}
