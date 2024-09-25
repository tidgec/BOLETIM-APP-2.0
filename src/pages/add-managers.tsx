import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { ListCoursePoles } from '@/components/list-course-poles'
import { useCreateManager } from '@/hooks/use-create-manager'
import { fail } from '@/utils/fail'
import { formatCPF } from '@/utils/format-cpf'
import { formatDate } from '@/utils/format-date'

const addManagerSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' })
    .max(30, { message: 'O nome deve conter no máximo 30 caracteres' }),
  cpf: z
    .string()
    .length(14, { message: 'CPF inválido!' })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: 'Formato do CPF inválido.',
    }),
  email: z.string().email({ message: 'Email inválido' }),
  civilId: z.string().optional(),
  militaryId: z.string().optional(),
  birthday: z.string(),
  poleId: z.string(),
})

type AddManagerSchema = z.infer<typeof addManagerSchema>

export function AddManagers() {
  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('courseId')

  const addManagerForm = useForm<AddManagerSchema>({
    resolver: zodResolver(addManagerSchema),
    defaultValues: {
      username: '',
      cpf: '',
      email: '',
      poleId: 'none',
      birthday: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = addManagerForm

  const { mutateAsync: createManagerFn } = useCreateManager()

  async function handleAddManager({
    username,
    cpf,
    email,
    civilId,
    militaryId,
    birthday,
    poleId,
  }: AddManagerSchema) {
    try {
      if (!courseId) throw new Error('Course not found.')

      await createManagerFn({
        username,
        cpf,
        email,
        civilId,
        militaryId,
        birthday: formatDate(birthday),
        courseId,
        poleId,
      })

      toast.success('Gerente criado com sucesso!', {
        duration: 1000,
      })

      reset()
    } catch (err) {
      fail(err)
    }
  }

  const cpf = watch('cpf') ? formatCPF(watch('cpf')) : ''

  return (
    <div className="w-full px-4 py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="mb-4 w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar Supervisores
        </h2>

        <div className="group relative my-8 rounded">
          <form className="space-y-2" onSubmit={handleSubmit(handleAddManager)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded bg-pmpa-blue-700 p-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm text-gray-200">
                    Nome completo:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu nome completo..."
                    {...register('username')}
                  />
                  {errors.username && (
                    <span className="text-sm text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="cpf" className="text-sm text-gray-200">
                    CPF:
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu CPF..."
                    value={cpf}
                    maxLength={14}
                    autoComplete="off"
                    {...register('cpf')}
                  />
                  {errors.cpf && (
                    <span className="text-sm text-red-500">
                      {errors.cpf.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm text-gray-200">
                    E-mail:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu email..."
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 rounded bg-pmpa-blue-700 p-4">
                <div className="space-y-1">
                  <label htmlFor="civilId" className="text-sm text-gray-200">
                    RG Civil:
                  </label>
                  <input
                    type="text"
                    id="civilId"
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu RG CIVIL..."
                    {...register('civilId')}
                  />
                  {errors.civilId && (
                    <span className="text-sm text-red-500">
                      {errors.civilId.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="militaryId" className="text-sm text-gray-200">
                    RG Militar:
                  </label>
                  <input
                    type="text"
                    id="militaryId"
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu RG MILITAR..."
                    {...register('militaryId')}
                  />
                  {errors.militaryId && (
                    <span className="text-sm text-red-500">
                      {errors.militaryId.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="birthday" className="text-sm text-gray-200">
                    Data de nascimento:
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite sua data de nascimento..."
                    {...register('birthday')}
                  />
                  {errors.birthday && (
                    <span className="text-sm text-red-500">
                      {errors.birthday.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="pole" className="text-sm text-gray-200">
                    Selecione o polo
                  </label>
                  <FormProvider {...addManagerForm}>
                    <ListCoursePoles />
                  </FormProvider>
                </div>
                {errors.poleId && (
                  <span className="text-sm text-red-500">
                    {errors.poleId.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded bg-pmpa-blue-500 px-4 py-2 text-white hover:bg-pmpa-blue-700 md:w-auto"
            >
              Adicionar
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
