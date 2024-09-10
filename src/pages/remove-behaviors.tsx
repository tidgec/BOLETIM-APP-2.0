import { useSearchParams } from 'react-router-dom'

import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import { RemoveBehaviorGradeForm } from '@/components/remove-behavior-grade-form'
import { useGetCourseBehaviors } from '@/hooks/use-get-course-behaviors'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'

export function RemoveBehaviors() {
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

  const { behaviors, isLoading: isLoadingGetCourseBehaviors } =
    useGetCourseBehaviors(courseId ?? '')

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black py-4 text-xl font-semibold">
          Remover Notas de Comportamentos
        </h2>

        <FilterForm />

        {isLoading && <p>Loading...</p>}
        <div className="mx-2 mb-4 h-[36rem] space-y-4 overflow-auto">
          {!isLoading &&
            students?.map((student) => {
              if (!behaviors) {
                return <p key={student.id}>Loading...</p>
              }

              const studentBehaviors = behaviors.filter(
                (behavior) => behavior.studentId === student.id,
              )

              return (
                <div key={student.id} className="rounded border px-4 py-2">
                  <h2 className="mb-4 text-lg font-bold">
                    Nome: {student.username}
                  </h2>
                  <p>Curso: {student.course.name}</p>
                  <p>Polo: {student.pole.name}</p>

                  {!isLoadingGetCourseBehaviors &&
                    !studentBehaviors?.length && (
                      <p>O aluno não possui comportamento!</p>
                    )}

                  {!isLoadingGetCourseBehaviors &&
                    studentBehaviors.length > 0 &&
                    studentBehaviors?.map((studentBehavior) => (
                      <RemoveBehaviorGradeForm
                        key={studentBehavior.id}
                        id={studentBehavior.id}
                      />
                    ))}
                </div>
              )
            })}
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
