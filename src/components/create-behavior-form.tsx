import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateBehavior } from '@/hooks/use-create-behavior'
import { fail } from '@/utils/fail'

const createBehaviorFormSchema = z.object({
  january: z.string().optional(),
  february: z.string().optional(),
  march: z.string().optional(),
  april: z.string().optional(),
  may: z.string().optional(),
  jun: z.string().optional(),
  july: z.string().optional(),
  august: z.string().optional(),
  september: z.string().optional(),
  october: z.string().optional(),
  november: z.string().optional(),
  december: z.string().optional(),
  module: z.enum(['1', '2', '3']).default('1'),
})

type CreateBehaviorFormSchema = z.infer<typeof createBehaviorFormSchema>

interface CreateBehaviorFormProps {
  studentId: string
}

export function CreateBehaviorForm({ studentId }: CreateBehaviorFormProps) {
  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('courseId')

  const { mutateAsync: createBehaviorFn, isPending } = useCreateBehavior()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! As notas de comportamento estão sendo adicionadas.',
    )
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CreateBehaviorFormSchema>({
    resolver: zodResolver(createBehaviorFormSchema),
  })

  async function handleCreateBehavior({
    january,
    february,
    march,
    april,
    may,
    jun,
    july,
    august,
    september,
    october,
    november,
    december,
    module: behaviorModule,
  }: CreateBehaviorFormSchema) {
    try {
      await createBehaviorFn({
        courseId: String(courseId),
        studentId,
        january: january ? Number(january) : null,
        february: february ? Number(february) : null,
        march: march ? Number(march) : null,
        april: april ? Number(april) : null,
        may: may ? Number(may) : null,
        jun: jun ? Number(jun) : null,
        july: july ? Number(july) : null,
        august: august ? Number(august) : null,
        september: september ? Number(september) : null,
        october: october ? Number(october) : null,
        november: november ? Number(november) : null,
        december: december ? Number(december) : null,
        module: Number(behaviorModule),
      })

      toast.success('Notas de comportamento adicionadas com sucesso!', {
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
    <form className="space-y-4" onSubmit={handleSubmit(handleCreateBehavior)}>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Janeiro</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('january')}
            />
            {errors.january && (
              <span className="text-sm text-red-500">
                {errors.january.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Fevereiro</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('february')}
            />
            {errors.february && (
              <span className="text-sm text-red-500">
                {errors.february.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Março</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('march')}
            />
            {errors.march && (
              <span className="text-sm text-red-500">
                {errors.march.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Abril</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('april')}
            />
            {errors.april && (
              <span className="text-sm text-red-500">
                {errors.april.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Maio</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('may')}
            />
            {errors.may && (
              <span className="text-sm text-red-500">{errors.may.message}</span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Junho</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('jun')}
            />
            {errors.jun && (
              <span className="text-sm text-red-500">{errors.jun.message}</span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Julho</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('july')}
            />
            {errors.july && (
              <span className="text-sm text-red-500">
                {errors.july.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Agosto</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('august')}
            />
            {errors.august && (
              <span className="text-sm text-red-500">
                {errors.august.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Setembro</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('september')}
            />
            {errors.september && (
              <span className="text-sm text-red-500">
                {errors.september.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Outubro</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('october')}
            />
            {errors.october && (
              <span className="text-sm text-red-500">
                {errors.october.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Novembro</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('november')}
            />
            {errors.november && (
              <span className="text-sm text-red-500">
                {errors.november.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm sm:text-base">Dezembro</label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
              {...register('december')}
            />
            {errors.december && (
              <span className="text-sm text-red-500">
                {errors.december.message}
              </span>
            )}
          </div>
        </div>

        <div className="mx-auto flex max-w-32 flex-col items-center">
          <label className="text-sm sm:text-base">Módulo</label>
          <Controller
            name="module"
            defaultValue="1"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <select
                  name={name}
                  value={value}
                  disabled={disabled}
                  onChange={onChange}
                  className="rounded border p-2"
                >
                  <option value={'1'}>Módulo 1</option>
                  <option value={'2'}>Módulo 2</option>
                  <option value={'3'}>Módulo 3</option>
                </select>
              )
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="ml-auto block rounded bg-pmpa-blue-600 px-4 py-2 text-white hover:bg-pmpa-blue-500 disabled:opacity-50"
      >
        Adicionar
      </button>
    </form>
  )
}
