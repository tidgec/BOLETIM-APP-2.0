import { Link, useSearchParams } from 'react-router-dom'

import { Filter } from '@/components/filter'
import { Pagination } from '@/components/pagination'
import { UserSkeleton } from '@/components/skeletons/user-skeleton'
import { useGetAdmins } from '@/hooks/use-get-admins'
import { formatCPF } from '@/utils/format-cpf'

export function ListAdminsPage() {
  const [searchParams] = useSearchParams()

  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')
  const page = searchParams.get('page')

  const { admins, totalItems, pages, isLoading } = useGetAdmins({
    cpf: cpf ?? '',
    username: username ?? '',
    page: page ?? '1',
  })

  const currentUrl = window.location.href
    .replace(`?username=${username}`, '')
    .replace(`&username=${username}`, '')
    .replace(`?cpf=${cpf}`, '')
    .replace(`&cpf=${cpf}`, '')
    .replace(`?page=${page}`, '')
    .replace(`&page=${page}`, '')

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Buscar administradores
        </h2>

        <Filter.Root>
          <Filter.UsernameInput />
          <Filter.CPFInput />
        </Filter.Root>

        <div className="mx-2 mb-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading ? (
            <div className="h-full space-y-2 overflow-auto">
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </div>
          ) : (
            admins?.map((admin) => (
              <Link to={`${currentUrl}/${admin.id}`} key={admin.id}>
                <ul className="space-y-2 rounded border p-4">
                  <li className="mb-4 text-lg font-semibold">
                    Nome: {admin.username}
                  </li>
                  <li>CPF: {formatCPF(admin.cpf)}</li>
                  <li>Email: {admin.email}</li>
                  <li>Inserido em: {admin.createdAt}</li>
                </ul>
              </Link>
            ))
          )}
        </div>

        <Pagination
          items={totalItems ?? 0}
          page={page ? Number(page) : 0}
          pages={pages ?? 0}
        />
      </section>
    </div>
  )
}
