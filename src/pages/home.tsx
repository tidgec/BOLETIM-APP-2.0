import { useSearchParams } from 'react-router-dom'

import { Pagination } from '@/components/pagination'
import { SearchForm } from '@/components/search-form'
import { useProfile } from '@/hooks/use-profile'
import { useSearch } from '@/hooks/use-search'
import { formatCPF } from '@/utils/format-cpf'

export function Home() {
  const [searchParams] = useSearchParams()
  const { user } = useProfile()

  const query = searchParams.get('query')
  const page = searchParams.get('page')

  const { users, totalItems, pages } = useSearch({
    page: page ?? '1',
    query: query ?? '',
  })

  const isStudent = user?.role === 'student'

  return (
    <div className="h-full w-full py-6">
      {isStudent && (
        <div className="mx-auto w-full max-w-[90rem]">
          <main>
            <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
              BEM-VINDO(A), {user.username}
            </h2>
            <div className="flex flex-wrap justify-center"></div>
          </main>
        </div>
      )}

      {!isStudent && (
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
                {users?.map((user) => (
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
                  </div>
                ))}
              </div>

              <Pagination
                items={totalItems ?? 0}
                page={page ? Number(page) : 1}
                pages={pages ?? 0}
              />
            </section>
          </main>
        </div>
      )}
    </div>
  )
}
