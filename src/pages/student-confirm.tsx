import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useConfirmStudentLogin } from '@/hooks/use-confirm-student-login'
import { useProfile } from '@/hooks/use-profile'
import { formatCPF } from '@/utils/format-cpf'

const confirmStudentLoginSchema = z.object({
  username: z.string(),
  cpf: z.string(),
  email: z.string(),
  civilId: z.string(),
  fatherName: z.string().optional(),
  motherName: z.string(),
  militaryId: z.string().optional(),
  state: z.string().optional(),
  county: z.string().optional(),
})

type ConfirmStudentLoginSchema = z.infer<typeof confirmStudentLoginSchema>

export function StudentConfirm() {
  const navigate = useNavigate()

  const { user } = useProfile()

  const { handleSubmit, register, reset } = useForm<ConfirmStudentLoginSchema>({
    resolver: zodResolver(confirmStudentLoginSchema),
    values: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      civilId: user?.civilId ?? '',
      cpf: user?.cpf ? formatCPF(user.cpf) : '',
      militaryId: user?.militaryId ?? '',
      motherName: user?.motherName ?? '',
    },
  })

  const { mutateAsync: confirmStudentLoginFn } = useConfirmStudentLogin()

  async function handleConfirmStudentLogin({
    fatherName,
    motherName,
    militaryId,
    state,
    county,
  }: ConfirmStudentLoginSchema) {
    try {
      await confirmStudentLoginFn({
        fatherName,
        motherName,
        militaryId,
        state,
        county,
      })

      toast.success('Login confirmado!', {
        duration: 1000,
        onAutoClose: () => {
          navigate('/student/home', {
            replace: true,
          })
        },
      })

      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="my-20 sm:my-16">
      <section className="mx-auto w-full max-w-sm space-y-4 rounded bg-pmpa-blue-700 py-8 sm:max-w-md md:max-w-lg lg:max-w-3xl">
        <h2 className="ml-4 text-xl font-medium text-white">
          Confirmação de login
        </h2>

        <form
          className="w-full space-y-4 text-white"
          onSubmit={handleSubmit(handleConfirmStudentLogin)}
        >
          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="name">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Digite o seu nome"
              {...register('username')}
            />
          </div>

          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="email">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Digite o seu nome"
              {...register('email')}
            />
          </div>

          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="fatherName">
              Nome do pai:
            </label>
            <input
              type="text"
              id="fatherName"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Digite o nome do seu pai"
              {...register('fatherName')}
            />
          </div>

          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="motherName">
              Nome da mãe:
            </label>
            <input
              type="text"
              id="motherName"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Digite o nome da sua mãe"
              {...register('motherName')}
            />
          </div>

          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="civilId">
              RG Civil:
            </label>
            <input
              type="text"
              id="civilId"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Digite seu RG Civil"
              {...register('civilId')}
            />
          </div>

          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="militaryId">
              RG Militar:
            </label>
            <input
              type="text"
              id="militaryId"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Digite seu RG Militar"
              {...register('militaryId')}
            />
          </div>

          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="state">
              Sigla do estado:
            </label>
            <input
              type="text"
              id="state"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="PA"
              {...register('state')}
            />
          </div>

          <div className="flex flex-col space-y-1 px-4 sm:px-6">
            <label className="text-xs sm:text-sm" htmlFor="county">
              Município:
            </label>
            <input
              type="text"
              id="county"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Belém"
              {...register('county')}
            />
          </div>

          <div className="flex justify-end px-4 sm:flex-row sm:px-6">
            <Button variant={'secondary'}>Confirmar</Button>
          </div>
        </form>

        <div className="px-8 text-white">
          <p>CURSO: {user?.courses && user.courses[0].name}</p>
          <p>POLO: {user?.poles && user.poles[0].name}</p>
        </div>
      </section>
    </div>
  )
}
