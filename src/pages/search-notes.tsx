import { Link, useSearchParams } from 'react-router-dom'

import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import { UserSkeleton } from '@/components/skeletons/user-skeleton'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'

export function SearchNotes() {
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

  const currentUrl = new URL(window.location.href)

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="mb-4 w-full border-b-2 border-b-black text-xl font-semibold">
          Buscar notas
        </h2>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex-1">
            <FilterForm />
          </div>
        </div>

        <div className="mx-2 mb-4 h-[36rem] space-y-4 overflow-auto">
          {isLoading ? (
            <div className="h-full space-y-2 overflow-auto">
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </div>
          ) : (
            students?.map((student) => (
              <Link
                to={`${currentUrl.origin}/students/${student.id}/boletim?courseId=${student.course.id}`}
                key={student.id}
                className="flex flex-col gap-2 rounded border p-4"
              >
                <span className="mb-6 text-lg font-semibold">
                  Nome: {student.username}
                </span>
                <span className="font-medium">CPF: {student.cpf}</span>
                <span className="font-medium">Email: {student.email}</span>
                <span className="font-medium">
                  Inserção: {student.createdAt}
                </span>
                <span className="font-medium">
                  Curso: {student.course.name}
                </span>
                <span className="font-medium">Polo: {student.pole.name}</span>
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
