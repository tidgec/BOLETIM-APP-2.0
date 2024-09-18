import { useSearchParams } from 'react-router-dom'

import { Chart } from '@/components/chart'
import { RankingSkeleton } from '@/components/skeletons/ranking-skeleton'
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
import { useGetRanking } from '@/hooks/use-get-ranking'
import { conceptMap, overallStatusMap } from '@/utils/status-and-concept-mapper'

export function OverallRanking() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { ranking, isLoading } = useGetRanking({
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

        <div className="mb-6 text-center font-bold">
          <span className="text-black">Classificação Geral: CAS - 2023</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md print:overflow-hidden">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow className="border-b bg-pmpa-blue-500 print:flex print:justify-start">
                <TableHead className="w-10 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  CLASS
                </TableHead>
                <TableHead className="w-10 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  Q.AV
                </TableHead>
                <TableHead className="w-10 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  Q.C
                </TableHead>
                <TableHead className="w-20 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  RG
                </TableHead>
                <TableHead className="w-[340px] px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  NOME COMPLETO
                </TableHead>
                <TableHead className="w-32 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  MÉDIA FINAL
                </TableHead>
                <TableHead className="w-32 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  CONCEITO
                </TableHead>
                <TableHead className="w-32 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  DATA DE NASCIMENTO
                </TableHead>
                <TableHead className="w-24 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
                  POLO
                </TableHead>
                <TableHead className="w-24 px-4 py-2 text-center text-sm font-semibold text-white print:w-auto print:py-0 print:text-xs">
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
                  <TableRow key={index}>
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

            <TableBody className="hidden print:table">
              {rankingToPrint?.map((item, index) => (
                <TableRow key={index} className="print:table-row">
                  <TableCell className="px-4 text-center text-xs text-slate-700 print:w-auto">
                    {index + 1}º
                  </TableCell>
                  <TableCell className="px-8 text-center text-xs text-slate-700 print:w-auto">
                    {item.studentAverage.assessmentsCount}
                  </TableCell>
                  <TableCell className="px-4 text-center text-xs text-slate-700 print:w-auto">
                    {item.studentAverage.averageInform.behaviorsCount}
                  </TableCell>
                  <TableCell className="px-4 text-center text-xs text-slate-700 print:w-auto">
                    {item.studentCivilID}
                  </TableCell>
                  <TableCell className="px-4 text-center text-xs text-slate-700 print:w-auto">
                    {item.studentName}
                  </TableCell>
                  <TableCell className="pl-14 text-right text-xs text-slate-700 print:w-auto">
                    0
                  </TableCell>
                  <TableCell className="pl-10 text-center text-xs text-slate-700 print:w-auto">
                    {
                      conceptMap[
                        item.studentAverage.averageInform.studentAverageStatus
                          .concept
                      ]
                    }
                  </TableCell>
                  <TableCell className="pl-8 text-center text-xs text-slate-700 print:w-auto">
                    {item.studentBirthday}
                  </TableCell>
                  <TableCell className="px-4 text-center text-xs text-slate-700 print:w-auto">
                    {item.studentPole}
                  </TableCell>
                  <TableCell className="px-4 text-center text-xs text-slate-700 print:w-auto">
                    {
                      overallStatusMap[
                        item.studentAverage.averageInform.studentAverageStatus
                          .status
                      ]
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 space-x-2 text-center print:hidden">
          <Button onClick={() => window.print()}>Download PDF</Button>
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
        </div>
      </section>
    </div>
  )
}
