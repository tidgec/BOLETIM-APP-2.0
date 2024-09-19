import { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Discipline } from '@/components/discipline'
import { Pagination } from '@/components/pagination'
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
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteDiscipline } from '@/hooks/use-delete-discipline'
import { useGetDisciplines } from '@/hooks/use-get-disciplines'

export function DeleteDisciplines() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const {
    disciplines,
    pages,
    totalItems,
    isLoading: isLoadingGetDisciplines,
  } = useGetDisciplines({ page })

  const { mutateAsync: deleteAdminFn } = useDeleteDiscipline()

  async function handleDeleteDiscipline(id: string) {
    try {
      await deleteAdminFn({
        id,
      })

      toast.success('Disciplina deletada com sucesso!', {
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
          Deletar Disciplina
        </h2>

        <div className="mb-6 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoadingGetDisciplines
            ? [1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="m-2">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))
            : disciplines?.map((discipline) => (
                <AlertDialog key={discipline.id}>
                  <AlertDialogTrigger className="text-start">
                    <Discipline name={discipline.name} />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Deseja remover essa disciplina?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Caso clique em
                        continuar, todos os registros dessa disciplina serão
                        deletados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Não</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          onClick={() => handleDeleteDiscipline(discipline.id)}
                        >
                          Sim
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
        </div>

        {disciplines && (
          <Pagination
            items={totalItems ?? 0}
            pages={pages ?? 0}
            page={page ? Number(page) : 0}
          />
        )}
      </section>
    </div>
  )
}
