import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useUpdateBehavior } from '@/hooks/use-update-behavior'

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
  behavior: {
    id: string
    studentId: string
    january?: number | null
    february?: number | null
    march?: number | null
    april?: number | null
    may?: number | null
    jun?: number | null
    july?: number | null
    august?: number | null
    september?: number | null
    october?: number | null
    november?: number | null
    december?: number | null
  }
}

export function UpdateBehaviorForm({ behavior }: UpdateBehaviorFormProps) {
  const { mutateAsync: updateBehaviorFn } = useUpdateBehavior()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateBehaviorFormSchema>({
    resolver: zodResolver(updateBehaviorFormSchema),
    defaultValues: {
      january: behavior.january ? String(behavior.january) : undefined,
      february: behavior.february ? String(behavior.february) : undefined,
      march: behavior.march ? String(behavior.march) : undefined,
      april: behavior.april ? String(behavior.april) : undefined,
      may: behavior.may ? String(behavior.may) : undefined,
      jun: behavior.jun ? String(behavior.jun) : undefined,
      july: behavior.july ? String(behavior.july) : undefined,
      august: behavior.august ? String(behavior.august) : undefined,
      september: behavior.september ? String(behavior.september) : undefined,
      october: behavior.october ? String(behavior.october) : undefined,
      november: behavior.november ? String(behavior.november) : undefined,
      december: behavior.august ? String(behavior.august) : undefined,
    },
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
        id: behavior.id,
        january: january ? Number(january) : undefined,
        february: february ? Number(february) : undefined,
        march: march ? Number(march) : undefined,
        april: april ? Number(april) : undefined,
        may: may ? Number(may) : undefined,
        jun: jun ? Number(jun) : undefined,
        july: july ? Number(july) : undefined,
        august: august ? Number(august) : undefined,
        september: september ? Number(september) : undefined,
        october: october ? Number(october) : undefined,
        november: november ? Number(november) : undefined,
        december: december ? Number(december) : undefined,
      })

      toast.success('Notas de comportamento atualizadas com sucesso!', {
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
          <label className="text-sm md:text-base">Janeiro</label>
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
          <label className="text-sm md:text-base">Fevereiro</label>
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
          <label className="text-sm md:text-base">Março</label>
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
          <label className="text-sm md:text-base">Abril</label>
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
          <label className="text-sm md:text-base">Maio</label>
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
          <label className="text-sm md:text-base">Junho</label>
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
          <label className="text-sm md:text-base">Julho</label>
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
          <label className="text-sm md:text-base">Agosto</label>
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
          <label className="text-sm md:text-base">Setembro</label>
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
          <label className="text-sm md:text-base">Outubro</label>
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
          <label className="text-sm md:text-base">Novembro</label>
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
          <label className="text-sm md:text-base">Dezembro</label>
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
