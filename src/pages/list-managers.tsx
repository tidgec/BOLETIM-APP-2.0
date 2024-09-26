import { Link, useSearchParams } from 'react-router-dom'

import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import { UserSkeleton } from '@/components/skeletons/user-skeleton'
import { useGetCourseManagers } from '@/hooks/use-get-course-managers'
import { formatCPF } from '@/utils/format-cpf'

export function ListManagersPage() {
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

  const currentUrl = window.location.href
    .replace(`?courseId=${courseId}`, '')
    .replace(`&poleId=${poleId}`, '')
    .replace(`&cpf=${cpf}`, '')
    .replace(`&username=${username}`, '')
    .replace(`&page=${page}`, '')

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Buscar gerentes
        </h2>

        <FilterForm />

        <div className="mx-2 mb-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading ? (
            <div className="h-full space-y-2 overflow-auto">
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </div>
          ) : (
            managers?.map((manager) => (
              <Link
                to={`${currentUrl}/${manager.id}?courseId=${courseId}`}
                key={manager.id}
              >
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
              </Link>
            ))
          )}
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
