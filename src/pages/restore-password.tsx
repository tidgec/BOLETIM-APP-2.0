import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import PMPALogo from '@/assets/pmpa.png'
import { Button } from '@/components/ui/button'
import { useRestorePassword } from '@/hooks/use-restore-password'
import { fail } from '@/utils/fail'

const restorePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'A senha não pode ser menor que 6 caracteres.' })
      .max(14, { message: 'A senha não pode ser maior que 14 caracteres.' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'A senha não pode ser menor que 6 caracteres.' })
      .max(14, { message: 'A senha não pode ser maior que 14 caracteres.' }),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: 'As senhas devem ser iguais!',
      path: ['confirmPassword'],
    },
  )

export type RestorePasswordSchema = z.infer<typeof restorePasswordSchema>

export function RestorePassword() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RestorePasswordSchema>({
    resolver: zodResolver(restorePasswordSchema),
  })

  const { mutateAsync: restorePasswordFn } = useRestorePassword()

  async function handleRestorePassword({
    newPassword,
    confirmPassword,
  }: RestorePasswordSchema) {
    if (!email) {
      return navigate('/sign-in')
    }

    try {
      await restorePasswordFn({
        email,
        newPassword,
        confirmPassword,
      })

      toast.success('Senha atualizada com sucesso!', {
        duration: 2000,
      })

      reset()

      return navigate('/sign-in')
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="my-20 sm:my-16 lg:my-28">
      <div className="mx-auto w-full max-w-sm space-y-4 rounded bg-pmpa-blue-700 py-12 sm:max-w-md sm:py-16 md:max-w-lg lg:max-w-3xl lg:py-24">
        <img
          src={PMPALogo}
          className="mx-auto h-16 w-auto sm:h-20 lg:h-24"
          alt="Logo da polícia militar do Pará"
        />
        <form
          className="w-full space-y-4 text-white"
          onSubmit={handleSubmit(handleRestorePassword)}
        >
          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="password">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="******"
              autoComplete="off"
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <span className="text-xs text-red-500 sm:text-sm">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="confirmPassword">
              Confirme sua senha:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="******"
              autoComplete="off"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500 sm:text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="flex w-full justify-end px-6">
            <Button className="rounded px-4 py-2 font-bold transition-colors hover:bg-white hover:text-black">
              Restaurar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
