import { useParams, useSearchParams } from 'react-router-dom'

import { CreateAssessmentForm } from '@/components/create-assessment-form'
import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseAssessments } from '@/hooks/use-get-course-assessments'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'

export function AddNotes() {
  const { disciplineId } = useParams()
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

  const { assessments } = useGetCourseAssessments({
    courseId: courseId ?? '',
    disciplineId: disciplineId ?? '',
  })

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black py-4 text-xl font-semibold">
          Adicionar nota
        </h2>

        <FilterForm />

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-72 w-full bg-gray-300" />
            <Skeleton className="h-72 w-full bg-gray-300" />
            <Skeleton className="h-72 w-full bg-gray-300" />
          </div>
        )}

        {!isLoading && (
          <div className="mx-2 mb-4 h-[36rem] space-y-4 overflow-auto">
            {students?.map((student) => {
              if (!assessments) {
                return (
                  <div className="space-y-4" key={student.id}>
                    <Skeleton className="h-72 w-full bg-gray-300" />
                    <Skeleton className="h-72 w-full bg-gray-300" />
                    <Skeleton className="h-72 w-full bg-gray-300" />
                  </div>
                )
              }

              const studentAssessment = assessments.find(
                (item) =>
                  item.studentId === student.id &&
                  item.disciplineId === disciplineId &&
                  item.courseId === courseId,
              )

              return (
                <div key={student.id} className="rounded border p-4">
                  <h2 className="mb-4 text-lg font-bold">
                    Nome: {student.username}
                  </h2>
                  <p>Curso: {student.course.name}</p>
                  <p>Polo: {student.pole.name}</p>

                  <CreateAssessmentForm
                    studentId={student.id}
                    assessment={studentAssessment}
                  />
                </div>
              )
            })}
          </div>
        )}

        <Pagination
          items={totalItems ?? 0}
          page={page ? Number(page) : 1}
          pages={pages ?? 0}
        />
      </section>
    </div>
  )
}
