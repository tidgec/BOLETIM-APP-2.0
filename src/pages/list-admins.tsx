import { Link, useSearchParams } from 'react-router-dom'

import { Filter } from '@/components/filter'
import { Pagination } from '@/components/pagination'
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

  return (
    <div className="w-full py-6">
      <section className="text-center sm:text-left px-4 mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Buscar administradores
        </h2>

        <Filter.Root>
          <Filter.UsernameInput />
          <Filter.CPFInput />
        </Filter.Root>

        <div className="mx-2 mb-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            admins?.map((admin) => (
              <Link to={`/admins/update/${admin.id}`} key={admin.id}>
                <ul className="space-y-2 rounded border p-4">
                  <li className="mb-4 text-lg font-semibold">
                    Nome: {admin.username}
                  </li>
                  <li>CPF: {formatCPF(admin.cpf)}</li>
                  <li>Email: {admin.email}</li>
                  <li>Inserido em: {admin.createdAt}</li>
                </ul>
              </Link>
            ))}
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
