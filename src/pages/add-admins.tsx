import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateAdmin } from '@/hooks/use-create-admin'
import { fail } from '@/utils/fail'
import { formatCPF } from '@/utils/format-cpf'
import { formatDate } from '@/utils/format-date'

const addAdminSchema = z.object({
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
  password: z
    .string()
    .min(6, { message: 'A senha não pode ser menor que 6 caracteres.' })
    .max(14, { message: 'A senha não pode ser maior que 14 caracteres.' }),
})

type AddAdminSchema = z.infer<typeof addAdminSchema>

export function AddAdmins() {
  const addAdminForm = useForm<AddAdminSchema>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: {
      username: '',
      civilId: '',
      cpf: '',
      email: '',
      birthday: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = addAdminForm

  const { mutateAsync: createAdminFn, isPending } = useCreateAdmin()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! O administrador está sendo cadastrado.',
    )
  }

  async function handleAddAdmin({
    username,
    cpf,
    email,
    password,
    civilId,
    militaryId,
    birthday,
  }: AddAdminSchema) {
    try {
      await createAdminFn({
        username,
        cpf,
        email,
        password,
        civilId,
        militaryId,
        birthday: formatDate(birthday),
      })

      toast.success('Administrator criado com sucesso!', {
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

  const cpf = watch('cpf') ? formatCPF(watch('cpf')) : ''

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar Administrador
        </h2>

        <div className="group relative my-8 rounded">
          <form className="space-y-4" onSubmit={handleSubmit(handleAddAdmin)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm text-gray-200">
                    Senha:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite sua senha..."
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="civilId" className="text-sm text-gray-200">
                    RG Civil:
                  </label>
                  <input
                    type="text"
                    id="civilId"
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
