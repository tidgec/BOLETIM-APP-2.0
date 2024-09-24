import { AxiosError } from 'axios'
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
import { useDeleteAdmin } from '@/hooks/use-delete-admin'
import { useGetAdmins } from '@/hooks/use-get-admins'
import { formatCPF } from '@/utils/format-cpf'

export function DeleteAdmins() {
  const [searchParams] = useSearchParams()

  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')
  const page = searchParams.get('page')

  const { admins, totalItems, pages, isLoading } = useGetAdmins({
    cpf: cpf ?? '',
    username: username ?? '',
    page: page ?? '1',
  })

  const { mutateAsync: deleteAdminFn } = useDeleteAdmin()

  async function handleDeleteAdmin(id: string) {
    try {
      await deleteAdminFn({
        id,
      })

      toast.success('Administrador deletado com sucesso!', {
        duration: 1000,
      })
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
          Deletar Administrador
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
            admins?.map((admin) => (
              <AlertDialog key={admin.id}>
                <AlertDialogTrigger className="text-start">
                  <ul className="space-y-2 rounded border p-4">
                    <li className="mb-4 text-lg font-semibold">
                      Nome: {admin.username}
                    </li>
                    <li>CPF: {formatCPF(admin.cpf)}</li>
                    <li>Email: {admin.email}</li>
                    <li>Inserido em: {admin.createdAt}</li>
                  </ul>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Deseja remover esse administrador?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Caso clique em continuar,
                      todos os registros desse usuário serão deletados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Não</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button onClick={() => handleDeleteAdmin(admin.id)}>
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
