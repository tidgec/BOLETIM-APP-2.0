import { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Course } from '@/components/course'
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
import { useDeleteCourse } from '@/hooks/use-delete-course'
import { useGetCourses } from '@/hooks/use-get-courses'

export function DeleteCourses() {
  const [searchParams] = useSearchParams()

  const page = searchParams.get('page')

  const { courses, totalItems, pages, isLoading } = useGetCourses(page ?? '1')

  const { mutateAsync: deleteCourseFn } = useDeleteCourse()

  async function handleDeleteCourse(id: string) {
    try {
      await deleteCourseFn({ id })

      toast.success('Curso deletado com sucesso!', {
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
          Deletar Curso
        </h2>

        <div className="mx-2 my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white text-center shadow-md">
                  <Skeleton className="mb-2 h-32 w-full" />
                  <Skeleton className="mx-auto h-6 w-3/4" />
                </div>
              ))
            : courses?.map((course) => (
                <AlertDialog key={course.id}>
                  <AlertDialogTrigger>
                    <div className="bg-white text-center shadow-md">
                      <Course course={course} />
                    </div>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Deseja remover esse curso?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Caso clique em
                        continuar, todos os registros desse curso serão
                        deletados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Não</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button onClick={() => handleDeleteCourse(course.id)}>
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
