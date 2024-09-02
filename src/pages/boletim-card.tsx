import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useGetCourseDisciplines } from '@/hooks/use-get-course-disciplines'
import { useGetCourseStudent } from '@/hooks/use-get-course-student'
import { useGetStudentBoletim } from '@/hooks/use-get-student-boletim'
import { conceptMap, statusMap } from '@/utils/status-and-concept-mapper'
import { verifyFormula } from '@/utils/verify-formula-type'

export function BoletimCard() {
  const [searchParams] = useSearchParams()
  const { id: studentId } = useParams()
  const courseId = searchParams.get('courseId')

  const { student, isLoading: isLoadingCourseStudent } = useGetCourseStudent({
    courseId: String(courseId),
    studentId: String(studentId),
  })

  const formula = verifyFormula(student?.course.formula ?? '')

  const { disciplines } = useGetCourseDisciplines(String(courseId))

  const {
    grades,
    behaviorMonths,
    isLoading: isLoadingStudentBoletim,
  } = useGetStudentBoletim({
    courseId: String(courseId),
    studentId: String(studentId),
    formula,
  })

  const [showGrades, setShowGrades] = useState(false)
  const [showBehavior, setShowBehavior] = useState(false)

  return (
    <div className="container mx-auto mt-10 w-full">
      <h1 className="mb-4 w-full border-b-2 border-b-black py-3 text-3xl font-bold">
        Boletim Online
      </h1>
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="mb-4 flex flex-col gap-1">
          {isLoadingCourseStudent ? (
            <p>Loading...</p>
          ) : (
            <span className="text-xl font-bold text-gray-700">
              Curso: {student?.course.name}
            </span>
          )}

          {isLoadingCourseStudent ? (
            <p>Loading...</p>
          ) : (
            <span className="font-medium text-gray-700">
              Polo: {student?.pole.name}
            </span>
          )}

          {isLoadingCourseStudent ? (
            <p>Loading...</p>
          ) : (
            <span className="font-medium text-gray-700">
              Nome: {student?.username}
            </span>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">DISCIPLINAS:</h3>
          {isLoadingStudentBoletim ? (
            <p>Loading...</p>
          ) : (
            <span className="font-medium text-gray-700">
              {grades?.assessmentsCount || 'Sem notas lançadas'}
            </span>
          )}
        </div>
        <div className="mb-4">
          {!grades ? (
            <p>Loading...</p>
          ) : (
            <>
              <h3 className="text-xl font-bold">
                MÉDIA GERAL:{' '}
                {grades?.averageInform.geralAverage || 'Nota geral não lançada'}
              </h3>
              <p className="text-gray-700">
                STATUS GERAL:{' '}
                {conceptMap[grades.averageInform.studentAverageStatus.concept]}
              </p>
            </>
          )}
        </div>
        <div className="mb-4 flex justify-start">
          <button
            className="rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700"
            onClick={() => setShowGrades(!showGrades)}
          >
            {showGrades ? 'Ocultar Notas' : 'Ver Notas'}
          </button>
        </div>
        {showGrades && (
          <table className="mb-4 w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase leading-normal text-pmpa-blue-600">
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  DISCIPLINA
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  1° VC
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  2° VC
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  VF
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  VFE
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  MÉDIA
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {disciplines ? (
                disciplines.map((discipline, index) => (
                  <GradeItem
                    key={discipline.disciplineId}
                    grade={{
                      disciplina: discipline.name,
                      vf: grades?.assessments[index]?.vf,
                      vc1: grades?.assessments[index]?.avi,
                      vc2: grades?.assessments[index]?.avii,
                      vfe: grades?.assessments[index]?.vfe,
                      average: grades?.assessments[index]?.average,
                      status: statusMap[grades?.assessments[index]?.status],
                    }}
                  />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </tbody>
          </table>
        )}
        <div className="mb-4 flex justify-start">
          <button
            className="rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700"
            onClick={() => setShowBehavior(!showBehavior)}
          >
            {showBehavior ? 'Ocultar Comportamento' : 'Ver Comportamento'}
          </button>
        </div>
        {showBehavior && (
          <table className="mb-4 w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase leading-normal text-pmpa-blue-600">
                <th>Janeiro</th>
                <th>Fevereiro</th>
                <th>Março</th>
                <th>Abril</th>
                <th>Maio</th>
                <th>Junho</th>
                <th>Julho</th>
                <th>Agosto</th>
                <th>Setembro</th>
                <th>Outubro</th>
                <th>Novembro</th>
                <th>Dezembro</th>
              </tr>
            </thead>
            <tbody>
              {behaviorMonths ? (
                behaviorMonths?.map((month, index) => (
                  <tr className="bg-gray-100" key={index}>
                    <td className="text-center text-sm">{month.january}</td>
                    <td className="text-center text-sm">{month.february}</td>
                    <td className="text-center text-sm">{month.march}</td>
                    <td className="text-center text-sm">{month.april}</td>
                    <td className="text-center text-sm">{month.may}</td>
                    <td className="text-center text-sm">{month.jun}</td>
                    <td className="text-center text-sm">{month.july}</td>
                    <td className="text-center text-sm">{month.august}</td>
                    <td className="text-center text-sm">{month.september}</td>
                    <td className="text-center text-sm">{month.october}</td>
                    <td className="text-center text-sm">{month.november}</td>
                    <td className="text-center text-sm">{month.december}</td>
                  </tr>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </tbody>
          </table>
        )}
        <div className="mb-4">
          {grades ? (
            <h3 className="text-xl font-bold">
              MÉDIA DE COMPORTAMENTO:{' '}
              {Array.isArray(grades.averageInform.behaviorAverageStatus)
                ? grades.averageInform.behaviorAverageStatus.map(
                    (item, index) => <p key={index}>{item.behaviorAverage}</p>,
                  )
                : grades.averageInform.behaviorAverageStatus.behaviorAverage}
            </h3>
          ) : (
            <p>Loading...</p>
          )}
          <span className="text-gray-700">STATUS COMPORTAMENTO: APROVADO</span>
        </div>
      </div>
      <button
        className="my-3 ml-auto block rounded bg-pmpa-blue-500 px-4 py-2 font-semibold text-white hover:bg-pmpa-blue-700"
        onClick={() => window.print()}
      >
        Baixar
      </button>
    </div>
  )
}

interface GradeProps {
  disciplina: string
  vc1: number
  vc2: number
  vf: number
  vfe: number
  average: number
  status: string
}

function GradeItem({ grade }: { grade: GradeProps }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
        {grade.disciplina}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.vc1}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.vc2}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.vf}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.vfe}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.average}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-lime-700">
        {grade.status}
      </td>
    </tr>
  )
}
