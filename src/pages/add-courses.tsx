import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useCreateCourse } from '@/hooks/use-create-course'
import { useUploadAttachment } from '@/hooks/use-upload-attachment'
import { formatDate } from '@/utils/format-date'

const addCourseSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome do curso deve ter no mínimo 3 caracteres' })
    .max(30, { message: 'O nome do curso deve ter no máximo 30 caracteres' }),
  formula: z.enum(['CAS', 'CGS', 'CFP', 'CHO', 'CFO', 'none']),
  startAt: z.string().optional(),
  endsAt: z.string(),
})

type AddCourseSchema = z.infer<typeof addCourseSchema>

export function AddCourses() {
  const navigate = useNavigate()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<AddCourseSchema>({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      name: '',
      formula: 'none',
    },
  })

  const { mutateAsync: uploadAttachmentFn } = useUploadAttachment()
  const { mutateAsync: createCourseFn } = useCreateCourse()

  async function handleOnFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (!files) return

    const file = files[0]

    try {
      const { fileUrl } = await uploadAttachmentFn({
        file,
      })

      setPreviewUrl(fileUrl)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateCourse({
    name,
    formula,
    startAt,
    endsAt,
  }: AddCourseSchema) {
    if (!previewUrl) {
      return toast.error('Adicione uma imagem ao curso!', {
        duration: 1000,
      })
    }

    try {
      const { id } = await createCourseFn({
        name,
        formula,
        startAt: startAt ? formatDate(startAt) : undefined,
        endsAt: formatDate(endsAt),
        imageUrl: String(previewUrl),
      })

      toast.success('Curso criado com sucesso!', {
        duration: 1000,
      })

      navigate(`/courses/management/${id}/poles`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar Curso
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

              {/* <div>
                          <label
                            htmlFor="quantity"
                            className="mb-2 block text-sm text-gray-200"
                          >
                            Quantidade de módulos
                          </label>
                          <input
                            type="text"
                            id="quantity"
                            placeholder="0"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          />
                        </div> */}

              {/* 
                        <div>
                          <label
                            htmlFor="weight"
                            className="mb-2 block text-sm text-gray-200"
                          >
                            Este curso terá peso sob os módulos?
                          </label>
                          <select
                            id="weight"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          >
                            <option value="false">Não</option>
                            <option value="true">Sim</option>
                          </select>
                        </div> */}

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

                {previewUrl && (
                  <img
                    src={previewUrl}
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
