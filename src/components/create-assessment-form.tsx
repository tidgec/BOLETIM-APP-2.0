import { useCreateAssessment } from '@/hooks/use-create-assessment'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const createAssessmentFormSchema = z.object({
  vf: z.number(),
  avi: z.number().optional(),
  avii: z.number().optional(),
  vfe: z.number().optional(),
})

type CreateAssessmentFormSchema = z.infer<typeof createAssessmentFormSchema>

interface CreateAssessmentFormProps {
  studentId: string
}

export function CreateAssessmentForm({ studentId }: CreateAssessmentFormProps) {
  const navigate = useNavigate()
  const { courseId, disciplineId } = useParams()

  const { mutateAsync: createAssessmentFn } = useCreateAssessment()

  const { handleSubmit, register } = useForm<CreateAssessmentFormSchema>({
    resolver: zodResolver(createAssessmentFormSchema),
    defaultValues: {
      vf: 0,
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
        vf,
        avi,
        avii,
        vfe,
      })

      toast.success('Notas adicionadas com sucesso!', {
        action: {
          label: 'Navegar',
          onClick: () => {
            navigate('/')
          },
        },
      })
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
            type="number"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('vf', {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>AVI</label>
          <input
            type="number"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('avi', {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>AVII</label>
          <input
            type="number"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('avii', {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>VFE</label>
          <input
            type="number"
            placeholder="0,00"
            className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
            {...register('vfe', {
              valueAsNumber: true,
            })}
          />
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
