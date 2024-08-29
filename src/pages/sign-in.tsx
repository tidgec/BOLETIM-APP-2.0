import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import PMPALogo from '@/assets/pmpa.png'
import { useSignIn } from '@/hooks/use-sign-in'
import { formatCPF } from '@/utils/format-cpf'

const signInSchema = z.object({
  cpf: z
    .string()
    .min(14, { message: 'CPF inválido!' })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: 'Formato do CPF inválido.',
    }),
  password: z
    .string()
    .min(6, { message: 'A senha não pode ser menor que 6 caracteres.' })
    .max(14, { message: 'A senha não pode ser maior que 14 caracteres.' }),
})

export type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const { mutateAsync: signInFn } = useSignIn()

  async function handleSignIn({ cpf, password }: SignInSchema) {
    try {
      const data = await signInFn({ cpf, password })
      const { token } = data

      const expiresIn1Hour = new Date(
        new Date().getTime() + 15 * 60 * 1000 * 60,
      )

      Cookies.set('token', token, {
        expires: expiresIn1Hour,
      })

      toast.success('Login realizado com sucesso!', {
        action: {
          label: 'Navegar',
          onClick: () => {
            navigate('/', {
              replace: true,
            })
          },
        },
        onAutoClose: () => {
          navigate('/', {
            replace: true,
          })
        },
        duration: 500,
      })
      reset()
    } catch (error) {
      toast.error('CPF ou senha incorretos.', {
        duration: 2000,
        closeButton: true,
      })
    }
  }

  const cpf = watch('cpf') ? formatCPF(watch('cpf')) : ''

  return (
    <div className="my-28">
      <div className="mx-auto w-full max-w-3xl space-y-4 rounded bg-pmpa-blue-700 py-24">
        <img
          src={PMPALogo}
          className="mx-auto h-24 w-20"
          alt="Logo da polícia militar do Pará"
        />
        <form
          className="w-full space-y-4 text-white"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="mx-auto flex w-full max-w-xl flex-col space-y-1">
            <label className="text-sm" htmlFor="CPF">
              CPF:
            </label>
            <input
              type="text"
              id="CPF"
              className="rounded px-4 py-2 text-black placeholder:text-sm"
              placeholder="Digite seu CPF"
              value={cpf}
              maxLength={14}
              autoComplete="off"
              {...register('cpf')}
            />
            {errors.cpf && (
              <span className="text-sm text-red-500">{errors.cpf.message}</span>
            )}
          </div>

          <div className="mx-auto flex w-full max-w-xl flex-col space-y-1">
            <label className="text-sm" htmlFor="password">
              Senha:
            </label>
            <div className="flex w-full flex-col">
              <div className="flex w-full items-center rounded bg-white">
                <input
                  type={viewPassword ? 'text' : 'password'}
                  id="password"
                  className="flex-1 rounded bg-transparent px-4 py-2 text-black placeholder:text-sm"
                  placeholder="Digite sua senha"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="px-2"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  {viewPassword ? (
                    <EyeOff size={20} className="text-pmpa-blue-700" />
                  ) : (
                    <Eye size={20} className="text-pmpa-blue-700" />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-xl justify-between">
            <Link to={'#'} className="text-sm">
              Esqueceu a senha?
            </Link>
            <button className="rounded px-4 py-1 font-bold transition-colors hover:bg-white hover:text-black">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
