import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import { UserSkeleton } from '@/components/skeletons/user-skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteManager } from '@/hooks/use-delete-manager'
import { useGetCourseManagers } from '@/hooks/use-get-course-managers'
import { fail } from '@/utils/fail'
import { formatCPF } from '@/utils/format-cpf'

export function DeleteManagers() {
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
  })

  const { mutateAsync: deleteManagerFn, isPending } = useDeleteManager()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading('Aguarde um pouco! O gerente está sendo removido.')
  }

  async function handleDeleteManager(id: string) {
    try {
      await deleteManagerFn({
        id,
      })

      toast.success('Gerente deletado com sucesso!', {
        duration: 1000,
        onAutoClose: () => {
          toast.dismiss(toastId)
        },
      })
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Deletar Gerente
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
              <AlertDialog key={manager.id}>
                <AlertDialogTrigger className="text-start">
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
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Deseja remover esse gerente?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Caso clique em continuar,
                      todos os registros desse usuário serão deletados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Não</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button onClick={() => handleDeleteManager(manager.id)}>
                        Sim
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
