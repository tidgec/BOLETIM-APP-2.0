import { useSearchParams } from 'react-router-dom'

import { Pagination } from '@/components/pagination'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'
import { formatCPF } from '@/utils/format-cpf'

export function StudentInformation() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId') ?? ''
  const page = searchParams.get('page') ?? '1'

  const { students, totalItems, pages, isLoading } = useGetCourseStudents({
    courseId,
    page,
  })

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Informação dos estudantes
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4 px-4">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            students?.map((student) => (
              <div key={student.id}>
                <ul className="space-y-2 rounded border p-4">
                  <li className="mb-4 text-lg font-semibold">
                    Nome: {student.username}
                  </li>
                  <li>CPF: {formatCPF(student.cpf)}</li>
                  <li>Email: {student.email}</li>
                  <li>Curso: {student.course.name}</li>
                  <li>Polo: {student.pole.name}</li>
                  <li>Inserido em: {student.createdAt}</li>
                  <li>Inserido em: {student.createdAt}</li>
                </ul>
              </div>
            ))}
        </div>

        {students && (
          <Pagination
            pages={pages ?? 0}
            page={Number(page) ?? 0}
            items={totalItems ?? 0}
          />
        )}
      </section>
    </div>
  )
}
