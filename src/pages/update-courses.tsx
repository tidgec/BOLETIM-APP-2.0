import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useGetCourse } from '@/hooks/use-get-course'
import { useUpdateCourse } from '@/hooks/use-update-course'
import { useUploadAttachment } from '@/hooks/use-upload-attachment'
import { formatDate } from '@/utils/format-date'

const updateCourseSchema = z.object({
  name: z.string().optional(),
  formula: z.string().optional(),
  startAt: z.string().optional(),
  endsAt: z.string().optional(),
})

type UpdateCourseSchema = z.infer<typeof updateCourseSchema>

export function UpdateCourses() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm<UpdateCourseSchema>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      name: '',
    },
  })

  const { course } = useGetCourse({ courseId: String(courseId) })

  const { mutateAsync: uploadAttachmentFn } = useUploadAttachment()
  const { mutateAsync: updateCourseFn } = useUpdateCourse()

  async function handleOnFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (!files) return

    const file = files[0]

    try {
      await uploadAttachmentFn({
        file,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateCourse({
    name,
    formula,
    startAt,
    endsAt,
  }: UpdateCourseSchema) {
    if (!course) return

    try {
      await updateCourseFn({
        id: course.id,
        name,
        formula,
        startAt: startAt ? formatDate(startAt) : undefined,
        endsAt: endsAt ? formatDate(endsAt) : undefined,
        imageUrl: course.imageUrl,
      })

      toast.success('Curso criado com sucesso!', {
        duration: 1000,
      })

      navigate(`/courses/management/${course.id}/poles`)
    } catch (error) {
      console.error(error)
    }
  }

  setValue('name', course?.name)
  setValue('formula', course?.formula)

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Atualizar Curso
        </h2>

        <div className="mx-auto my-12 max-w-4xl rounded bg-pmpa-blue-700">
          <form
            className="w-full p-6"
            onSubmit={handleSubmit(handleCreateCourse)}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm text-gray-200">
                  Nome do curso:
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  placeholder="Digite o nome do curso"
                  {...register('name')}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="formula"
                  className="mb-2 block text-sm text-gray-200"
                >
                  Selecione a fórmula do curso:
                </label>
                <Controller
                  name="formula"
                  defaultValue="none"
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
                        <option value="none">Selecione</option>
                        <option value="CAS">CAS</option>
                        <option value="CGS">CGS</option>
                        <option value="CFP">CFP</option>
                        <option value="CHO">CHO</option>
                        <option value="CFO">CFO</option>
                      </select>
                    )
                  }}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="startDate" className="text-sm text-gray-200">
                  Data de início:
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  placeholder="Digite a data de início do curso"
                  {...register('startAt')}
                />
                {errors.startAt && (
                  <span className="text-sm text-red-500">
                    {errors.startAt.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="endsAt" className="text-sm text-gray-200">
                  Data de conclusão:
                </label>
                <input
                  type="date"
                  id="endsAt"
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  placeholder="Digite a data de conclusão do curso"
                  {...register('endsAt')}
                />
                {errors.endsAt && (
                  <span className="text-sm text-red-500">
                    {errors.endsAt.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="image" className="text-sm text-gray-200">
                  Adicionar imagem do curso:
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleOnFileSelected}
                  className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                  accept="image/*"
                />

                {course?.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt=""
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                )}
              </div>

              <Button
                type="submit"
                className="ml-auto block rounded bg-pmpa-blue-500 px-3 py-2 text-white hover:bg-pmpa-blue-900"
              >
                Adicionar
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
