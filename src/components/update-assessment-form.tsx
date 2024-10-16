import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
  assessment: {
    id: string
    studentId: string
    vf?: number
    avi?: number
    avii?: number
    vfe?: number
  }
}

export function UpdateAssessmentForm({
  assessment,
}: UpdateAssessmentFormProps) {
  const { mutateAsync: updateAssessmentFn, isPending } = useUpdateAssessment()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! As notas estão sendo atualizadas.',
    )
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateAssessmentFormSchema>({
    resolver: zodResolver(updateAssessmentFormSchema),
    defaultValues: {
      vf: assessment.vf ? String(assessment.vf) : undefined,
      avi: assessment.avi ? String(assessment.avi) : undefined,
      avii: assessment.avii ? String(assessment.avii) : undefined,
      vfe: assessment.vfe ? String(assessment.vfe) : undefined,
    },
  })

  async function handleUpdateAssessment({
    vf,
    avi,
    avii,
    vfe,
  }: UpdateAssessmentFormSchema) {
    try {
      await updateAssessmentFn({
        id: assessment.id,
        vf: vf ? Number(vf) : undefined,
        avi: avi ? Number(avi) : undefined,
        avii: avii ? Number(avii) : undefined,
        vfe: vfe ? Number(vfe) : undefined,
      })

      toast.success('Notas atualizadas com sucesso!', {
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
