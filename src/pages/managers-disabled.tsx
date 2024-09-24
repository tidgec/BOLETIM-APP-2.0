import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { FilterForm } from '@/components/filter/filter-form'
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
import { useActiveManagerStatus } from '@/hooks/use-active-manager-status'
import { useGetCourseManagers } from '@/hooks/use-get-course-managers'
import { formatCPF } from '@/utils/format-cpf'

const activeManagerSchema = z.object({
  reason: z
    .string()
    .min(3, { message: 'A mensagem não pode ser menor que 3 caracateres' })
    .max(200, { message: 'A mensagem não pode ser maior que 200 caracateres' }),
})

type ActiveManagerSchema = z.infer<typeof activeManagerSchema>

export function ManagersDisabled() {
  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('courseId')
  const poleId = searchParams.get('poleId')
  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')
  const page = searchParams.get('page')

  const { managers, totalItems, pages, isLoading } = useGetCourseManagers({
    courseId: String(courseId),
    cpf: cpf ?? '',
    username: username ?? '',
    page: page ?? '1',
    poleId: poleId ?? 'all',
    isEnabled: false,
  })

  const { handleSubmit, register, reset } = useForm<ActiveManagerSchema>({
    resolver: zodResolver(activeManagerSchema),
    defaultValues: {
      reason: '',
    },
  })

  const { mutateAsync: activeManagerStatusFn } = useActiveManagerStatus()

  async function handleActiveManager({
    id,
    reason,
  }: {
    id: string
    reason: string
  }) {
    try {
      await activeManagerStatusFn({
        courseId: String(courseId),
        managerId: id,
        reason,
      })

      toast.success('Gerente ativado com sucesso!', {
        duration: 1000,
      })

      reset()
    } catch (error) {}
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Ativar Gerente
        </h2>

        <FilterForm />

        <div className="mx-2 mb-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading && (
            <div className="h-full space-y-2 overflow-auto">
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </div>
          )}
          {!isLoading &&
            managers?.map((manager) => (
              <Dialog key={manager.id}>
                <DialogTrigger className="text-start">
                  <ul className="space-y-2 rounded border p-4">
                    <li className="mb-4 text-lg font-semibold">
                      Nome: {manager.username}
                    </li>
                    <li>CPF: {formatCPF(manager.cpf)}</li>
                    <li>Email: {manager.email}</li>
                    <li>Curso: {manager.course.name}</li>
                    <li>Polo: {manager.pole.name}</li>
                    <li>Inserido em: {manager.createdAt}</li>
                  </ul>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deseja ativar esse gerente?</DialogTitle>
                    </DialogHeader>

                    <form
                      className="space-y-4"
                      onSubmit={handleSubmit(({ reason }) =>
                        handleActiveManager({ reason, id: manager.id }),
                      )}
                    >
                      <div>
                        <Textarea
                          placeholder="Digite o motivo do gerente estar sendo ativado..."
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
