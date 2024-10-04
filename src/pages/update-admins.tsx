import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetAdmins } from '@/hooks/use-get-admins'
import { useUpdateAdmin } from '@/hooks/use-update-admin'
import { fail } from '@/utils/fail'
import { formatCPF } from '@/utils/format-cpf'

const updateAdminSchema = z.object({
  username: z.string().optional(),
  cpf: z.string().optional(),
  email: z.string().optional(),
  civilId: z.string().optional(),
  militaryId: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  birthday: z.string().optional(),
  password: z.string().optional(),
})

type UpdateAdminSchema = z.infer<typeof updateAdminSchema>

export function UpdateAdmins() {
  const { id } = useParams()

  const { admins } = useGetAdmins({})

  const admin = admins?.find((item) => item.id === id)

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<UpdateAdminSchema>({
    resolver: zodResolver(updateAdminSchema),
    values: {
      username: admin?.username ?? '',
      civilId: admin?.civilId ?? '',
      militaryId: admin?.militaryId ?? '',
      cpf: admin?.cpf ? formatCPF(admin.cpf) : '',
      email: admin?.email ?? '',
      fatherName: admin?.fatherName ?? '',
      motherName: admin?.motherName ?? '',
    },
  })

  const { mutateAsync: updateAdminFn, isPending } = useUpdateAdmin()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! O administrador está sendo atualizado.',
    )
  }

  async function handleUpdateAdmin({
    username,
    cpf,
    email,
    password,
    birthday,
    civilId,
    fatherName,
    motherName,
    militaryId,
  }: UpdateAdminSchema) {
    try {
      await updateAdminFn({
        id: String(id),
        username: username || undefined,
        cpf: cpf || undefined,
        email: email || undefined,
        password: password || undefined,
        birthday: birthday || undefined,
        fatherName: fatherName || undefined,
        motherName: motherName || undefined,
        civilId: civilId || undefined,
        militaryId: militaryId || undefined,
      })

      toast.success('Administrador atualizado com sucesso!', {
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

  const cpf = watch('cpf') ? formatCPF(watch('cpf') ?? '') : ''
  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Atualizar Administrador
        </h2>

        <div className="group relative my-8 rounded">
          <form
            className="space-y-2"
            onSubmit={handleSubmit(handleUpdateAdmin)}
          >
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
                <div className="space-y-1">
                  <label htmlFor="fatherName" className="text-sm text-gray-200">
                    Nome do pai:
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite o nome completo do pai..."
                    autoComplete="off"
                    {...register('fatherName')}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="motherName" className="text-sm text-gray-200">
                    Nome da mãe:
                  </label>
                  <input
                    type="text"
                    id="motherName"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite o nome completo da mãe..."
                    autoComplete="off"
                    {...register('motherName')}
                  />
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
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu RG MILITAR..."
                  />
                  {errors.militaryId && (
                    <span className="text-sm text-red-500">
                      {errors.militaryId.message}
                    </span>
                  )}
                </div>
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
