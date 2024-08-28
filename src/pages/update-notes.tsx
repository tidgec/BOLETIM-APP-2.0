import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import { UpdateAssessmentForm } from '@/components/update-assessment-form'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'
import { useSearchParams } from 'react-router-dom'

export function UpdateNotes() {
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

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black py-4 text-xl font-semibold">
          Atualizar Notas
        </h2>

        <FilterForm />

        {isLoading && <p>Loading...</p>}
        <div className="mx-2 mb-4 h-[36rem] space-y-4 overflow-auto">
          {!isLoading &&
            students?.map((student) => (
              <div key={student.id} className="rounded border p-4">
                <h2 className="mb-4 text-lg font-bold">
                  Nome: {student.username}
                </h2>
                <p>Curso: {student.course.name}</p>
                <p>Polo: {student.pole.name}</p>

                <UpdateAssessmentForm studentId={student.id} />
              </div>
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
