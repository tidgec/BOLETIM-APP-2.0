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
import { conceptMap, overallStatusMap } from '@/utils/status-and-concept-mapper'

export function OverallRanking() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { course, isLoading: isLoadingGetCourse } = useGetCourse({
    courseId: String(courseId),
  })

  const { ranking, pages, totalItems, isLoading } = useGetRanking({
    courseId: String(courseId),
    page,
  })

  const { ranking: rankingToPrint } = useGetRanking({
    courseId: String(courseId),
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

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md print:overflow-hidden">
          <Table className="min-w-full table-auto">
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
                ranking?.map((item, index) => (
                  <TableRow key={item.studentName}>
                    <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                      {index + 1}º
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
                          item.studentAverage.averageInform.studentAverageStatus
                            .concept
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
                          item.studentAverage.averageInform.studentAverageStatus
                            .status
                        ]
                      }
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 space-x-2 text-center print:hidden">
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
