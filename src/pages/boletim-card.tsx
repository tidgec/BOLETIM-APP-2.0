import { useState } from 'react'
import QRCode from 'react-qr-code'
import { useParams, useSearchParams } from 'react-router-dom'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourse } from '@/hooks/use-get-course'
import { useGetCourseDisciplines } from '@/hooks/use-get-course-disciplines'
import { useGetCourseStudent } from '@/hooks/use-get-course-student'
import { useGetStudentBoletim } from '@/hooks/use-get-student-boletim'
import {
  generateAssessmentStatus,
  generateBehaviorStatus,
  generateStatus,
} from '@/utils/generate-status'
import { conceptMap, statusMap } from '@/utils/status-and-concept-mapper'
import { verifyFormula } from '@/utils/verify-formula-type'

export function BoletimCard() {
  const [showGrades, setShowGrades] = useState(true)
  const [showBehavior, setShowBehavior] = useState(true)

  const [searchParams] = useSearchParams()
  const { id: studentId } = useParams()
  const courseId = searchParams.get('courseId')

  const { course } = useGetCourse({ courseId: String(courseId) })

  const { student, isLoading: isLoadingCourseStudent } = useGetCourseStudent({
    courseId: String(courseId),
    studentId: String(studentId),
  })

  const formula = verifyFormula(student?.course.formula ?? '')

  const { disciplines } = useGetCourseDisciplines({
    courseId: String(courseId),
  })

  const {
    grades,
    behaviorMonths,
    isLoading: isLoadingStudentBoletim,
  } = useGetStudentBoletim({
    courseId: String(courseId),
    studentId: String(studentId),
    formula,
  })

  const behaviorAverage =
    grades &&
    grades?.averageInform.behaviorAverageStatus.reduce(
      (acc, item) => acc + item.behaviorAverage,
      0,
    ) / grades.averageInform.behaviorAverageStatus.length

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl print:max-w-7xl">
      <h2 className="mb-4 w-full border-b-2 border-b-black py-3 text-3xl font-bold">
        Boletim Online
      </h2>

      <div className="mb-4 ml-auto hidden w-full max-w-28 print:block">
        <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={window.location.href}
          viewBox={`0 0 256 256`}
        />
      </div>

      <div className="rounded-lg bg-white p-4 shadow-md print:p-2">
        <div className="mb-4 flex flex-col gap-1">
          {isLoadingCourseStudent ? (
            <Skeleton className="h-8 w-24 bg-slate-300" />
          ) : (
            <span className="text-lg font-bold md:text-xl">
              Curso: {student?.course.name}
            </span>
          )}

          {isLoadingCourseStudent ? (
            <Skeleton className="h-7 w-20 bg-slate-300" />
          ) : (
            <span className="font-medium text-gray-700">
              Polo: {student?.pole.name}
            </span>
          )}

          {isLoadingCourseStudent ? (
            <Skeleton className="h-6 w-32 bg-slate-300" />
          ) : (
            <span className="font-medium text-gray-700">
              Nome: {student?.username}
            </span>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold md:text-xl">DISCIPLINAS (Notas):</h3>
          {isLoadingStudentBoletim ? (
            <Skeleton className="h-8 w-10 bg-slate-300" />
          ) : (
            <span className="font-medium text-gray-700">
              {grades?.assessmentsCount || 'Sem notas lançadas'}
            </span>
          )}
        </div>

        <div className="mb-4">
          <div className="flex gap-2 text-lg font-bold md:text-xl">
            <p>MÉDIA GERAL:</p>{' '}
            {grades ? (
              <span
                className={`${generateStatus(
                  grades.averageInform.studentAverageStatus.status ===
                    'second season'
                    ? 'second season'
                    : grades.averageInform.studentAverageStatus.concept,
                )}`}
              >
                {Number(grades?.averageInform.geralAverage).toFixed(3) ||
                  'Nota geral não lançada'}
              </span>
            ) : (
              <Skeleton className="h-8 w-48 bg-slate-300" />
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <p>STATUS GERAL:</p>{' '}
            {grades ? (
              <span
                className={`${generateStatus(
                  grades.averageInform.studentAverageStatus.status ===
                    'second season'
                    ? 'second season'
                    : grades.averageInform.studentAverageStatus.concept,
                )} font-bold`}
              >
                {conceptMap[grades.averageInform.studentAverageStatus.concept]}
              </span>
            ) : (
              <Skeleton className="h-5 w-36 bg-slate-300" />
            )}
          </div>
        </div>

        <div className="mb-4 flex justify-start">
          <button
            className="rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700 print:hidden"
            onClick={() => setShowGrades(!showGrades)}
          >
            {showGrades ? 'Ocultar Notas' : 'Ver Notas'}
          </button>
        </div>

        {showGrades && (
          <table className="mb-4 hidden w-full table-auto md:table print:hidden">
            <thead>
              <tr className="items-center bg-gray-200 text-sm uppercase leading-normal text-pmpa-blue-600">
                <th className="py-3 font-bold print:text-xs">DISCIPLINA</th>
                <th className="py-3 font-bold print:text-xs">1° VC</th>
                <th className="py-3 font-bold print:text-xs">2° VC</th>
                <th className="py-3 font-bold print:text-xs">VF</th>
                <th className="py-3 font-bold print:text-xs">VFE</th>
                <th className="py-3 font-bold print:text-xs">MÉDIA</th>
                <th className="py-3 font-bold print:text-xs">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {disciplines ? (
                disciplines.map((discipline) => {
                  const assessment = grades?.assessments.find(
                    (item) => item?.disciplineId === discipline.disciplineId,
                  )

                  return (
                    <GradeItem
                      key={discipline.disciplineId}
                      grade={{
                        disciplina: discipline.name,
                        vf: assessment?.vf ?? 0,
                        vc1: assessment?.avi ?? 0,
                        vc2: assessment?.avii ?? 0,
                        vfe: assessment?.vfe ?? 0,
                        average: assessment?.average ?? 0,
                        status: statusMap[assessment?.status ?? 'no income'],
                        decimalPlaces: course?.decimalPlaces,
                      }}
                    />
                  )
                })
              ) : (
                <tr className="space-y-2 bg-gray-100 lg:table-row lg:space-y-0">
                  <td className="py-3">
                    <Skeleton className="mx-auto h-4 w-28 bg-slate-300" />
                  </td>
                  <td className="py-3">
                    <Skeleton className="mx-auto h-4 w-10 bg-slate-300" />
                  </td>
                  <td className="py-3">
                    <Skeleton className="mx-auto h-4 w-10 bg-slate-300" />
                  </td>
                  <td className="py-3">
                    <Skeleton className="mx-auto h-4 w-10 bg-slate-300" />
                  </td>
                  <td className="py-3">
                    <Skeleton className="mx-auto h-4 w-10 bg-slate-300" />
                  </td>
                  <td className="py-3">
                    <Skeleton className="mx-auto h-4 w-10 bg-slate-300" />
                  </td>
                  <td className="py-3">
                    <Skeleton className="mx-auto h-4 w-20 bg-slate-300" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {showGrades && (
          <div className="mb-4 flex h-[320px] flex-col gap-4 overflow-auto md:hidden print:h-auto print:overflow-visible">
            {!disciplines ? (
              <>
                <div className="flex flex-col items-center justify-center gap-2 border-2 border-slate-300 py-2">
                  <Skeleton className="h-3 w-44 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 border-2 border-slate-300 py-2">
                  <Skeleton className="h-3 w-44 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                  <Skeleton className="h-3 w-20 bg-slate-300" />
                </div>
              </>
            ) : (
              disciplines?.map((discipline) => {
                const assessment = grades?.assessments.find(
                  (item) => item?.disciplineId === discipline.disciplineId,
                )

                return (
                  <ol
                    key={discipline.disciplineId}
                    className="flex flex-col items-center border-2 border-slate-300"
                  >
                    <li className="text-center text-sm">
                      Disciplina: {discipline.name ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      1º VF:{' '}
                      {assessment?.avi?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </li>
                    <li className="text-center text-sm">
                      2º VF:{' '}
                      {assessment?.avii?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </li>
                    <li className="text-center text-sm">
                      VF:{' '}
                      {assessment?.vf.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </li>
                    <li className="text-center text-sm">
                      VFE:{' '}
                      {assessment?.vfe?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </li>
                    <li className="text-center text-sm">
                      MÉDIA:{' '}
                      {assessment?.average.toFixed(
                        course?.decimalPlaces ?? 3,
                      ) ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      STATUS:{' '}
                      {statusMap[assessment?.status ?? 'no income'] ?? '---'}
                    </li>
                  </ol>
                )
              })
            )}
          </div>
        )}

        <div className="mb-4 flex justify-start">
          <button
            className="rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700 print:hidden"
            onClick={() => setShowBehavior(!showBehavior)}
          >
            {showBehavior ? 'Ocultar Comportamento' : 'Ver Comportamento'}
          </button>
        </div>

        {showBehavior && (
          <table className="mb-4 hidden w-full table-auto lg:table print:hidden">
            <thead>
              <tr className="flex flex-col space-y-2 bg-gray-200 text-sm uppercase leading-normal text-pmpa-blue-600 lg:table-row lg:space-y-0">
                <th className="print:text-xs">Janeiro</th>
                <th className="print:text-xs">Fevereiro</th>
                <th className="print:text-xs">Março</th>
                <th className="print:text-xs">Abril</th>
                <th className="print:text-xs">Maio</th>
                <th className="print:text-xs">Junho</th>
                <th className="print:text-xs">Julho</th>
                <th className="print:text-xs">Agosto</th>
                <th className="print:text-xs">Setembro</th>
                <th className="print:text-xs">Outubro</th>
                <th className="print:text-xs">Novembro</th>
                <th className="print:text-xs">Dezembro</th>
              </tr>
            </thead>
            <tbody>
              {behaviorMonths ? (
                behaviorMonths?.map((month, index) => (
                  <tr
                    className="flex flex-col space-y-2 bg-gray-100 lg:table-row lg:space-y-0"
                    key={index}
                  >
                    <td className="text-center text-sm">
                      {month.january?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.february?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.march?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.april?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.may?.toFixed(course?.decimalPlaces ?? 3) ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.jun?.toFixed(course?.decimalPlaces ?? 3) ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.july?.toFixed(course?.decimalPlaces ?? 3) ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.august?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.september?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.october?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.november?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.december?.toFixed(course?.decimalPlaces ?? 3) ??
                        '---'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="flex justify-center space-y-2 bg-gray-100 lg:table-row lg:space-y-0">
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                  <td>
                    <Skeleton className="mx-auto h-2 w-10 bg-slate-300" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {showBehavior && (
          <div className="mb-4 flex h-[520px] flex-col gap-4 overflow-auto lg:hidden print:h-auto print:overflow-visible">
            {!behaviorMonths ? (
              <>
                <div className="flex flex-col items-center justify-center gap-2 border-2 border-slate-300 py-2">
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 border-2 border-slate-300 py-2">
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                  <Skeleton className="h-3 w-24 bg-slate-300" />
                </div>
              </>
            ) : (
              behaviorMonths
                ?.sort((a, b) => a.module - b.module)
                .map((month, index) => {
                  return (
                    <ol
                      key={index}
                      className="flex flex-col items-center border-2 border-slate-300"
                    >
                      <li className="text-center text-sm">
                        Janeiro:{' '}
                        {month.january?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Fevereiro:
                        {month.february?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Março:{' '}
                        {month.march?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Abril:{' '}
                        {month.april?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Maio:{' '}
                        {month.may?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Junho:{' '}
                        {month.jun?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Julho:{' '}
                        {month.july?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Agosto:{' '}
                        {month.august?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Setembro:{' '}
                        {month.september?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Outubro:{' '}
                        {month.october?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Novembro:{' '}
                        {month.november?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                      <li className="text-center text-sm">
                        Dezembro:{' '}
                        {month.december?.toFixed(course?.decimalPlaces ?? 3) ??
                          '---'}
                      </li>
                    </ol>
                  )
                })
            )}
          </div>
        )}

        <div className="mb-4 space-y-2 print:mt-4">
          <div>
            <p className="font-bold md:text-lg">
              MÉDIA DE COMPORTAMENTO:{' '}
              {behaviorAverage !== undefined && behaviorAverage >= 0 ? (
                <span
                  className={`${generateBehaviorStatus({ average: behaviorAverage ?? 0 })}`}
                >
                  {behaviorAverage.toFixed(3)}
                </span>
              ) : (
                <Skeleton className="h-2 w-6" />
              )}
            </p>
            <p className="font-bold md:text-lg">
              STATUS COMPORTAMENTO:{' '}
              <span
                className={`${generateBehaviorStatus({ average: behaviorAverage ?? 0 })}`}
              >
                {behaviorAverage && behaviorAverage >= 6
                  ? 'APROVADO'
                  : 'REPROVADO'}
              </span>
            </p>
          </div>

          {grades ? (
            <ul className="text-sm font-bold text-gray-700">
              {grades.averageInform.behaviorAverageStatus.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <span>
                    Média {index + 1}º Período:{' '}
                    {item.behaviorAverage.toFixed(3)}
                  </span>
                  <span>
                    Status {index + 1}º Período:{' '}
                    <span
                      className={`${generateBehaviorStatus({ average: item.behaviorAverage ?? '' })}`}
                    >
                      {item.behaviorAverage >= 6 ? 'APROVADO' : 'REPROVADO'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-52" />
            </div>
          )}
        </div>
      </div>

      <button
        className="my-3 ml-auto block rounded bg-pmpa-blue-500 px-4 py-2 font-semibold text-white hover:bg-pmpa-blue-700 print:hidden"
        onClick={() => window.print()}
      >
        Baixar
      </button>

      <footer className="mt-20 hidden text-center print:block">
        <h2 className="text-2xl font-bold text-gray-300">
          Desenvolvido Pela Subseção de Tecnologia Educacional.
        </h2>
        <span className="text-xl font-bold text-gray-300">
          Polícia Militar do Pará © 2024 | Todos os Direitos Reservados
        </span>
      </footer>
    </div>
  )
}

interface GradeProps {
  disciplina: string
  vc1?: number
  vc2?: number
  vf?: number
  vfe?: number
  average: number
  status: string

  decimalPlaces?: number
}

function GradeItem({ grade }: { grade: GradeProps }) {
  return (
    <tr className="mb-2 flex flex-col border-b border-gray-200 hover:bg-gray-100 md:mb-0 md:table-row print:table-row">
      <td className="text-center text-sm font-medium text-gray-900 md:py-3 print:text-left">
        {grade.disciplina}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.vc1 ? grade.vc1.toFixed(grade.decimalPlaces ?? 3) : '---'}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.vc2 ? grade.vc2.toFixed(grade.decimalPlaces ?? 3) : '---'}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.vf ? grade.vf.toFixed(grade.decimalPlaces ?? 3) : '---'}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.vfe ? grade.vfe.toFixed(grade.decimalPlaces ?? 3) : '---'}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.average.toFixed(grade.decimalPlaces ?? 3)}
      </td>
      <td
        className={`text-center text-sm ${generateAssessmentStatus(grade)} md:py-3 print:text-left`}
      >
        {grade.status}
      </td>
    </tr>
  )
}
