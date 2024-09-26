import { useState } from 'react'
import QRCode from 'react-qr-code'
import { useParams, useSearchParams } from 'react-router-dom'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseDisciplines } from '@/hooks/use-get-course-disciplines'
import { useGetCourseStudent } from '@/hooks/use-get-course-student'
import { useGetStudentBoletim } from '@/hooks/use-get-student-boletim'
import { conceptMap, statusMap } from '@/utils/status-and-concept-mapper'
import { verifyFormula } from '@/utils/verify-formula-type'

export function BoletimCard() {
  const [showGrades, setShowGrades] = useState(true)
  const [showBehavior, setShowBehavior] = useState(true)

  const [searchParams] = useSearchParams()
  const { id: studentId } = useParams()
  const courseId = searchParams.get('courseId')

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
    )

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
            <span className="text-xl font-bold text-gray-700">
              Curso: {student?.course.name}
            </span>
          )}

          {isLoadingCourseStudent ? (
            <Skeleton className="h-7 w-20 bg-slate-300" />
          ) : (
            <span className="font-medium text-gray-700">
              Pólo: {student?.pole.name}
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
          <h3 className="text-lg font-bold md:text-xl">DISCIPLINAS:</h3>
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
              grades?.averageInform.geralAverage || 'Nota geral não lançada'
            ) : (
              <Skeleton className="h-8 w-48 bg-slate-300" />
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <p>STATUS GERAL:</p>{' '}
            {grades ? (
              conceptMap[grades.averageInform.studentAverageStatus.concept]
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
              <tr className="flex flex-col items-center bg-gray-200 text-sm uppercase leading-normal text-pmpa-blue-600 md:table-row">
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
                disciplines.map((discipline, index) => (
                  <GradeItem
                    key={discipline.disciplineId}
                    grade={{
                      disciplina: discipline.name,
                      vf: grades?.assessments[index]?.vf ?? 0,
                      vc1: grades?.assessments[index]?.avi ?? 0,
                      vc2: grades?.assessments[index]?.avii ?? 0,
                      vfe: grades?.assessments[index]?.vfe ?? 0,
                      average: grades?.assessments[index]?.average ?? 0,
                      status:
                        statusMap[
                          grades?.assessments[index]?.status ?? 'approved'
                        ],
                    }}
                  />
                ))
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
          <div className="mb-4 flex h-[320px] flex-col gap-4 overflow-auto md:hidden">
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
              disciplines?.map((discipline, index) => {
                return (
                  <ol
                    key={discipline.disciplineId}
                    className="flex flex-col items-center border-2 border-slate-300"
                  >
                    <li className="text-center text-sm">
                      Disciplina: {discipline.name ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      1º VF: {grades?.assessments[index]?.avi ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      2º VF: {grades?.assessments[index]?.avii ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      VF: {grades?.assessments[index]?.vf ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      VFE: {grades?.assessments[index]?.vfe ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      MÉDIA: {grades?.assessments[index]?.average ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      STATUS: {grades?.assessments[index]?.status ?? '---'}
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
                      {month.january ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.february ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.march ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.april ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.may ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.jun ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.july ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.august ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.september ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.october ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.november ?? '---'}
                    </td>
                    <td className="text-center text-sm">
                      {month.december ?? '---'}
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
          <div className="mb-4 flex h-[520px] flex-col gap-4 overflow-auto lg:hidden">
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
              behaviorMonths?.map((month, index) => {
                return (
                  <ol
                    key={index}
                    className="flex flex-col items-center border-2 border-slate-300"
                  >
                    <li className="text-center text-sm">
                      Janeiro: {month.january ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Fevereiro:{month.february ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Março: {month.march ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Abril: {month.april ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Maio: {month.may ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Junho: {month.jun ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Julho: {month.july ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Agosto: {month.august ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Setembro: {month.september ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Outubro: {month.october ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Novembro: {month.november ?? '---'}
                    </li>
                    <li className="text-center text-sm">
                      Dezembro: {month.december ?? '---'}
                    </li>
                  </ol>
                )
              })
            )}
          </div>
        )}

        <div className="mb-4 space-y-2 print:mt-4">
          <div>
            <p className="text-xl font-bold md:text-base">
              MÉDIA DE COMPORTAMENTO:{' '}
              {behaviorAverage ?? <Skeleton className="h-2 w-6" />}
            </p>
            <p className="text-xl font-bold md:text-base">
              STATUS COMPORTAMENTO:{' '}
              {behaviorAverage && behaviorAverage <= 6
                ? 'REPROVADO'
                : 'APROVADO'}
            </p>
          </div>

          {grades ? (
            <ul className="text-sm font-bold text-gray-700">
              {grades.averageInform.behaviorAverageStatus.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <span>
                    Média {index + 1}º Período: {item.behaviorAverage}
                  </span>
                  <span>
                    Status {index + 1}º Período:{' '}
                    {item.behaviorAverage <= 6 ? 'REPROVADO' : 'APROVADO'}
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
  vc1: number
  vc2: number
  vf: number
  vfe: number
  average: number
  status: string
}

function GradeItem({ grade }: { grade: GradeProps }) {
  return (
    <tr className="mb-2 flex flex-col border-b border-gray-200 hover:bg-gray-100 md:mb-0 md:table-row print:table-row">
      <td className="text-center text-sm font-medium text-gray-900 md:py-3 print:text-left">
        {grade.disciplina}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.vc1}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.vc2}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.vf}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.vfe}
      </td>
      <td className="text-center text-sm text-gray-700 md:py-3 print:text-left">
        {grade.average}
      </td>
      <td className="text-center text-sm text-lime-700 md:py-3 print:text-left">
        {grade.status}
      </td>
    </tr>
  )
}
