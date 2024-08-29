import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateAssessment } from '@/hooks/use-create-assessment'

const createAssessmentFormSchema = z.object({
  vf: z.string(),
  avi: z.string().optional(),
  avii: z.string().optional(),
  vfe: z.string().optional(),
})

type CreateAssessmentFormSchema = z.infer<typeof createAssessmentFormSchema>

interface CreateAssessmentFormProps {
  studentId: string
}

export function CreateAssessmentForm({ studentId }: CreateAssessmentFormProps) {
  const [searchParams] = useSearchParams()
  const { disciplineId } = useParams()

  const courseId = searchParams.get('courseId')

  const { mutateAsync: createAssessmentFn } = useCreateAssessment()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateAssessmentFormSchema>({
    resolver: zodResolver(createAssessmentFormSchema),
    defaultValues: {
      vf: '0',
    },
  })

  async function handleCreateAssessment({
    vf,
    avi,
    avii,
    vfe,
  }: CreateAssessmentFormSchema) {
    try {
      await createAssessmentFn({
        courseId: String(courseId),
        disciplineId: String(disciplineId),
        studentId,
        vf: Number(vf),
        avi: avi !== undefined ? Number(avi) : undefined,
        avii: avii !== undefined ? Number(avii) : undefined,
        vfe: vfe !== undefined ? Number(vfe) : undefined,
      })

      toast.success('Notas adicionadas com sucesso!')
    } catch (error) {
      toast.error('Ocorreu algum error ao criar a nota.', {
        duration: 2000,
        closeButton: true,
      })
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleCreateAssessment)}>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center">
          <label>VF</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('vf')}
          />
          {errors.vf && (
            <span className="text-sm text-red-500">{errors.vf.message}</span>
          )}
        </div>
        <div className="flex flex-col items-center">
          <label>AVI</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('avi')}
          />
          {errors.avi && (
            <span className="text-sm text-red-500">{errors.avi.message}</span>
          )}
        </div>
        <div className="flex flex-col items-center">
          <label>AVII</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('avii')}
          />
          {errors.avii && (
            <span className="text-sm text-red-500">{errors.avii.message}</span>
          )}
        </div>
        <div className="flex flex-col items-center">
          <label>VFE</label>
          <input
            type="text"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('vfe')}
          />
          {errors.vfe && (
            <span className="text-sm text-red-500">{errors.vfe.message}</span>
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
