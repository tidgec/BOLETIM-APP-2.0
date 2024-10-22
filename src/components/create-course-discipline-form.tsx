import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateCourseDiscipline } from '@/hooks/use-create-course-discipline'
import { fail } from '@/utils/fail'

import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

const createCourseDisciplineSchema = z.object({
  module: z.number().min(1, 'Preencha o campo!'),
  hours: z.number().min(1, 'Preencha o campo'),
  vf: z.boolean().optional(),
  avi: z.boolean().optional(),
  avii: z.boolean().optional(),
})

type CreateCourseDisciplineSchema = z.infer<typeof createCourseDisciplineSchema>

interface CreateCourseDisciplineProps {
  discipline: {
    id: string
  }
}

export function CreateCourseDisciplineForm({
  discipline,
}: CreateCourseDisciplineProps) {
  const { id } = useParams()
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateCourseDisciplineSchema>({
    resolver: zodResolver(createCourseDisciplineSchema),
  })

  const { mutateAsync: createCourseDisciplineFn, isPending } =
    useCreateCourseDiscipline()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! A disciplina está sendo adicionada ao curso.',
    )
  }

  async function handleCreateCourseDiscipline(
    { module, hours, vf, avi, avii }: CreateCourseDisciplineSchema,
    disciplineId: string,
  ) {
    if (!id) throw new Error('Curso inexistente!')

    let expected = ''

    if (vf) expected = 'VF'
    if (vf && avi) expected = 'AVI VF'
    if (vf && avi && avii) expected = 'AVI AVII VF'

    try {
      await createCourseDisciplineFn({
        courseId: id,
        disciplineId,
        expected,
        module,
        hours,
      })

      toast.success('Disciplina adicionada ao curso com sucesso!', {
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
            type="number"
            id="hours"
            placeholder="30"
            className="w-full max-w-32 rounded px-2 py-1 text-black"
            {...register('hours', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="module" className="text-sm">
            Módulo:
          </label>
          <input
            type="number"
            id="module"
            placeholder="1"
            className="w-full max-w-32 rounded px-2 py-1 text-black"
            {...register('module', { valueAsNumber: true })}
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
            render={({ field: { name, onChange, value, disabled } }) => (
              <Checkbox
                name={name}
                checked={value}
                disabled={disabled}
                onCheckedChange={onChange}
                className="h-6 w-6 border-slate-100 data-[state=checked]:bg-green-600"
                id="vf"
              />
            )}
          />
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="avi">AVI</label>
          <Controller
            name="avi"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => (
              <Checkbox
                name={name}
                checked={value}
                disabled={disabled}
                onCheckedChange={onChange}
                className="h-6 w-6 border-slate-100 data-[state=checked]:bg-green-600"
                id="avi"
              />
            )}
          />
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="avii">AVII</label>
          <Controller
            name="avii"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => (
              <Checkbox
                name={name}
                checked={value}
                disabled={disabled}
                onCheckedChange={onChange}
                className="h-6 w-6 border-slate-100 data-[state=checked]:bg-green-600"
                id="avii"
              />
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" variant={'ghost'} disabled={isSubmitting}>
          Adicionar
        </Button>
      </div>
    </form>
  )
}
