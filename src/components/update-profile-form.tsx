import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useUpdateProfile } from '@/hooks/use-update-profile'

import { DialogFooter } from './ui/dialog'

const updateProfileFormSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  birthday: z.string().optional(),
  civilId: z.string().optional(),
  militaryId: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  state: z.string().optional(),
  county: z.string().optional(),
})

type UpdateProfileFormSchema = z.infer<typeof updateProfileFormSchema>

export function UpdateProfileForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormSchema>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const { mutateAsync: updateProfileFn } = useUpdateProfile()

  async function handleUpdateProfile({
    username,
    email,
    password,
    birthday,
    civilId,
    militaryId,
    fatherName,
    motherName,
    state,
    county,
  }: UpdateProfileFormSchema) {
    try {
      await updateProfileFn({
        username: username || undefined,
        email: email || undefined,
        password: password || undefined,
        birthday: birthday || undefined,
        fatherName: fatherName || undefined,
        motherName: motherName || undefined,
        civilId: civilId || undefined,
        militaryId: militaryId || undefined,
        state: state || undefined,
        county: county || undefined,
      })

      toast.success('Perfil atualizado com sucesso!', {
        duration: 1000,
      })

      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className="relative flex flex-col items-center space-y-4 px-6 py-4"
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <div className="w-full space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm">
            Nome Completo:
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="rounded px-4 py-3 text-black"
            {...register('username')}
          />
          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            className="rounded px-4 py-3 text-black"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className="rounded px-4 py-3 text-black"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="birthday" className="text-sm">
            Data de nascimento:
          </label>
          <input
            type="text"
            id="birthday"
            placeholder="20/12/2022"
            className="rounded px-4 py-3 text-black"
            {...register('birthday')}
          />
          {errors.birthday && (
            <span className="text-sm text-red-500">
              {errors.birthday.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="civilId" className="text-sm">
            RG Civil:
          </label>
          <input
            type="text"
            id="civilId"
            placeholder="00000"
            className="rounded px-4 py-3 text-black"
            {...register('civilId')}
          />
          {errors.civilId && (
            <span className="text-sm text-red-500">
              {errors.civilId.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="militaryId" className="text-sm">
            RG Militar:
          </label>
          <input
            type="text"
            id="militaryId"
            placeholder="00000"
            className="rounded px-4 py-3 text-black"
            {...register('militaryId')}
          />
          {errors.militaryId && (
            <span className="text-sm text-red-500">
              {errors.militaryId.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fatherName" className="text-sm">
            Nome do Pai:
          </label>
          <input
            type="text"
            id="fatherName"
            placeholder="John Doe"
            className="rounded px-4 py-3 text-black"
            {...register('fatherName')}
          />
          {errors.fatherName && (
            <span className="text-sm text-red-500">
              {errors.fatherName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="motherName" className="text-sm">
            Nome da Mãe:
          </label>
          <input
            type="text"
            id="motherName"
            placeholder="John Doe"
            className="rounded px-4 py-3 text-black"
            {...register('motherName')}
          />
          {errors.motherName && (
            <span className="text-sm text-red-500">
              {errors.motherName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="state" className="text-sm">
            Sigla do estado:
          </label>
          <input
            type="text"
            id="state"
            placeholder="PA"
            className="rounded px-4 py-3 text-black"
            {...register('state')}
          />
          {errors.state && (
            <span className="text-sm text-red-500">{errors.state.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="county" className="text-sm">
            Município:
          </label>
          <input
            type="text"
            id="county"
            placeholder="Lugar de tal"
            className="rounded px-4 py-3 text-black"
            {...register('county')}
          />
          {errors.county && (
            <span className="text-sm text-red-500">
              {errors.county.message}
            </span>
          )}
        </div>
      </div>

      <DialogFooter className="sticky bottom-0 left-0 w-full bg-pmpa-blue-900 px-8 py-4">
        <button
          type="submit"
          className="rounded px-4 py-2 hover:bg-pmpa-blue-500"
        >
          Atualizar
        </button>
      </DialogFooter>
    </form>
  )
}
