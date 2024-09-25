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
import { useDisableStudentStatus } from '@/hooks/use-disable-student-status'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'
import { fail } from '@/utils/fail'
import { formatCPF } from '@/utils/format-cpf'

const disableStudentSchema = z.object({
  reason: z
    .string()
    .min(3, { message: 'A mensagem não pode ser menor que 3 caracateres' })
    .max(200, { message: 'A mensagem não pode ser maior que 200 caracateres' }),
})

type DisableStudentSchema = z.infer<typeof disableStudentSchema>

export function StudentsEnabled() {
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

  const { handleSubmit, register, reset } = useForm<DisableStudentSchema>({
    resolver: zodResolver(disableStudentSchema),
    defaultValues: {
      reason: '',
    },
  })

  const { mutateAsync: disableStudentStatusFn } = useDisableStudentStatus()

  async function handleDisableStudent({
    id,
    reason,
  }: {
    id: string
    reason: string
  }) {
    try {
      await disableStudentStatusFn({
        courseId: String(courseId),
        studentId: id,
        reason,
      })

      toast.success('Estudante desativado com sucesso!', {
        duration: 1000,
      })

      reset()
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Desativar Aluno
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
            students?.map((student) => (
              <Dialog key={student.id}>
                <DialogTrigger className="text-start">
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

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deseja desativar esse aluno?</DialogTitle>
                    </DialogHeader>

                    <form
                      className="space-y-4"
                      onSubmit={handleSubmit(({ reason }) =>
                        handleDisableStudent({ reason, id: student.id }),
                      )}
                    >
                      <div>
                        <Textarea
                          placeholder="Digite o motivo do aluno estar sendo desativado..."
                          {...register('reason')}
                        />
                      </div>

                      <DialogFooter className="">
                        <Button
                          type="submit"
                          className="rounded bg-pmpa-blue-500 px-4 py-2 hover:bg-pmpa-blue-600"
                          variant={'default'}
                        >
                          Desativar
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
