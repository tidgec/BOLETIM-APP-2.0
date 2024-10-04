import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useUpdateStudentsBatch } from '@/hooks/use-update-students-batch'
import { fail } from '@/utils/fail'

const updateStudentBatchSchema = z.object({
  excel: z
    .instanceof(FileList)
    .transform((file) => file.item(0)!)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'Arquivo até no máximo 5MB',
    ),
})

type UpdateStudentBatchSchema = z.infer<typeof updateStudentBatchSchema>

export function UpdateStudentsBatch() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UpdateStudentBatchSchema>({
    resolver: zodResolver(updateStudentBatchSchema),
  })

  const { mutateAsync: createStudentsBatchFn, isPending } =
    useUpdateStudentsBatch()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! Os alunos estão sendo atualizados.',
    )
  }

  async function handleUpdateStudentsBatch({
    excel,
  }: UpdateStudentBatchSchema) {
    const uploadFormData = new FormData()
    uploadFormData.set('excel', excel)

    try {
      await createStudentsBatchFn({
        formData: uploadFormData,
        courseId: String(courseId),
      })

      toast.success('Estudantes atualizados com sucesso!', {
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
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Atualizar em Lote
        </h2>

        <form onSubmit={handleSubmit(handleUpdateStudentsBatch)}>
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
              className="hover:bg-pmpa-blue- rounded bg-pmpa-blue-500 px-4 py-2 font-semibold text-white"
            >
              Atualizar
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
