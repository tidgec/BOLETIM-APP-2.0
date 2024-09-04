import { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { FilterForm } from '@/components/filter/filter-form'
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
import { useDeleteStudent } from '@/hooks/use-delete-student'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'
import { formatCPF } from '@/utils/format-cpf'

export function DeleteStudents() {
  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('courseId')
  const poleId = searchParams.get('poleId')
  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')
  const page = searchParams.get('page')

  const { students, totalItems, pages, isLoading } = useGetCourseStudents({
    courseId: String(courseId),
    cpf: cpf ?? '',
    username: username ?? '',
    page: page ?? '1',
    poleId: poleId ?? 'all',
  })

  const { mutateAsync: deleteStudentFn } = useDeleteStudent()

  async function handleDeleteStudent(id: string) {
    try {
      await deleteStudentFn({
        id,
      })

      toast.success('Estudante deletado com sucesso!', {
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
          Deletar Aluno
        </h2>

        <FilterForm />

        <div className="mx-2 mb-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            students?.map((student) => (
              <AlertDialog key={student.id}>
                <AlertDialogTrigger className="text-start">
                  <ul className="space-y-2 rounded border p-4">
                    <li className="mb-4 text-lg font-semibold">
                      Nome: {student.username}
                    </li>
                    <li>CPF: {formatCPF(student.cpf)}</li>
                    <li>Email: {student.email}</li>
                    <li>Curso: {student.course.name}</li>
                    <li>Polo: {student.pole.name}</li>
                    <li>Inserido em: {student.createdAt}</li>
                  </ul>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Deseja remover esse aluno?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Caso clique em continuar,
                      todos os registros desse usuário serão deletados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Não</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button onClick={() => handleDeleteStudent(student.id)}>
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
