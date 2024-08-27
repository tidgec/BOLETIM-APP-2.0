import { formatCPF } from '@/utils/format-cpf'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateAdminSchema = z.object({
  username: z.string().optional(),
  cpf: z.string().optional(),
  email: z.string().optional(),
  civilId: z.string().optional(),
  birthday: z.string().optional(),
  password: z.string().optional(),
})

type UpdateAdminSchema = z.infer<typeof updateAdminSchema>

export function UpdateAdmins() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<UpdateAdminSchema>({
    resolver: zodResolver(updateAdminSchema),
    defaultValues: {
      username: '',
      civilId: '',
      cpf: '',
      email: '',
      birthday: '',
    },
  })

  async function handleUpdateAdmin({
    username,
    cpf,
    email,
    password,
    birthday,
    civilId,
  }: UpdateAdminSchema) {}

  const cpf = watch('cpf') ? formatCPF(watch('cpf') ?? '') : ''
  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Atualizar Administrador
        </h2>

        <div className="group relative my-8 rounded">
          <form className="space-y-2">
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
                    value={cpf}
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu CPF..."
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
                <div className="space-y-1">
                  <label htmlFor="senha" className="text-sm text-gray-200">
                    Senha:
                  </label>
                  <input
                    type="password"
                    id="senha"
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
                </div>
                <div className="space-y-1">
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
                  <label htmlFor="civil" className="text-sm text-gray-200">
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
                  <label htmlFor="date" className="text-sm text-gray-200">
                    Data de nascimento:
                  </label>
                  <input
                    type="date"
                    id="date"
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
              className="ml-auto block rounded bg-blue-800 px-3 py-2 text-white hover:bg-blue-700"
            >
              Atualizar
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
