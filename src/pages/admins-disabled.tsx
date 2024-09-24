import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Filter } from '@/components/filter'
import { Pagination } from '@/components/pagination'
import { UserSkeleton } from '@/components/skeletons/user-skeleton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useActiveAdminStatus } from '@/hooks/use-active-admin-status'
import { useGetAdmins } from '@/hooks/use-get-admins'
import { formatCPF } from '@/utils/format-cpf'

const activeAdminSchema = z.object({
  reason: z
    .string()
    .min(3, { message: 'A mensagem não pode ser menor que 3 caracateres' })
    .max(200, { message: 'A mensagem não pode ser maior que 200 caracateres' }),
})

type ActiveAdminSchema = z.infer<typeof activeAdminSchema>

export function AdminsDisabled() {
  const [searchParams] = useSearchParams()

  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')
  const page = searchParams.get('page')

  const { admins, totalItems, pages, isLoading } = useGetAdmins({
    cpf: cpf ?? '',
    username: username ?? '',
    page: page ?? '1',
    isEnabled: 'false',
  })

  const { handleSubmit, register, reset } = useForm<ActiveAdminSchema>({
    resolver: zodResolver(activeAdminSchema),
    defaultValues: {
      reason: '',
    },
  })

  const { mutateAsync: activeAdminStatus } = useActiveAdminStatus()

  async function handleDisableAdmin({
    id,
    reason,
  }: {
    id: string
    reason: string
  }) {
    try {
      await activeAdminStatus({
        id,
        reason,
      })

      toast.success('Estudante desativado com sucesso!', {
        duration: 1000,
      })

      reset()
    } catch (error) {
      const err = error as AxiosError

      toast.error(err.response?.data.message, {
        duration: 1000,
      })
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Ativar Administrador
        </h2>

        <Filter.Root>
          <Filter.UsernameInput />
          <Filter.CPFInput />
        </Filter.Root>

        <div className="mx-2 mb-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading && (
            <div className="h-full space-y-2 overflow-auto">
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </div>
          )}
          {!isLoading &&
            admins?.map((admin) => (
              <Dialog key={admin.id}>
                <DialogTrigger className="text-start">
                  <ul className="space-y-2 rounded border p-4">
                    <li className="mb-4 text-lg font-semibold">
                      Nome: {admin.username}
                    </li>
                    <li>CPF: {formatCPF(admin.cpf)}</li>
                    <li>Email: {admin.email}</li>
                    <li>Inserido em: {admin.createdAt}</li>
                  </ul>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Deseja ativar esse administrador?
                      </DialogTitle>
                    </DialogHeader>

                    <form
                      className="space-y-4"
                      onSubmit={handleSubmit(({ reason }) =>
                        handleDisableAdmin({ reason, id: admin.id }),
                      )}
                    >
                      <div>
                        <Textarea
                          placeholder="Digite o motivo do administrador estar sendo ativado..."
                          {...register('reason')}
                        />
                      </div>

                      <DialogFooter className="">
                        <Button
                          type="submit"
                          className="rounded bg-pmpa-blue-500 px-4 py-2 hover:bg-pmpa-blue-600"
                          variant={'default'}
                        >
                          Ativar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </DialogTrigger>
              </Dialog>
            ))}
        </div>
        <Pagination
          items={totalItems ?? 0}
          page={page ? Number(page) : 1}
          pages={pages ?? 0}
        />
      </section>
    </div>
  )
}
