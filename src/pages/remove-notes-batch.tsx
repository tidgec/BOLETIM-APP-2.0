import { useRemoveAssessmentGradesBatch } from '@/hooks/use-remove-assessment-grades-batch'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const removeNotesBatchSchema = z.object({
  excel: z
    .instanceof(FileList)
    .transform((file) => file.item(0)!)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'Arquivo até no máximo 5MB',
    ),
})

type RemoveNotesBatchSchema = z.infer<typeof removeNotesBatchSchema>

export function RemoveNotesBatch() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RemoveNotesBatchSchema>({
    resolver: zodResolver(removeNotesBatchSchema),
  })

  const { mutateAsync: removeAssessmentGradesBatchFn } =
    useRemoveAssessmentGradesBatch()

  async function handleRemoveNotesBatch({ excel }: RemoveNotesBatchSchema) {
    const uploadFormData = new FormData()
    uploadFormData.set('excel', excel)

    try {
      await removeAssessmentGradesBatchFn({
        formData: uploadFormData,
        courseId: String(courseId),
      })

      toast.success('Notas removidas com sucesso!', {
        duration: 1000,
      })

      reset()
    } catch (error) {
      const err = error as AxiosError

      toast.error(err.response?.data?.message, {
        duration: 1000,
      })
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Remover notas em lote
        </h2>

        <form onSubmit={handleSubmit(handleRemoveNotesBatch)}>
          <div className="mb-4 py-8">
            <label
              htmlFor="file"
              className="mb-2 block font-bold text-slate-700"
            >
              Selecione um arquivo
            </label>
            <input
              type="file"
              id="file"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-slate-700 shadow focus:outline-none"
              {...register('excel')}
            />

            {errors.excel && (
              <span className="text-sm text-red-500">
                {errors.excel.message}
              </span>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700 focus:outline-none"
            >
              Remover
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}