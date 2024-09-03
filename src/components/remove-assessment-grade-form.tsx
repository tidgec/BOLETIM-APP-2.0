import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useRemoveAssessmentGrade } from '@/hooks/use-remove-assessment-grade'

import { Checkbox } from './ui/checkbox'

const removeAssessmentGradeFormSchema = z.object({
  vf: z.boolean(),
  avi: z.boolean().optional(),
  avii: z.boolean().optional(),
  vfe: z.boolean().optional(),
})

type RemoveAssessmentGradeFormSchema = z.infer<
  typeof removeAssessmentGradeFormSchema
>

interface RemoveAssessmentGradeFormProps {
  studentId: string
}

export function RemoveAssessmentGradeForm({
  studentId,
}: RemoveAssessmentGradeFormProps) {
  const [searchParams] = useSearchParams()
  const { disciplineId } = useParams()

  const courseId = searchParams.get('courseId')

  const { mutateAsync: removeAssessmentGradeFn } = useRemoveAssessmentGrade()

  const { handleSubmit, control } = useForm<RemoveAssessmentGradeFormSchema>({
    resolver: zodResolver(removeAssessmentGradeFormSchema),
  })

  async function handleRemoveAssessmentGrade({
    vf,
    avi,
    avii,
    vfe,
  }: RemoveAssessmentGradeFormSchema) {
    try {
      await removeAssessmentGradeFn({
        courseId: String(courseId),
        disciplineId: String(disciplineId),
        studentId,
        vf: vf ? -1 : undefined,
        avi: avi ? -1 : undefined,
        avii: avii ? -1 : undefined,
        vfe: vfe ? -1 : undefined,
      })
      toast.success('Notas removidas com sucesso!', {
        duration: 2000,
      })
    } catch (error) {
      toast.error('Ocorreu um error ao remove nota.', {
        duration: 2000,
        closeButton: true,
      })
    }
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit(handleRemoveAssessmentGrade)}
    >
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <label htmlFor="vf">VF</label>
          <Controller
            name="vf"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="vf"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="avi">AVI</label>
          <Controller
            name="avi"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="vf"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="avii">AVII</label>
          <Controller
            name="avii"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="vf"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="vfe">VFE</label>
          <Controller
            name="vfe"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="vf"
                />
              )
            }}
          ></Controller>
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-pmpa-blue-600 px-4 py-2 text-white hover:bg-pmpa-blue-500"
      >
        Remover
      </button>
    </form>
  )
}
