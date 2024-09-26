import { PDFDownloadLink } from '@react-pdf/renderer'
import { useParams, useSearchParams } from 'react-router-dom'

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
import { useCreatePoleRankingSheet } from '@/hooks/use-create-pole-ranking-sheet'
import { useGetCourse } from '@/hooks/use-get-course'
import { useGetPoleRanking } from '@/hooks/use-get-pole-ranking'
import { fail } from '@/utils/fail'
import { getClassificationPosition } from '@/utils/get-classification-position'
import { conceptMap, overallStatusMap } from '@/utils/status-and-concept-mapper'

export function OverallPoleRanking() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { course, isLoading: isLoadingGetCourse } = useGetCourse({
    courseId: String(courseId),
  })

  const { ranking, isLoading, totalItems, pages } = useGetPoleRanking({
    courseId: course?.id,
    poleId: String(id),
    page,
  })

  const { ranking: rankingToPrint } = useGetPoleRanking({
    courseId: course?.id,
    poleId: String(id),
    page,
  })

  const { mutateAsync: createPoleRankingSheet } = useCreatePoleRankingSheet()

  async function handleDownloadExcel() {
    try {
      const response = await createPoleRankingSheet({
        courseId: String(courseId),
        poleId: String(id),
        hasBehavior: 'true',
      })

      window.location.href = response.fileUrl
    } catch (err) {
      fail(err)
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
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="mb-4 w-full border-b-2 border-b-black text-xl font-semibold">
          Classificação por polo
        </h2>

        <div className="mb-4 flex items-center justify-center rounded-lg bg-pmpa-blue-500 p-4">
          <div className="w-1/4">
            {isLoading ? (
              <Skeleton className="h-40 w-full" />
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
          <Table className="hidden min-w-full table-auto lg:table">
            <TableHeader>
              <TableRow className="border-b bg-pmpa-blue-500 print:flex print:justify-start">
                <TableHead className="w-10 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  CLASS
                </TableHead>
                <TableHead className="w-10 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  Q.AV
                </TableHead>
                <TableHead className="w-10 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  Q.C
                </TableHead>
                <TableHead className="w-20 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  RG
                </TableHead>
                <TableHead className="w-[340px] py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  NOME COMPLETO
                </TableHead>
                <TableHead className="w-32 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  MÉDIA FINAL
                </TableHead>
                <TableHead className="w-32 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  CONCEITO
                </TableHead>
                <TableHead className="w-32 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  DATA DE NASCIMENTO
                </TableHead>
                <TableHead className="w-24 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  POLO
                </TableHead>
                <TableHead className="w-24 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  STATUS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="print:hidden">
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
                    <TableRow key={item.studentName}>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {classification}º
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {item.studentAverage.assessmentsCount}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {item.studentAverage.averageInform.behaviorsCount}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {item.studentCivilID}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {item.studentName}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {item.studentAverage.averageInform.geralAverage}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {
                          conceptMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.concept
                          ]
                        }
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {item.studentBirthday}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                        {item.studentPole}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
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
            {isLoading ? (
              <>
                <RankingResponsiveSkeleton />
                <RankingResponsiveSkeleton />
              </>
            ) : (
              ranking?.map((item, index) => {
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
                          item.studentAverage.averageInform.studentAverageStatus
                            .concept
                        ]
                      }
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      DATA DE NASCIMENTO: {item.studentBirthday}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      POLO: {item.studentPole}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      STATUS:{' '}
                      {
                        overallStatusMap[
                          item.studentAverage.averageInform.studentAverageStatus
                            .status
                        ]
                      }
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
