import { PDFDownloadLink } from '@react-pdf/renderer'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Chart } from '@/components/chart'
import { Pagination } from '@/components/pagination'
import {
  RankingResponsiveSkeleton,
  RankingSkeleton,
} from '@/components/skeletons/ranking-skeleton'
import { RankingViewer } from '@/components/templates/ranking-viewer'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCreateSubRankingSheet } from '@/hooks/use-create-sub-ranking-sheet'
import { useGetCourse } from '@/hooks/use-get-course'
import { useGetSubRanking } from '@/hooks/use-get-sub-ranking'
import { fail } from '@/utils/fail'
import { generateStatus } from '@/utils/generate-status'
import { getClassificationPosition } from '@/utils/get-classification-position'
import { conceptMap, overallStatusMap } from '@/utils/status-and-concept-mapper'

export function OverallSubRanking() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'
  const disciplineModule = searchParams.get('disciplineModule') ?? '1'
  const hasBehavior = searchParams.get('hasBehavior') ?? 'true'

  const { course, isLoading: isLoadingGetCourse } = useGetCourse({
    courseId: String(courseId),
  })

  const { ranking, students, pages, totalItems, isLoading } = useGetSubRanking({
    courseId: course?.id,
    page,
    disciplineModule: Number(disciplineModule),
    hasBehavior,
  })

  const { mutateAsync: createSubRankingSheetFn } = useCreateSubRankingSheet()

  async function handleDownloadExcel() {
    try {
      const response = await createSubRankingSheetFn({
        courseId: String(courseId),
        hasBehavior: 'true',
        disciplineModule: Number(disciplineModule),
      })

      window.location.href = response.fileUrl
    } catch (err) {
      fail(err)
    }
  }

  const totalExcellentSize = ranking?.filter(
    (item) => item.concept === 'excellent',
  )?.length

  const totalVeryGoodSize = ranking?.filter(
    (item) => item.concept === 'very good',
  )?.length

  const totalGoodSize = ranking?.filter(
    (item) => item.concept === 'good',
  )?.length

  const totalRegularSize = ranking?.filter(
    (item) => item.concept === 'regular',
  )?.length

  const totalInsufficientSize = ranking?.filter(
    (item) => item.concept === 'insufficient',
  )?.length

  const totalNoIncomeSize = ranking?.filter(
    (item) => item.concept === 'no income',
  )?.length

  function handleNavigateToBoletim(studentId: string) {
    navigate(`/students/${studentId}/boletim?courseId=${courseId}`)
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-full px-4 text-center sm:text-left print:px-0">
        <h2 className="mb-4 border-b-2 border-b-black text-xl font-semibold">
          Sub Classificação {disciplineModule} Período
        </h2>

        <div className="mb-4 flex items-center justify-center rounded-lg bg-pmpa-blue-500 p-4 print:hidden">
          <div>
            {isLoading ? (
              <Skeleton className="h-80 w-80" />
            ) : (
              <Chart
                charts={[
                  {
                    status: 'excellent',
                    size: totalExcellentSize ?? 0,
                    fill: 'var(--color-excellent)',
                  },
                  {
                    status: 'very good',
                    size: totalVeryGoodSize ?? 0,
                    fill: 'var(--color-very-good)',
                  },
                  {
                    status: 'good',
                    size: totalGoodSize ?? 0,
                    fill: 'var(--color-good)',
                  },
                  {
                    status: 'regular',
                    size: totalRegularSize ?? 0,
                    fill: 'var(--color-regular)',
                  },
                  {
                    status: 'insufficient',
                    size: totalInsufficientSize ?? 0,
                    fill: 'var(--color-insufficient)',
                  },
                  {
                    status: 'no income',
                    size: totalNoIncomeSize ?? 0,
                    fill: 'var(--color-no-income)',
                  },
                ]}
              />
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-center font-bold">
          {isLoadingGetCourse ? (
            <Skeleton className="h-4 w-44 bg-slate-300" />
          ) : (
            <span className="text-black">
              Classificação Geral: {course?.name}
            </span>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 lg:bg-white lg:shadow-md">
          <Table className="hidden w-full table-auto lg:table">
            <TableHeader className="overflow-x-auto">
              <TableRow className="flex flex-col justify-center border-b bg-pmpa-blue-500 lg:table-row">
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-10">
                  CLASS
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-10">
                  Q.AV
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-10">
                  Q.C
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-20">
                  RG
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-[340px]">
                  NOME COMPLETO
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-32">
                  MÉDIA FINAL
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-32">
                  CONCEITO
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-32">
                  DATA DE NASCIMENTO
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-24">
                  POLO
                </TableHead>
                <TableHead className="py-2 text-center text-xs font-semibold text-white md:text-sm lg:max-w-24">
                  STATUS
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="lg:overflow-hidden">
              {isLoading ? (
                <>
                  <RankingSkeleton />
                  <RankingSkeleton />
                  <RankingSkeleton />
                  <RankingSkeleton />
                  <RankingSkeleton />
                </>
              ) : (
                ranking?.map((item, index) => {
                  const classification = getClassificationPosition(index, page)
                  const student = students?.find(
                    (student) => student.id === item.studentId,
                  )

                  return (
                    <TableRow
                      key={item.studentId}
                      className="flex cursor-pointer flex-col lg:table-row"
                      onClick={() => handleNavigateToBoletim(item.studentId)}
                    >
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {classification}ª
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.assessmentsCount}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.behaviorsCount}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {student?.militaryId ?? student?.civilId}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {student?.username}
                      </TableCell>
                      <TableCell
                        className={`px-4 py-2 text-start text-base font-medium ${generateStatus(
                          item.status === 'second season'
                            ? 'second season'
                            : item.concept,
                        )}
                        )} lg:text-center lg:text-sm lg:font-normal`}
                      >
                        {Number(item.average).toFixed(
                          course?.decimalPlaces ?? 3,
                        )}
                      </TableCell>
                      <TableCell
                        className={`px-4 py-2 text-start text-base font-medium ${generateStatus(
                          item.status === 'second season'
                            ? 'second season'
                            : item.concept,
                        )}
                        )} lg:text-center lg:text-sm lg:font-normal`}
                      >
                        {conceptMap[item.concept]}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {student?.birthday}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {student?.pole.name}
                      </TableCell>
                      <TableCell
                        className={`px-4 py-2 text-start text-base font-medium ${generateStatus(
                          item.status === 'second season'
                            ? 'second season'
                            : item.concept,
                        )}
                          lg:text-center lg:text-sm lg:font-normal`}
                      >
                        {overallStatusMap[item.status]}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>

          <div className="flex h-[576px] flex-col gap-4 overflow-auto lg:hidden">
            {isLoading ? (
              <>
                <RankingResponsiveSkeleton />
                <RankingResponsiveSkeleton />
              </>
            ) : (
              ranking?.map((item, index) => {
                const classification = getClassificationPosition(index, page)
                const student = students?.find(
                  (student) => student.id === item.studentId,
                )

                return (
                  <ol
                    key={item.studentId}
                    className="flex cursor-pointer flex-col items-center border-2 border-slate-300"
                    onClick={() => handleNavigateToBoletim(item.studentId)}
                  >
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      Classificação: {classification}ª
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      Q.AV: {item.assessmentsCount}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      Q.C {item.behaviorsCount}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      RG: {student?.militaryId ?? student?.civilId}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      NOME COMPLETO: {student?.username}
                    </li>
                    <li
                      className={`px-4 py-2 text-start text-base font-medium ${generateStatus(
                        item.status === 'second season'
                          ? 'second season'
                          : item.concept,
                      )} lg:text-center lg:text-sm lg:font-normal`}
                    >
                      MÉDIA FINAL:{' '}
                      {Number(item.average).toFixed(course?.decimalPlaces ?? 3)}
                    </li>
                    <li
                      className={`${generateStatus(
                        item.status === 'second season'
                          ? 'second season'
                          : item.concept,
                      )} px-4 py-2 text-start
                        text-base
                      font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal`}
                    >
                      CONCEITO: {conceptMap[item.concept]}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      DATA DE NASCIMENTO: {student?.birthday}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      POLO: {student?.pole.name}
                    </li>
                    <li
                      className={`px-4 py-2 text-start text-base font-medium ${generateStatus(
                        item.status === 'second season'
                          ? 'second season'
                          : item.concept,
                      )} lg:text-center lg:text-sm lg:font-normal`}
                    >
                      STATUS: {overallStatusMap[item.status]}
                    </li>
                  </ol>
                )
              })
            )}
          </div>
        </div>

        <div className="mt-4 flex w-full items-center justify-center gap-2 text-center print:hidden">
          <PDFDownloadLink
            document={
              <RankingViewer
                courseName={course?.name ?? ''}
                ranking={
                  ranking
                    ? ranking.map((item, index) => {
                        const student = students?.find(
                          (student) => student.id === item.studentId,
                        )

                        return {
                          classification: index + 1,
                          average: item.average.toFixed(
                            course?.decimalPlaces ?? 3,
                          ),
                          concept: conceptMap[item.concept],
                          name: student?.username ?? '',
                          pole: student?.pole.name ?? '',
                          qav: item.assessmentsCount,
                          qc: item.behaviorsCount,
                          civilId:
                            student?.militaryId ?? student?.civilId ?? '',
                          birthday: student?.birthday ?? '',
                          status: overallStatusMap[item.status],
                        }
                      })
                    : []
                }
              />
            }
            fileName={`Classificação Geral - ${course?.name}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                'Preparando documento...'
              ) : (
                <Button>Download PDF</Button>
              )
            }
          </PDFDownloadLink>
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
        </div>

        <Pagination
          items={totalItems ?? 0}
          page={Number(page)}
          pages={pages ?? 0}
        />
      </section>
    </div>
  )
}
