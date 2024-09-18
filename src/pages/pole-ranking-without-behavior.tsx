import { PDFDownloadLink } from '@react-pdf/renderer'
import { useParams, useSearchParams } from 'react-router-dom'

import { Chart } from '@/components/chart'
import { Pagination } from '@/components/pagination'
import { RankingViewer } from '@/components/templates/ranking-viewer'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton' // Importar o componente Skeleton
import { useCreatePoleRankingSheet } from '@/hooks/use-create-pole-ranking-sheet'
import { useGetCourse } from '@/hooks/use-get-course'
import { useGetPoleRanking } from '@/hooks/use-get-pole-ranking'
import { conceptMap, overallStatusMap } from '@/utils/status-and-concept-mapper'

export function PoleRankingWithoutBehavior() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { course, isLoading: isLoadingGetCourse } = useGetCourse({
    courseId: String(courseId),
  })

  const { ranking, isLoading } = useGetPoleRanking({
    courseId: String(courseId),
    poleId: String(id),
    page,
    hasBehavior: 'false',
  })

  const {
    ranking: rankingToPrint,
    pages,
    totalItems,
  } = useGetPoleRanking({
    courseId: String(courseId),
    poleId: String(id),
    hasBehavior: 'false',
  })

  const { mutateAsync: createPoleRankingWithoutBehaviorSheetFn } =
    useCreatePoleRankingSheet()

  async function handleDownloadExcel() {
    try {
      const response = await createPoleRankingWithoutBehaviorSheetFn({
        courseId: String(courseId),
        poleId: String(id),
        hasBehavior: 'false',
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
      <section className="mx-auto w-full max-w-full px-4 text-center sm:text-left">
        <h2 className="mb-4 border-b-2 border-b-black text-xl font-semibold">
          Classificação por polo sem comportamento
        </h2>

        <div className="mb-4 flex flex-col items-center rounded-lg bg-pmpa-blue-500 p-4 sm:flex-row sm:justify-center">
          <div className="w-full sm:w-1/4">
            {isLoading ? (
              <div className="h-64 w-full">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
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

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
          <table className="min-w-full">
            <thead>
              <tr className="border-b bg-pmpa-blue-500">
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  CLASS
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Q.AV
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Q.C
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  RG
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  NOME COMPLETO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  MÉDIA FINAL
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  CONCEITO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  DATA DE NASCIMENTO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  POLO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="py-4 text-center">
                    <Skeleton className="h-8 w-full" />
                  </td>
                </tr>
              ) : (
                ranking?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {index + 1}º
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.studentAverage.assessmentsCount}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.studentAverage.averageInform.behaviorsCount}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.studentCivilID}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.studentPole}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.studentAverage.averageInform.geralAverage}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {
                        conceptMap[
                          item.studentAverage.averageInform.studentAverageStatus
                            .concept
                        ]
                      }
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.studentBirthday}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.studentPole}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {
                        overallStatusMap[
                          item.studentAverage.averageInform.studentAverageStatus
                            .status
                        ]
                      }
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
