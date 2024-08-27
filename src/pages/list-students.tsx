import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'
import { formatCPF } from '@/utils/format-cpf'
import { Link, useSearchParams } from 'react-router-dom'

export function ListStudentsPage() {
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

  const currentUrl = window.location.href.replace(`?courseId=${courseId}`, '')

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Buscar alunos
        </h2>

        <FilterForm />

        <div className="mx-2 mb-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            students?.map((student) => (
              <Link to={`${currentUrl}/${student.id}`} key={student.id}>
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
              </Link>
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
