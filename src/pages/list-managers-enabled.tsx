import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useChangeManagerStatus } from '@/hooks/use-change-manager-status'
import { useGetCourseManagers } from '@/hooks/use-get-course-managers'
import { formatCPF } from '@/utils/format-cpf'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export function ListManagersEnabledPage() {
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

  const { mutateAsync: changeManagerStatusFn } = useChangeManagerStatus()

  async function handleActiveManager(id: string) {
    try {
      await changeManagerStatusFn({
        courseId: String(courseId),
        managerId: id,
        status: false,
      })

      toast.success('Gerente desativado com sucesso!', {
        duration: 1000,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Desativar Gerente
        </h2>

        <FilterForm />

        <div className="mx-2 mb-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading && <p>Loading...</p>}
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

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Deseja desativar esse gerente?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction
                        onClick={() => handleActiveManager(manager.id)}
                        className="bg-pmpa-blue-600 hover:bg-pmpa-blue-400"
                      >
                        Sim
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogTrigger>
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
