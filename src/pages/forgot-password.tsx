import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import PMPALogo from '@/assets/pmpa.png'
import { Button } from '@/components/ui/button'
import { useForgotPassword } from '@/hooks/use-forgot-password'
import { fail } from '@/utils/fail'
import { formatCPF } from '@/utils/format-cpf'

const forgotPasswordSchema = z.object({
  cpf: z
    .string()
    .min(14, { message: 'CPF inválido!' })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: 'Formato do CPF inválido.',
    }),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const { mutateAsync: forgotPasswordFn } = useForgotPassword()

  async function handleForgotPassword({ cpf }: ForgotPasswordSchema) {
    try {
      const data = await forgotPasswordFn({ cpf })
      const { message } = data

      toast.success(message, {
        duration: 2000,
      })

      reset()
    } catch (err) {
      fail(err)
    }
  }

  const cpf = watch('cpf') ? formatCPF(watch('cpf')) : ''

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
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="CPF">
              CPF:
            </label>
            <input
              type="text"
              id="CPF"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Digite seu CPF"
              value={cpf}
              maxLength={14}
              autoComplete="off"
              {...register('cpf')}
            />
            {errors.cpf && (
              <span className="text-xs text-red-500 sm:text-sm">
                {errors.cpf.message}
              </span>
            )}
          </div>

          <div className="flex w-full justify-end px-6">
            <Button className="rounded px-4 py-2 font-bold transition-colors hover:bg-white hover:text-black">
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
