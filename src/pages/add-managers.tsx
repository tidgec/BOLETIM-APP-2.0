import { ListCoursePoles } from '@/components/list-course-poles'
import { useCreateManager } from '@/hooks/use-create-manager'
import { formatCPF } from '@/utils/format-cpf'
import { formatDate } from '@/utils/format-date'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

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
  civilId: z
    .string()
    .length(5, { message: 'O RG civil deve conter 5 caracteres' }),
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
      civilId: '',
      cpf: '',
      email: '',
      poleId: '',
      birthday: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = addManagerForm

  const { mutateAsync: createManagerFn } = useCreateManager()

  async function handleAddManager({
    username,
    cpf,
    email,
    civilId,
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
        birthday: formatDate(birthday),
        courseId,
        poleId,
      })

      toast.success('Estudante criado com sucesso!', {
        duration: 500,
      })
    } catch (error) {
      toast.error('Ocorreu um erro ao criar o estudante.', {
        duration: 1000,
        closeButton: true,
      })
    }
  }

  const cpf = watch('cpf') ? formatCPF(watch('cpf')) : ''

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar Supervisores
        </h2>

        <div className="group relative my-8 rounded">
          <form className="space-y-2" onSubmit={handleSubmit(handleAddManager)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 rounded bg-pmpa-blue-700 p-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm text-gray-200">
                    Nome completo:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
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
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
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
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
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

              <div className="space-y-2 rounded bg-pmpa-blue-700 p-4">
                {/* <div className="space-y-1">
                  <label htmlFor="pai" className="text-sm text-gray-200">
                    Nome do pai:
                  </label>
                  <input
                    type="text"
                    id="pai"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite o nome completo do pai..."
                  />
                </div> */}
                {/* <div className="space-y-1">
                  <label htmlFor="mãe" className="text-sm text-gray-200">
                    Nome da mãe:
                  </label>
                  <input
                    type="text"
                    id="mãe"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite o nome completo da mãe..."
                  />
                </div> */}
                <div className="space-y-1">
                  <label htmlFor="civilId" className="text-sm text-gray-200">
                    RG Civil:
                  </label>
                  <input
                    type="text"
                    id="civil"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu RG CIVIL..."
                    {...register('civilId')}
                  />
                  {errors.civilId && (
                    <span className="text-sm text-red-500">
                      {errors.civilId.message}
                    </span>
                  )}
                </div>
                {/* <div className="space-y-1">
                  <label htmlFor="civil" className="text-sm text-gray-200">
                    RG Militar:
                  </label>
                  <input
                    type="text"
                    id="militar"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu RG MILITAR..."
                  />
                </div> */}
                <div className="space-y-1">
                  <label htmlFor="data" className="text-sm text-gray-200">
                    Data de nascimento:
                  </label>
                  <input
                    type="date"
                    id="data"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite sua data de nascimento..."
                    {...register('birthday')}
                  />
                  {errors.birthday && (
                    <span className="text-sm text-red-500">
                      {errors.birthday.message}
                    </span>
                  )}
                </div>
                {/* <div className="space-y-1">
                  <label htmlFor="course" className="text-sm text-gray-200">
                    Selecione o curso
                  </label>
                  <select
                    id="course"
                    className="w-full rounded px-4 py-3 text-sm text-gray-700"
                  >
                    <option value="">Selecione um curso</option>
                    <option value="curso1">CAS</option>
                    <option value="curso2">CFP</option>
                  </select>
                </div> */}
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
              className="ml-auto block rounded bg-pmpa-blue-500 px-3 py-2 text-white hover:bg-pmpa-blue-700"
            >
              Adicionar
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
