import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetCoursePoles } from '@/hooks/use-get-course-poles'
import { useUpdateManager } from '@/hooks/use-update-manager'
import { formatCPF } from '@/utils/format-cpf'

const updateManagerSchema = z.object({
  username: z.string().optional(),
  cpf: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  civilId: z.string().optional(),
  militaryId: z.string().optional(),
  birthday: z.string(),
  poleId: z.string(),
  newCourseId: z.string(),
})

type UpdateManagerSchema = z.infer<typeof updateManagerSchema>

export function UpdateManager() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('courseId')

  const { handleSubmit, register, watch, control, reset } =
    useForm<UpdateManagerSchema>({
      resolver: zodResolver(updateManagerSchema),
      defaultValues: {
        newCourseId: courseId ?? '',
      },
    })

  const { poles, isLoading: isLoadingPoles } = useGetCoursePoles({
    courseId: String(courseId),
  })

  const { mutateAsync: updateManagerFn } = useUpdateManager()

  async function handleUpdateManager({
    username,
    cpf,
    email,
    password,
    birthday,
    fatherName,
    motherName,
    civilId,
    militaryId,
    newCourseId,
    poleId,
  }: UpdateManagerSchema) {
    try {
      await updateManagerFn({
        id: String(id),
        courseId: String(courseId),
        newCourseId,
        poleId,
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

      toast.success('Gerente atualizado com sucesso!')
      reset()
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu algum error')
    }
  }

  const cpf = watch('cpf') ? formatCPF(watch('cpf') ?? '') : ''

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Atualizar gerente
        </h2>

        <div className="group relative my-8 rounded">
          <form
            className="space-y-2"
            onSubmit={handleSubmit(handleUpdateManager)}
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
                    autoComplete="off"
                    {...register('username')}
                  />
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
                    autoComplete="off"
                    {...register('cpf')}
                  />
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
                    autoComplete="off"
                    {...register('email')}
                  />
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
                    placeholder="Digite seu RG Civil..."
                    autoComplete="off"
                    {...register('civilId')}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="militaryId" className="text-sm text-gray-200">
                    RG Militar:
                  </label>
                  <input
                    type="text"
                    id="militaryId"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite seu RG Militar..."
                    autoComplete="off"
                    {...register('militaryId')}
                  />
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
                </div>
              </div>

              <div className="space-y-2 rounded bg-pmpa-blue-700 p-4">
                <label htmlFor="poleId" className="text-sm text-gray-200">
                  Polos:
                </label>
                {isLoadingPoles ? (
                  <Skeleton className="h-10 w-full rounded border bg-slate-300 p-2" />
                ) : (
                  <Controller
                    name="poleId"
                    defaultValue="all"
                    control={control}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => (
                      <select
                        name={name}
                        id="poleId"
                        value={value}
                        disabled={disabled}
                        onChange={onChange}
                        className="w-full rounded border p-2"
                      >
                        <option value={'all'}>Todos</option>
                        {poles?.map((pole) => (
                          <option key={pole.id} value={pole.id}>
                            {pole.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="ml-auto block rounded bg-pmpa-blue-500 px-3 py-2 text-white hover:bg-pmpa-blue-700"
            >
              Atualizar
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
