import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useCreateAcademicRecord } from '@/hooks/use-create-academic-record'
import { fail } from '@/utils/fail'
import { formatDate } from '@/utils/format-date'

const addAcademicRecordSchema = z.object({
  className: z
    .string()
    .min(3, { message: 'O nome da classe deve conter no mínimo 3 caracters' })
    .max(30, {
      message: 'O nome da classe deve conter no máximo 30 caracters',
    }),
  startDate: z.string(),
  finishDate: z.string(),
  speechs: z.number(),
  internships: z.number(),
  divisionBoss: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracters' })
    .max(30, { message: 'O nome deve conter no máximo 30 caracters' }),
  commander: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracters' })
    .max(30, { message: 'O nome deve conter no máximo 30 caracters' }),
})

type AddAcademicRecordSchema = z.infer<typeof addAcademicRecordSchema>

export function AddAcademicRecord() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId') ?? ''

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddAcademicRecordSchema>({
    resolver: zodResolver(addAcademicRecordSchema),
    defaultValues: {
      className: '',
      divisionBoss: '',
      commander: '',
      internships: 0,
      speechs: 0,
    },
  })

  const { mutateAsync: createAcademicRecordFn, isPending } =
    useCreateAcademicRecord()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! O histórico escolar está sendo ativado.',
    )
  }

  async function handleAddAcademicRecord({
    className,
    startDate,
    finishDate,
    speechs,
    internships,
    commander,
    divisionBoss,
  }: AddAcademicRecordSchema) {
    try {
      await createAcademicRecordFn({
        courseId,
        className,
        startDate: formatDate(startDate),
        finishDate: formatDate(finishDate),
        speechs,
        internships,
        commander,
        divisionBoss,
      })

      toast.success('Histórico escolar ativado com sucesso!', {
        duration: 1000,
        onAutoClose: () => {
          toast.dismiss(toastId)
        },
      })

      reset()
    } catch (err) {
      fail(err, toastId)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar Histórico Escolar
        </h2>

        <div className="group relative mx-auto my-8 rounded px-1 md:px-4">
          <form
            className="mx-auto max-w-[50rem] space-y-4 rounded bg-pmpa-blue-600 p-4 md:p-6"
            onSubmit={handleSubmit(handleAddAcademicRecord)}
          >
            <div className="space-y-2">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm text-gray-200">
                  Nome da turma:
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  placeholder="Digite o nome da turma..."
                  {...register('className')}
                />
                {errors.className && (
                  <span className="text-sm text-red-500">
                    {errors.className.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="startAt" className="text-sm text-gray-200">
                  Início do curso:
                </label>
                <input
                  type="date"
                  id="startAt"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  {...register('startDate')}
                />
                {errors.startDate && (
                  <span className="text-sm text-red-500">
                    {errors.startDate.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="endsAt" className="text-sm text-gray-200">
                  Fim do curso:
                </label>
                <input
                  type="date"
                  id="endsAt"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  {...register('finishDate')}
                />
                {errors.finishDate && (
                  <span className="text-sm text-red-500">
                    {errors.finishDate.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="speechs" className="text-sm text-gray-200">
                  Palestras:
                </label>
                <input
                  type="number"
                  id="speechs"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  placeholder="Ex: 20H/A"
                  {...register('speechs', {
                    valueAsNumber: true,
                  })}
                />
                {errors.speechs && (
                  <span className="text-sm text-red-500">
                    {errors.speechs.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="internships" className="text-sm text-gray-200">
                  Estágio (horas):
                </label>
                <input
                  type="number"
                  id="internships"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  placeholder="EX: 20"
                  {...register('internships', {
                    valueAsNumber: true,
                  })}
                />
                {errors.internships && (
                  <span className="text-sm text-red-500">
                    {errors.internships.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="commander" className="text-sm text-gray-200">
                  CMT do CFAP:
                </label>
                <input
                  type="string"
                  id="commander"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  placeholder="Digite o nome do CMT..."
                  {...register('commander')}
                />
                {errors.commander && (
                  <span className="text-sm text-red-500">
                    {errors.commander.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="divisionBoss" className="text-sm text-gray-200">
                  Chefe da divisão de ensino:
                </label>
                <input
                  type="string"
                  id="divisionBoss"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  placeholder="Digite o nome do chefe da divisão de ensino..."
                  {...register('divisionBoss')}
                />
                {errors.divisionBoss && (
                  <span className="text-sm text-red-500">
                    {errors.divisionBoss.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="ml-auto block rounded px-3 py-2 text-white"
            >
              Ativar histórico
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
