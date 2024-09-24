import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSearchParams } from 'react-router-dom'

import { Chart } from '@/components/chart'
import { Pagination } from '@/components/pagination'
import { RankingSkeleton } from '@/components/skeletons/ranking-skeleton'
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
import { useCreateRankingSheet } from '@/hooks/use-create-ranking-sheet'
import { useGetCourse } from '@/hooks/use-get-course'
import { useGetRanking } from '@/hooks/use-get-ranking'
import { getClassificationPosition } from '@/utils/get-classification-position'
import { conceptMap, overallStatusMap } from '@/utils/status-and-concept-mapper'

export function Overall() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { course, isLoading: isLoadingGetCourse } = useGetCourse({
    courseId: String(courseId),
  })

  const { ranking, pages, totalItems, isLoading } = useGetRanking({
    courseId: course?.id,
    page,
  })

  const { ranking: rankingToPrint } = useGetRanking({
    courseId: course?.id,
  })

  const { mutateAsync: createRankingSheetFn } = useCreateRankingSheet()

  async function handleDownloadExcel() {
    try {
      const response = await createRankingSheetFn({
        courseId: String(courseId),
        hasBehavior: 'true',
      })

      window.location.href = response.fileUrl
    } catch (error) {
      console.error(error)
    }
  }

  const totalExcellentSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'excellent',
  )?.length

  const totalVeryGoodSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'very good',
  )?.length

  const totalGoodSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept === 'good',
  )?.length

  const totalRegularSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'regular',
  )?.length

  const totalInsufficientSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'insufficient',
  )?.length

  const totalNoIncomeSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'no income',
  )?.length

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-full px-4 text-center sm:text-left print:px-0">
        <h2 className="mb-4 border-b-2 border-b-black text-xl font-semibold">
          Classificação
        </h2>

        <div className="mb-4 flex items-center justify-center rounded-lg bg-pmpa-blue-500 p-4">
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

                  return (
                    <TableRow
                      key={item.studentName}
                      className="flex flex-col lg:table-row"
                    >
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {classification}ª
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.studentAverage.assessmentsCount}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.studentAverage.averageInform.behaviorsCount}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.studentCivilID}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.studentName}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.studentAverage.averageInform.geralAverage}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {
                          conceptMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.concept
                          ]
                        }
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.studentBirthday}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {item.studentPole}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        {
                          overallStatusMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.status
                          ]
                        }
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>

          <div className="flex h-[576px] flex-col gap-4 overflow-auto lg:hidden">
            {isLoading
              ? ''
              : ranking?.map((item, index) => {
                  const classification = getClassificationPosition(index, page)

                  return (
                    <ol
                      key={item.studentName}
                      className="flex flex-col items-center border-2 border-slate-300"
                    >
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        Classificação: {classification}ª
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        Q.AV: {item.studentAverage.assessmentsCount}
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        Q.C {item.studentAverage.averageInform.behaviorsCount}
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        RG: {item.studentCivilID}
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        NOME COMPLETO: {item.studentName}
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        MÉDIA FINAL:{' '}
                        {item.studentAverage.averageInform.geralAverage}
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        CONCEITO:{' '}
                        {
                          conceptMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.concept
                          ]
                        }
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        DATA DE NASCIMENTO: {item.studentBirthday}
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        PÓLO: {item.studentPole}
                      </li>
                      <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                        STATUS:{' '}
                        {
                          overallStatusMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.status
                          ]
                        }
                      </li>
                    </ol>
                  )
                })}
          </div>
        </div>

        <div className="flex h-[576px] flex-col gap-4 overflow-auto lg:hidden">
          <PDFDownloadLink
            document={
              <RankingViewer
                courseName={course?.name ?? ''}
                ranking={
                  rankingToPrint
                    ? rankingToPrint.map((item, index) => ({
                        classification: index + 1,
                        average: Number(
                          item.studentAverage.averageInform.geralAverage,
                        ),
                        concept:
                          conceptMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.concept
                          ],
                        name: item.studentName ?? '',
                        pole: item.studentPole ?? '',
                        qav: item.studentAverage.assessmentsCount,
                        qc: item.studentAverage.averageInform.behaviorsCount,
                        civilId: item.studentCivilID ?? '',
                        birthday: item.studentBirthday ?? '',
                        status:
                          overallStatusMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.status
                          ],
                      }))
                    : []
                }
              />
            }
            fileName="classificacao-geral-2023.pdf"
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
