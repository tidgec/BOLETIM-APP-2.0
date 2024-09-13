import { AxiosError } from 'axios'
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
            <div className="grid w-full grid-cols-2 gap-4">
              {users ? (
                users?.map((user) => (
                  <div
                    key={user.id}
                    className="w-full space-y-2 rounded border border-gray-300 px-2 py-1"
                  >
                    <div className="flex items-center justify-between gap-2 font-semibold">
                      <span className="text-lg">{user.username}</span>
                      <span>{formatCPF(user.cpf)}</span>
                    </div>

                    {!user.courses.length && (
                      <p className="text-center">
                        Esse usuário não tem cursos para mostrar.
                      </p>
                    )}

                    {user.courses.length !== 0 && user.poles.length !== 0 && (
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <div className="ml-2">
                          <span className="font-medium uppercase">Cursos:</span>
                          <ul className="ml-2 list-inside list-disc">
                            {user.courses.map((item) => (
                              <li key={item.id}>{item.name}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mr-2">
                          <span className="font-medium uppercase">Polos:</span>
                          <ul className="list-inside list-disc">
                            {user.poles.map((item) => (
                              <li key={item.id}>{item.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

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
                          <span>See more user information</span>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                          {user.courses.map((course) => (
                            <div
                              key={course.id}
                              className="flex w-full items-start gap-1"
                            >
                              <Course
                                course={{
                                  ...course,
                                  imageUrl:
                                    'https://github.com/igorabreu29.png',
                                }}
                              />

                              <div className="flex flex-col gap-2">
                                <Button variant={'link'} size={'sm'}>
                                  <Link
                                    to={`/students/update/${user.id}?courseId=${course.id}`}
                                  >
                                    Editar
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {user.role !== 'DEV' && (
                      <Button
                        variant={'destructive'}
                        size={'sm'}
                        onClick={() => handleDeleteStudent(user.id, user.role)}
                      >
                        Deletar
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <Skeleton className="h-16 w-full space-y-2 rounded border bg-slate-300 px-2 py-1" />
                  <Skeleton className="h-16 w-full space-y-2 rounded border bg-slate-300 px-2 py-1" />
                  <Skeleton className="h-16 w-full space-y-2 rounded border bg-slate-300 px-2 py-1" />
                  <Skeleton className="h-16 w-full space-y-2 rounded border bg-slate-300 px-2 py-1" />
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
