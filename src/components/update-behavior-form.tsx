import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const updateBehaviorFormSchema = z.object({
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
})

type UpdateBehaviorFormSchema = z.infer<typeof updateBehaviorFormSchema>

interface UpdateBehaviorFormProps {
  studentId: string
}

export function UpdateBehaviorForm({ studentId }: UpdateBehaviorFormProps) {
  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('courseId')

  const { mutateAsync: updateBehaviorFn } = useUpdateBehavior()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateBehaviorFormSchema>({
    resolver: zodResolver(updateBehaviorFormSchema),
  })

  async function handleUpdateBehavior({
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
  }: UpdateBehaviorFormSchema) {
    try {
      await updateBehaviorFn({
        courseId: String(courseId),
        studentId,
        january: january !== undefined ? Number(january) : undefined,
        february: february !== undefined ? Number(february) : undefined,
        march: march !== undefined ? Number(march) : undefined,
        april: april !== undefined ? Number(april) : undefined,
        may: may !== undefined ? Number(may) : undefined,
        jun: jun !== undefined ? Number(jun) : undefined,
        july: july !== undefined ? Number(july) : undefined,
        august: august !== undefined ? Number(august) : undefined,
        september: september !== undefined ? Number(september) : undefined,
        october: october !== undefined ? Number(october) : undefined,
        november: november !== undefined ? Number(november) : undefined,
        december: december !== undefined ? Number(december) : undefined,
      })

      toast.success('Notas de comportamento adicionadas com sucesso!', {
        duration: 1000,
      })
    } catch (error) {
      toast.error('Ocorreu algum error ao criar a nota.', {
        duration: 2000,
        closeButton: true,
      })
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleUpdateBehavior)}>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center">
          <label>Janeiro</label>
          <input
            type="text"
            placeholder="0,00"
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
          <label>Fevereiro</label>
          <input
            type="text"
            placeholder="0,00"
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
          <label>Março</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('march')}
          />
          {errors.march && (
            <span className="text-sm text-red-500">{errors.march.message}</span>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label>Abril</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('april')}
          />
          {errors.april && (
            <span className="text-sm text-red-500">{errors.april.message}</span>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label>Maio</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('may')}
          />
          {errors.may && (
            <span className="text-sm text-red-500">{errors.may.message}</span>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label>Junho</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('jun')}
          />
          {errors.jun && (
            <span className="text-sm text-red-500">{errors.jun.message}</span>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label>Julho</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('july')}
          />
          {errors.july && (
            <span className="text-sm text-red-500">{errors.july.message}</span>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label>Agosto</label>
          <input
            type="text"
            placeholder="0,00"
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
          <label>Setembro</label>
          <input
            type="text"
            placeholder="0,00"
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
          <label>Outubro</label>
          <input
            type="text"
            placeholder="0,00"
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
          <label>Novembro</label>
          <input
            type="text"
            placeholder="0,00"
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
          <label>Dezembro</label>
          <input
            type="text"
            placeholder="0,00"
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
      <button
        type="submit"
        className="ml-auto block rounded bg-pmpa-blue-600 px-4 py-2 text-white hover:bg-pmpa-blue-500"
      >
        Adicionar
      </button>
    </form>
  )
}
