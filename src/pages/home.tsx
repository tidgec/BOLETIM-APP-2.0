import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Course } from '@/components/course'
import { Pagination } from '@/components/pagination'
import { SearchForm } from '@/components/search-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteUser } from '@/hooks/use-delete-user'
import { useSearch } from '@/hooks/use-search'
import { fail } from '@/utils/fail'
import { formatCPF } from '@/utils/format-cpf'

export function Home() {
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query')
  const page = searchParams.get('page')

  const { users, totalItems, pages } = useSearch({
    page: page ?? '1',
    query: query ?? '',
  })

  const { mutateAsync: deleteUserFn } = useDeleteUser()

  async function handleDeleteStudent(id: string, role: string) {
    try {
      await deleteUserFn({
        id,
        role,
      })

      toast.success('Usuário deletado com sucesso!', {
        duration: 1000,
      })
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="h-full w-full py-6">
      <div className="flex h-full items-center">
        <main className="flex flex-1 flex-col items-center justify-center gap-8 px-2">
          <h1 className="text-center text-4xl font-bold text-blue-950">
            O que você deseja buscar?
          </h1>
          <span className="text-sm font-medium text-blue-950">
            Encontre os alunos pela pesquisa global
          </span>

          <SearchForm />

          <section className="w-full max-w-5xl space-y-4">
            <div className="grid h-80 w-full grid-cols-1 gap-4 overflow-auto md:grid-cols-2">
              {users ? (
                users?.map((user) => (
                  <div
                    key={user.id}
                    className="w-full space-y-2 rounded border border-gray-300 px-2 py-1"
                  >
                    <div className="flex flex-col items-center gap-2 font-semibold md:flex-row md:items-center md:justify-between">
                      <span className="text-lg">{user.username}</span>
                      <span>{formatCPF(user.cpf)}</span>
                    </div>

                    {!user.courses.length && (
                      <p className="text-center">
                        Esse usuário não tem cursos para mostrar.
                      </p>
                    )}

                    {user.courses.length !== 0 && user.poles.length !== 0 && (
                      <div className="flex flex-col items-center gap-2 text-sm md:flex-row md:items-center md:justify-between">
                        <div className="md:ml-2">
                          <span className="font-medium uppercase">Cursos:</span>
                          <ul className="list-inside list-disc md:ml-2">
                            <li>{user.courses[0].name}</li>
                          </ul>
                        </div>

                        <div className="md:mr-2">
                          <span className="font-medium uppercase">Polos:</span>
                          <ul className="list-inside list-disc">
                            <li>{user.poles[0].name}</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="flex items-end justify-center gap-2">
                      <Dialog>
                        <div className="mt-2 flex justify-between">
                          <div className="space-x-2">
                            {user.role !== 'DEV' && (
                              <DialogTrigger asChild>
                                <Button size={'sm'}>Ver mais</Button>
                              </DialogTrigger>
                            )}
                          </div>
                        </div>

                        <DialogContent className="w-full max-w-3xl">
                          <DialogHeader>
                            <span>Veja mais informações</span>
                          </DialogHeader>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {user.courses.map((course) => (
                              <div
                                key={course.id}
                                className="flex w-full flex-col items-start gap-1 border-2"
                              >
                                {user.role === 'STUDENT' && (
                                  <Link
                                    to={`/students/${user.id}/boletim?courseId=${course.id}`}
                                    className="h-full border bg-transparent p-0"
                                  >
                                    <Course course={course} />
                                  </Link>
                                )}

                                {user.role !== 'STUDENT' && (
                                  <Course
                                    course={{
                                      ...course,
                                      imageUrl:
                                        'https://github.com/igorabreu29.png',
                                    }}
                                  />
                                )}

                                <Button
                                  variant={'link'}
                                  className="mx-auto"
                                  size={'sm'}
                                >
                                  <Link
                                    to={`/students/update/${user.id}?courseId=${course.id}`}
                                  >
                                    Editar aluno
                                  </Link>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {user.role !== 'DEV' && (
                        <Button
                          variant={'destructive'}
                          size={'sm'}
                          onClick={() =>
                            handleDeleteStudent(user.id, user.role)
                          }
                        >
                          Deletar
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <Skeleton className="h-32 w-full rounded border bg-slate-300 px-2 py-1" />
                  <Skeleton className="h-32 w-full rounded border bg-slate-300 px-2 py-1" />
                  <Skeleton className="h-32 w-full rounded border bg-slate-300 px-2 py-1" />
                  <Skeleton className="h-32 w-full rounded border bg-slate-300 px-2 py-1" />
                </>
              )}
            </div>

            <Pagination
              items={totalItems ?? 0}
              page={page ? Number(page) : 1}
              pages={pages ?? 0}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
