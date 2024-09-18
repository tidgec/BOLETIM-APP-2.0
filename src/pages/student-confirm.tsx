import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useConfirmStudentLogin } from '@/hooks/use-confirm-student-login'

const confirmStudentLoginSchema = z.object({
  fatherName: z.string().optional(),
  motherName: z.string(),
  militaryId: z.string().optional(),
  state: z.string().optional(),
  county: z.string().optional(),
})

type ConfirmStudentLoginSchema = z.infer<typeof confirmStudentLoginSchema>

export function StudentConfirm() {
  const navigate = useNavigate()

  const { handleSubmit, register, reset } = useForm<ConfirmStudentLoginSchema>({
    resolver: zodResolver(confirmStudentLoginSchema),
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
    <div className="my-20 sm:my-16 lg:my-28">
      <section className="mx-auto w-full max-w-sm space-y-4 rounded bg-pmpa-blue-700 py-8 sm:max-w-md md:max-w-lg lg:max-w-3xl">
        <h2 className="ml-4 text-xl font-medium text-white">
          Confirmação de login
        </h2>

        <form
          className="w-full space-y-4 text-white"
          onSubmit={handleSubmit(handleConfirmStudentLogin)}
        >
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
            <label className="text-xs sm:text-sm" htmlFor="militaryId">
              RG Militar:
            </label>
            <input
              type="text"
              id="militaryId"
              className="rounded px-4 py-2 text-black placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Digite o nome da sua mãe"
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
              placeholder="Digite o nome da sua mãe"
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
              placeholder="Digite o nome da sua mãe"
              {...register('county')}
            />
          </div>

          <div className="flex justify-end px-4 sm:flex-row sm:px-6">
            <Button variant={'secondary'}>Confirmar</Button>
          </div>
        </form>
      </section>
    </div>
  )
}
