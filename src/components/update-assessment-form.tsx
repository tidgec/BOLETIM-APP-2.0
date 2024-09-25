import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useUpdateAssessment } from '@/hooks/use-update-assessment'
import { fail } from '@/utils/fail'

const updateAssessmentFormSchema = z.object({
  vf: z.string().optional(),
  avi: z.string().optional(),
  avii: z.string().optional(),
  vfe: z.string().optional(),
})

type UpdateAssessmentFormSchema = z.infer<typeof updateAssessmentFormSchema>

interface UpdateAssessmentFormProps {
  studentId: string
}

export function UpdateAssessmentForm({ studentId }: UpdateAssessmentFormProps) {
  const [searchParams] = useSearchParams()
  const { disciplineId } = useParams()

  const courseId = searchParams.get('courseId')

  const { mutateAsync: updateAssessmentFn } = useUpdateAssessment()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateAssessmentFormSchema>({
    resolver: zodResolver(updateAssessmentFormSchema),
    defaultValues: {},
  })

  async function handleUpdateAssessment({
    vf,
    avi,
    avii,
    vfe,
  }: UpdateAssessmentFormSchema) {
    try {
      await updateAssessmentFn({
        courseId: String(courseId),
        disciplineId: String(disciplineId),
        studentId,
        vf: vf ? Number(vf) : undefined,
        avi: avi ? Number(avi) : undefined,
        avii: avii ? Number(avii) : undefined,
        vfe: vfe ? Number(vfe) : undefined,
      })

      toast.success('Notas atualizadas com sucesso!')
    } catch (err) {
      fail(err)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleUpdateAssessment)}>
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
        Atualizar
      </button>
    </form>
  )
}
